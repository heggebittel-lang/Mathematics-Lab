'use strict';
// V5.5.1: compact selected-object action menu. Reuse the real buttons and handlers.
(()=>{
 const base=drawBook, management=new Set(['编辑','收藏公式','复制 TeX']);
 function compact(){
  const pane=$('selection'), actions=[...pane.children].filter(e=>e.tagName==='BUTTON');
  if(!actions.length)return;
  const bar=E('div',undefined,'object-bar56');
  const details=E('details',undefined,'object-menu56');
  const summary=E('summary','对象操作');
  const content=E('div',undefined,'object-menu-content56');
  const mathGroup=E('div',undefined,'object-group56'), manageGroup=E('div',undefined,'object-group56');
  const groups=[[mathGroup,'数学操作'],[manageGroup,'草稿管理']];
  const search=E('input');search.type='search';search.placeholder='查找操作';search.setAttribute('aria-label','查找对象操作');
  const empty=E('p','没有匹配的操作','muted');empty.hidden=true;
  const direct=actions.find(b=>b.textContent.trim()==='送入检测');
  for(const b of actions){if(b===direct)continue;(management.has(b.textContent.trim())?manageGroup:mathGroup).append(b)}
  const count=actions.length-(direct?1:0);summary.textContent=`对象操作 · ${count} 项`;
  for(const [group,label] of groups){if(!group.children.length){group.hidden=true;continue}group.prepend(E('small',label));}
  function filter(){let n=0;for(const [group] of groups){let k=0;for(const b of group.querySelectorAll('button')){b.hidden=!b.textContent.toLowerCase().includes(search.value.trim().toLowerCase());if(!b.hidden)k++}group.hidden=!k;n+=k}empty.hidden=!!n}
  search.addEventListener('input',filter);
  content.append(search,mathGroup,manageGroup,empty);details.append(summary,content);bar.append(details);if(direct)bar.append(direct);pane.append(bar);
  details.addEventListener('click',e=>{if(e.target.closest('button'))details.open=false},true);
  details.addEventListener('toggle',()=>{if(!details.open){search.value='';filter()}});
  bar.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape'){e.stopPropagation();if(e.key==='Escape'&&details.open){e.preventDefault();details.open=false;summary.focus()}}});
 }
 drawBook=function(){base();compact()};
 document.addEventListener('pointerdown',e=>{const d=$('selection').querySelector('details.object-menu56[open]');if(d&&!d.contains(e.target))d.open=false});
 compact();
})();
