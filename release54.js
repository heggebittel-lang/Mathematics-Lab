'use strict';
// V5.4: display-only notebook controls; no edits to objects or checks.
let filterQuestion54=S.question;
function applyBookFilter54(){
 const query=$('bookSearch54').value.trim().toLowerCase(), mode=$('bookFilter54').value;
 let cards=[...$('book').querySelectorAll('.object')], shown=0;
 for(const card of cards){const o=S.objects.find(z=>z.id===card.dataset.id);if(!o)continue;
  const matches=(!query||[o.id,o.title,o.kind,o.name].some(v=>String(v??'').toLowerCase().includes(query)))&&
   (mode==='all'||(mode==='given'&&o.given)||(mode==='derived'&&!o.given&&!o.stale)||(mode==='stale'&&o.stale));
  card.hidden=!matches;if(matches)shown++;
 }
 $('bookCount54').textContent=shown===cards.length?'':`显示 ${shown}/${cards.length} 条${selected()&&cards.some(c=>c.dataset.id===S.selected&&c.hidden)?' · 所选对象已被筛选隐藏':''}`;
}
function resetBookFilter54(){$('bookSearch54').value='';$('bookFilter54').value='all';applyBookFilter54()}
const book54=drawBook;drawBook=function(){if(filterQuestion54!==S.question){filterQuestion54=S.question;$('bookSearch54').value='';$('bookFilter54').value='all'}book54();applyBookFilter54()};
$('bookSearch54').addEventListener('input',applyBookFilter54);$('bookFilter54').addEventListener('change',applyBookFilter54);$('bookReset54').onclick=resetBookFilter54;
for(const id of ['jump','latest']){const old=$(id).onclick;$(id).onclick=e=>{resetBookFilter54();old?.(e)}}
$('focus54').onclick=()=>{const active=document.body.classList.toggle('focus54');$('focus54').setAttribute('aria-pressed',String(active));$('focus54').textContent=active?'恢复导航':'专注推导'};
$('keys54').onclick=()=>{const hidden=document.body.classList.toggle('keys-hidden54');$('keys54').setAttribute('aria-pressed',String(!hidden));$('keys54').textContent=hidden?'显示键盘':'数学键盘'};
// Keyboard use in notebook search must never commit a mathematical form.
$('bookSearch54').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape'){e.stopPropagation();if(e.key==='Escape'){e.preventDefault();resetBookFilter54()}}});
applyBookFilter54();
