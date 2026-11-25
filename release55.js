'use strict';
// V5.5: independent view preferences, never edit the mathematical state.
(()=>{
 const root=document.documentElement, body=document.body;
 const themes=[['original','经典深色'],['latte','Latte · 浅色'],['frappe','Frappé · 雾蓝'],['macchiato','Macchiato · 暮蓝'],['mocha','Mocha · 深紫']];
 const scales=[75,90,100,110,125,150];
 const read=(key,fallback)=>{try{return localStorage.getItem('ml.view55.'+key)??fallback}catch{return fallback}};
 const write=(key,value)=>{try{localStorage.setItem('ml.view55.'+key,String(value))}catch{/* offline policy may disable storage */}};
 const menu=(id,label,options)=>{const s=document.createElement('select');s.id=id;s.setAttribute('aria-label',label);s.title=label;for(const [value,text] of options){const o=document.createElement('option');o.value=value;o.textContent=text;s.append(o)}return s};
 const theme=menu('theme55','皮肤切换',themes);
 const tools=document.createElement('button');tools.id='tools55';tools.setAttribute('aria-controls','tools');
 const zoom=menu('zoom55','界面缩放',scales.map(n=>[String(n),n+'%']));
 function applyTheme(v){if(!themes.some(([k])=>k===v))v='original';root.dataset.theme55=v;theme.value=v;write('theme',v)}
 function applyTools(hidden){body.classList.toggle('tools-hidden55',hidden);tools.setAttribute('aria-pressed',String(hidden));tools.textContent=hidden?'展开公式':'收起公式';tools.title=hidden?'显示公式与操作菜单':'隐藏公式与操作菜单';write('tools',hidden?'1':'0')}
 function applyZoom(v){const n=scales.includes(Number(v))?Number(v):100;root.style.setProperty('--view-scale55',String(n/100));zoom.value=String(n);write('zoom',n)}
 document.querySelector('.header-actions').insertBefore(theme,document.getElementById('focus54'));
 document.getElementById('focus54').after(tools);
 const view=document.createElement('label');view.id='view55';view.append(document.createTextNode('视图缩放'),zoom);document.querySelector('footer').append(view);
 theme.addEventListener('change',()=>applyTheme(theme.value));tools.addEventListener('click',()=>applyTools(!body.classList.contains('tools-hidden55')));zoom.addEventListener('change',()=>applyZoom(zoom.value));
 for(const select of [theme,zoom])select.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape')e.stopPropagation()});
 applyTheme(read('theme','original'));applyTools(read('tools','0')==='1');applyZoom(read('zoom','100'));
})();
