'use strict';
// Public distribution: private reference files are not redistributed.
let localMaterialsPublic=false;
function publicMaterialNotice(text){return E('p',text,'muted public-material-notice')}
const originalPaperPublic=paperImages16;
paperImages16=function(q,p){if(localMaterialsPublic)return originalPaperPublic(q,p);let box=E('div',undefined,'paper16-figure');box.append(publicMaterialNotice(`${q.title}：公开版不附原卷扫描件，请对照自备试卷第 ${p.page} 页；数学运算及解析仍可使用。`));return box};
const originalGalleryPublic=gallery06;
gallery06=function(list,title){if(localMaterialsPublic)return originalGalleryPublic(list,title);const el=$('resourceList');el.replaceChildren(E('h2',title),publicMaterialNotice('此处需要自备本地原卷或手册。公开版不包含第三方扫描件；补齐后可启用本地资料。'));if(!$('dialog').open)$('dialog').showModal()};
const btnPublic=button('本地资料：关闭',()=>{localMaterialsPublic=!localMaterialsPublic;btnPublic.textContent=localMaterialsPublic?'本地资料：开启':'本地资料：关闭';btnPublic.setAttribute('aria-pressed',String(localMaterialsPublic));showTab(tab);msg(localMaterialsPublic?'已开启自备本地资料入口':'已关闭本地资料入口')});
btnPublic.id='localMaterialsPublic';btnPublic.setAttribute('aria-pressed','false');$('resources').before(btnPublic);
const bannerPublic=E('span','公开版 · 部分旧题需自备试卷','muted');bannerPublic.title='不附第三方扫描件；详见 README';document.querySelector('footer').append(bannerPublic);
// Legacy links remain usable after the reader restores their own local files.
document.addEventListener('click',e=>{const a=e.target.closest?.('a');if(!a)return;const href=a.getAttribute('href')||'';if(!localMaterialsPublic&&/^(resources|assets06|assets16)\//.test(href)){e.preventDefault();msg('公开版不附本地资料文件。请先自行补齐，再开启本地资料。',true)}},true);
document.addEventListener('error',e=>{const im=e.target;if(im?.tagName!=='IMG'||!/(?:assets06|assets16)\//.test(im.getAttribute('src')||''))return;im.replaceWith(publicMaterialNotice('原卷图未随公开版提供，请对照自备原卷。'));},true);
const publicProofRender=renderQuestion;
renderQuestion=function(){publicProofRender();if(!localMaterialsPublic){for(const im of $('center').querySelectorAll('img.proof50-image'))im.replaceWith(publicMaterialNotice('公开版不附原卷图；请以自备原卷或工作台内题设为准。'))}};
refresh();
