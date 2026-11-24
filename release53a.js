/* V5.3A: restore the 2026 source link whenever the legacy resource dialog is rebuilt.
   No mathematical operation or saved-record schema is changed. */
'use strict';
const sourceFile53a='2026数学三真题与详解（用户基准）.pdf';
function sourceLink53a(text,page=1){const a=localLink06(text,sourceFile53a,page);a.rel='noopener';return a}
const resources53a=$('resources').onclick;
$('resources').onclick=function(){resources53a();const el=$('resourceList');if(![...el.querySelectorAll('a')].some(a=>a.getAttribute('href')?.includes(encodeURIComponent(sourceFile53a))))el.append(sourceLink53a(sourceFile53a))};
const archive53a=examArchive06;
examArchive06=function(){archive53a();const el=$('resourceList'),title=el.querySelector('h2');title.textContent='历年资料 · 2010—2026';const row=E('div',undefined,'archive-row');row.append(E('b','2026 年'),E('small','用户指定汇编 · 12页（含答案与解析） · 22 道已结构化'),sourceLink53a('打开2026年汇编',1));const first=el.querySelector('.archive-row');el.insertBefore(row,first||null)};
// Keep the general intake validator strict for new/imported questions. Only existing
// explicitly registered manual-proof questions may omit automatic check items.
function auditQuestion53a(q){const errors=ContentIntake05.validateQuestion(q);const cfg=proofConfig50[q.id];if(cfg&&Array.isArray(q.checks)&&q.checks.length===0){const i=errors.indexOf('未配置检测项');if(i>=0)errors.splice(i,1);if(cfg.parts?.length!==2||cfg.rubrics?.length!==2||cfg.rubrics.some(r=>!r.length))errors.push('人工证明自评配置不完整')};return errors}
refresh();
