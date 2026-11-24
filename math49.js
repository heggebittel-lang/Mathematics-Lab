/* Exact helpers for selected binomial, Taylor and polar operations. */
(function(M){'use strict';const {Q,N,V,B}=M,q=Q.of;
function binEvents(n,mode){if(!Number.isInteger(n)||n<1||n>8)throw Error('试验次数须为1至8');let p=V('p'),fail=B('-',N(1),p),den=N(0);if(mode==='complement')den=B('-',N(1),B('^',fail,N(n)));else if(mode==='sum'){let c=1;for(let j=1;j<=n;j++){c=c*(n-j+1)/j;den=B('+',den,B('*',N(c),B('*',B('^',p,N(j)),B('^',fail,N(n-j)))));}}else throw Error('请选择计算条件事件的方法');return {num:B('^',p,N(n)),den:M.normalize(den)}}
function binCancel(ast,k){if(!Number.isInteger(k)||k<1)throw Error('请选择要约去的正整数幂');let c=M.poly(ast,'p');if(k>=c.length||c.slice(0,k).some(t=>!t.zero()))throw Error('不能约去所选因子');let a=c.slice(k);let g=a.reduce((u,t)=>{let v=t.n<0n?-t.n:t.n;while(v){let r=u%v;u=v;v=r}return u},0n);if(g>1n&&a.every(t=>t.d===1n))a=a.map(t=>t.div(g.toString()));return M.fromPoly(a,'p')}
function asymCombine(e,d,L,lead){if(e.length<3||d.length<3||lead!==2||d[0]!=='0'||d[1]!=='0'||d[2]==='0'||e[0]!=='1')throw Error('请检查展开精度及分母首个非零幂次');return {e:e.slice(0,3),d:d.slice(0,3),L:q(L).str(),f0:e[1],slope:q(e[2]).add(q(L).mul(d[2])).str()}}
function polarHalf(k,half,bound,sym){if(!['lower','upper'].includes(half)||bound!==(half==='lower'?'sin':'cos')||!['yes','no'].includes(sym))throw Error('请检查所选角域内较小的径向上界及对称方式');k=q(k);if(k.n<=0n)throw Error('圆参数须为正');return {k:k.str(),half,bound,sym}}
function polarRad(h,power){if(power!==3)throw Error('请检查被积函数的二次齐次性与极坐标雅可比');return {...h,factor:q(h.k).pow(power+1).div(power+1).mul(h.sym==='yes'?2:1).str()}}
function polarTrig(a,b,c){let z=[a,b,c].map(q); // sin^4=(1-2cos2t+cos^2 2t)/4
let want=['3/8','-1/2','1/8'].map(q);if(z.some((t,i)=>!t.sub(want[i]).zero()))throw Error('降幂系数与 sin⁴θ 不一致');return z.map(t=>t.str())}
function polarPrim(coeff,A,B,C){let z=[A,B,C].map(q);if([z[0],z[1].mul(2),z[2].mul(4)].some((t,i)=>!t.sub(coeff[i]).zero()))throw Error('角向原函数求导不一致');return {pi:z[0].div(4).str(),constant:z[1].str()}}
function polarCross(A,power){let a=q(A);if(power!==6||!a.mul(power).sub(2).zero())throw Error('请检查换元后幂函数的原函数');return a.div(8).str()}
function polarResult(f,a,b){return {pi:q(f).mul(a.pi).str(),constant:q(f).mul(q(a.constant).sub(b)).str()}}
function polarSum(a,b){if(a.half===b.half||a.sym!=='no'||b.sym!=='no')throw Error('仅可合并未乘2的两个不同半区域');return {pi:q(a.pi).add(b.pi).str(),constant:q(a.constant).add(b.constant).str()}}
Object.assign(M,{binEvents49:binEvents,binCancel49:binCancel,asymCombine49:asymCombine,polarHalf49:polarHalf,polarRad49:polarRad,polarTrig49:polarTrig,polarPrim49:polarPrim,polarCross49:polarCross,polarResult49:polarResult,polarSum49:polarSum});})(typeof module!=='undefined'?require('./core'):window.M);
