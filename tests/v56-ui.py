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
 html=html.replace('<link rel="stylesheet" href="object-menu56.css">','<style>'+ (root/'object-menu56.css').read_text()+'</style>')
 scripts=re.findall(r'<script defer src="([^"]+)"></script>',html)
 html=re.sub(r'<script defer src="[^"]+"></script>','',html).replace('<head>','<head><base href="'+base+'">')
 shim="<script>const _store={};Object.defineProperty(window,'localStorage',{value:{getItem:k=>_store[k]??null,setItem:(k,v)=>{_store[k]=v}}});</script>"
 code=shim+''.join('<script>'+ (root/f).read_text().replace('</script','<\\/script')+'</script>' for f in scripts)
 page.set_content(html.replace('</body>',code+'</body>'),wait_until='load',timeout=30000)
 page.evaluate('MathJax.startup.promise')


 assert page.evaluate("()=>DATA.questions.length")==178
 assert page.locator('#localMaterialsPublic').count()==1
 def nav(id):page.evaluate("id=>[...document.querySelectorAll('#nav button')].find(b=>b.textContent===DATA.questions.find(q=>q.id===id).title).click()",id)

 nav('2026-03')
 page.locator('#book .object').first.click()
 assert page.locator('#selection .object-menu56').count()==1
 assert not page.locator('#selection .object-menu56').get_attribute('open')
 assert page.locator('#selection .object-bar56>button').inner_text()=='送入检测'
 initial=page.evaluate("()=>JSON.stringify(S.objects)")
 menu=page.locator('#selection .object-menu56');summary=menu.locator('summary');summary.click()
 assert menu.get_attribute('open') is not None
 labels=menu.locator('button').all_text_contents();assert '收藏公式' in labels and '复制 TeX' in labels,labels
 search=menu.locator('input');search.fill('收藏');assert menu.locator('button:visible').all_text_contents()==['收藏公式']
 search.fill('no-match-xx');assert menu.locator('button:visible').count()==0
 search.press('Escape');assert menu.get_attribute('open') is None
 assert page.evaluate("()=>JSON.stringify(S.objects)")==initial
 print('PASS compact menu, grouping, filtering, Escape and unchanged objects')
 summary.click();search.fill('收藏');menu.get_by_role('button',name='收藏公式',exact=True).click()
 assert menu.get_attribute('open') is None
 assert page.evaluate("()=>S.library.length")>=1
 print('PASS original action callback invoked')
 for viewport in [{'width':1440,'height':900},{'width':1024,'height':768}]:
  page.set_viewport_size(viewport);page.locator('#theme55').select_option('latte');page.locator('#zoom55').select_option('125');summary.click()
  assert menu.get_attribute('open') is not None
  assert page.locator('#selection .object-menu-content56').is_visible()
  assert page.locator('#selection').bounding_box()['y']+page.locator('#selection').bounding_box()['height']<=viewport['height']
  if viewport['width']==1440:page.screenshot(path='/mnt/data/v551-object-menu.png')
  search.press('Escape')
 page.locator('#zoom55').select_option('100');page.locator('#selection .object-bar56>button').click();assert page.locator('#tabs [data-tab=check]').evaluate("e=>e.classList.contains('active')")
 assert not errors,errors
 print('PASS view bounds and direct check action; no page errors')
 b.close()
