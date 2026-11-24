const assert=require('node:assert/strict'),M=require('../core');require('../algebra');require('../calculus-extra');require('../math06');require('../math07');const mat=value=>({id:'root',value}),same=(a,b,x='a')=>assert(M.zero07(M.B('-',a,b),x)),zero=M.N(0);let n=0;function t(name,f){f();console.log('PASS '+name);n++}
t('zero row with parameter after reciprocal scaling',()=>{let o=mat([['a','1'],['0','0']]);let b={...o,...M.detTransform07(o,'R','scale',0,1,'1/a','0')};let r=M.detTerminal07(b,'zero');same(M.detFinish07(r.d,r.val),zero);assert(r.d.conditions.length)});
t('proportional symbolic rows',()=>{let r=M.detDependent09(mat([['a','2*a','3*a'],['1','2','3'],['0','1','2']]),'R',0,1);same(r.val,zero)});
t('proportional symbolic columns with denominators',()=>{let r=M.detDependent09(mat([['1/a','1'],['2/a','2']]),'C',0,1);same(r.val,zero);assert(r.d.rootConditions.length)});
t('reject unrelated rows',()=>assert.throws(()=>M.detDependent09(mat([['a','1'],['1','a']]),'R',0,1)));
t('reject same row',()=>assert.throws(()=>M.detDependent09(mat([['a','1'],['1','a']]),'R',0,0)));
t('Sarrus symbolic determinant matches direct expansion',()=>{let o=mat([['a','2','3'],['4','5','6'],['7','8','a']]);let r=M.detSarrus09(o);same(r.val,M.detAst(o.value.map(r=>r.map(M.parse))))});
t('Sarrus on transformed rational matrix',()=>{let o=mat([['a','2','3'],['4','5','6'],['7','8','a']]);let b={...o,...M.detTransform07(o,'R','scale',0,1,'1/a','0')};let r=M.detSarrus09(b);same(M.detFinish07(r.d,r.val),M.detAst(o.value.map(r=>r.map(M.parse))))});
t('reject Sarrus for fourth order',()=>assert.throws(()=>M.detSarrus09(mat(Array.from({length:4},()=>['1','2','3','4'])))));
console.log(n+' V0.9 tests passed');
