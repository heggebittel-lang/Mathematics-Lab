/* Exact local primitives. No fixed exam answer in calculation functions. */
(function(M){'use strict';const Q=M.Q;
const rat=x=>Q.of(x);const sum=(...a)=>a.reduce((s,x)=>s.add(rat(x)),rat(0));
M.column17=(a,op,i,j,k)=>{let t=a[0].map((_,c)=>a.map(r=>r[c]));t=M.rowOp(t,op,i,j,k);return t[0].map((_,c)=>t.map(r=>r[c]))};
M.trace17=a=>{let t=M.matrix(a);if(t.length!==t[0].length)throw Error('迹仅适用于方阵');return sum(...t.map((r,i)=>r[i])).str()};
M.urn17=(r,w,added,event)=>{r=rat(r);w=rat(w);if(r.d!==1n||w.d!==1n||r.n<0n||w.n<0n||!['none','red','white'].includes(added)||!['red','white'].includes(event))throw Error('请检查球数及颜色');if(added==='red')r=r.add(rat(1));if(added==='white')w=w.add(rat(1));return (event==='red'?r:w).div(r.add(w)).str()};
M.prob17=(a,b,op)=>{a=rat(a);b=rat(b);if([a,b].some(p=>p.n<0n||p.n>p.d))throw Error('概率必须在 [0,1] 内');let c=op==='product'?a.mul(b):op==='sum'?a.add(b):null;if(!c||c.n>c.d)throw Error('请核对互斥事件及公式条件');return c.str()};
M.berVar17=p=>{p=rat(p);if(p.n<0n||p.n>p.d)throw Error('概率必须在 [0,1] 内');return p.mul(rat(1).sub(p)).str()};
M.berCov17=(p,q,j)=>{p=rat(p);q=rat(q);j=rat(j);if([p,q,j].some(t=>t.n<0n||t.n>t.d)||j.sub(p).n>0n||j.sub(q).n>0n||p.add(q).sub(rat(1)).sub(j).n>0n)throw Error('联合概率与边缘概率不相容');return j.sub(p.mul(q)).str()};
M.slope17=(fx,fy)=>rat(fx).neg().div(rat(fy)).str();
M.elastic17=(p,q,d)=>{p=rat(p);q=rat(q);if(p.n<=0n||q.n<=0n)throw Error('价格、需求须为正');return p.mul(rat(d)).neg().div(q).str()};
M.symMoment17=(density,x,k)=>{if(!Number.isInteger(k)||k<0||k>12)throw Error('阶数支持0至12的整数');let factor=k%2?0:2;return M.normalize(M.B('*',M.N(factor),M.B('*',M.B('^',M.V(x),M.N(k)),density)))};
})(globalThis.M);
