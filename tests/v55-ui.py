from playwright.sync_api import sync_playwright
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,re,mimetypes,collections,os
root=Path(__file__).resolve().parent.parent
base='https://mathlab.test/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.getenv('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 ctx=b.new_context(viewport={'width':1440,'height':900});page=ctx.new_page();page.set_default_timeout(15000)
 errors=[];missing=[];external=[];current=['startup']
 page.on('pageerror',lambda e:errors.append([current[0],str(e)]))
 def handler(route):
  u=urlsplit(route.request.url)
  if u.hostname!='mathlab.test':external.append([current[0],route.request.url]);route.abort();return
  f=root/unquote(u.path.lstrip('/'))
  if f.is_file():route.fulfill(status=200,body=f.read_bytes(),content_type=mimetypes.guess_type(str(f))[0] or 'application/octet-stream')
  else:missing.append([current[0],route.request.url]);route.abort()
 page.route('**/*',handler)
 html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+ (root/'style.css').read_text()+'</style>').replace('<link rel="stylesheet" href="themes55.css">','<style>'+ (root/'themes55.css').read_text()+'</style>')
 scripts=re.findall(r'<script defer src="([^"]+)"></script>',html)
 html=re.sub(r'<script defer src="[^"]+"></script>','',html).replace('<head>','<head><base href="'+base+'">')
 shim="<script>const _store={};Object.defineProperty(window,'localStorage',{value:{getItem:k=>_store[k]??null,setItem:(k,v)=>{_store[k]=v}}});</script>"
 code=shim+''.join('<script>'+ (root/f).read_text().replace('</script','<\\/script')+'</script>' for f in scripts)
 page.set_content(html.replace('</body>',code+'</body>'),wait_until='load',timeout=30000)
 page.evaluate('MathJax.startup.promise')


 assert page.evaluate("()=>DATA.questions.length")==178
 assert page.locator('#localMaterialsPublic').count()==1
 def nav(id):page.evaluate("id=>[...document.querySelectorAll('#nav button')].find(b=>b.textContent===DATA.questions.find(q=>q.id===id).title).click()",id)
 nav('2019-02');page.locator('#tabs [data-tab=question]').click();assert page.locator('#center .public-material-notice').count()>0
 print('PASS public old question notice')
 nav('2025-20');page.locator('#tabs [data-tab=question]').click();assert page.locator('#center .public-material-notice').count()>0
 print('PASS public proof notice')
 nav('2026-22');page.locator('#tabs [data-tab=question]').click();assert '寿命' in page.locator('#center').inner_text()
 print('PASS 2026 structured question')
 page.locator('#localMaterialsPublic').click();assert page.locator('#localMaterialsPublic').get_attribute('aria-pressed')=='true'
 page.locator('#localMaterialsPublic').click();assert page.locator('#localMaterialsPublic').get_attribute('aria-pressed')=='false'
 print('PASS local material switch')
 # Test all themes, independent collapses, zoom and retention of the active form.
 page.locator('#tabs [data-tab=derive]').click()
 baseline=page.evaluate("()=>JSON.stringify(S.objects)")
 q=page.evaluate("()=>S.question")
 for theme in ['latte','frappe','macchiato','mocha','original']:
  page.locator('#theme55').select_option(theme)
  assert page.locator('html').get_attribute('data-theme55')==theme
  if theme=='latte':
   assert page.locator('html').evaluate("e=>getComputedStyle(e).colorScheme")=='light'
   assert page.locator('.pane.work').evaluate("e=>getComputedStyle(e).backgroundColor")=='rgb(230, 233, 239)'
   if os.getenv('ML_SCREENSHOT_DIR'):page.screenshot(path=str(Path(os.environ['ML_SCREENSHOT_DIR'])/'v55-latte.png'))
 print('PASS five themes and real light palette')
 page.locator('#tools55').click();assert not page.locator('.pane.tools').is_visible();assert page.locator('.pane.nav').is_visible()
 page.locator('#focus54').click();assert not page.locator('.pane.nav').is_visible();assert not page.locator('.pane.tools').is_visible()
 page.locator('#tools55').click();assert page.locator('.pane.tools').is_visible();assert not page.locator('.pane.nav').is_visible()
 page.locator('#focus54').click();assert page.locator('.pane.nav').is_visible()
 print('PASS independent formula and navigation folds')
 for viewport in [{'width':1440,'height':900},{'width':1024,'height':768}]:
  page.set_viewport_size(viewport)
  for scale in ['75','90','100','110','125','150']:
   page.locator('#zoom55').select_option(scale)
   box=page.locator('footer').bounding_box(); print('zoom',viewport['width'],scale,box)
   assert box['y']+box['height'] <= viewport['height']+2,box
   z=page.locator('#zoom55').bounding_box();assert z['x']+z['width']<=viewport['width']+2,z
   assert page.evaluate("()=>JSON.stringify(S.objects)")==baseline
   assert page.evaluate("()=>S.question")==q
  page.locator('#zoom55').select_option('100')
 print('PASS all zoom options, footer visible and no change to math objects')
 page.locator('#theme55').select_option('mocha');page.locator('#tools55').click();page.locator('#zoom55').select_option('125')
 assert page.evaluate("()=>localStorage.getItem('ml.view55.theme')")=='mocha'
 assert page.evaluate("()=>localStorage.getItem('ml.view55.tools')")=='1'
 assert page.evaluate("()=>localStorage.getItem('ml.view55.zoom')")=='125'
 if os.getenv('ML_SCREENSHOT_DIR'):page.screenshot(path=str(Path(os.environ['ML_SCREENSHOT_DIR'])/'v55-folded.png'))
 print('PASS view preferences written separately')
 # The UI must stay operable with both sidebars hidden at high scale.
 page.locator('#focus54').click();page.locator('#zoom55').select_option('150')
 assert page.locator('.pane.work').is_visible() and page.locator('.pane.notebook').is_visible()
 page.locator('#zoom55').select_option('100');page.locator('#tools55').click();page.locator('#focus54').click()
 # Verify an actual form's unsent text is retained across view changes.
 field=page.locator('#center textarea').first;field.fill('临时推导草稿')
 page.locator('#theme55').select_option('latte');page.locator('#tools55').click();page.locator('#zoom55').select_option('110')
 assert field.input_value()=='临时推导草稿'
 print('PASS view changes preserve current editor text')
 assert not errors,errors
 print('PASS no uncaught page errors')
 b.close()
