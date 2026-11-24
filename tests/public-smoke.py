from playwright.sync_api import sync_playwright
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,re,mimetypes,collections
root=Path(__file__).resolve().parent.parent
base='https://mathlab.test/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
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
 html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+ (root/'style.css').read_text()+'</style>')
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
 assert not errors,errors
 print('PASS no uncaught page errors')
 b.close()
