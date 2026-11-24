/* Reusable path differentiation, exceptional spans, paired means and telescoping. */
(function(M){'use strict';const {Q,N,V,B,F,parse,normalize}=M,q=Q.of;
function path27(p){let val=k=>M.evalAt(parse(p[k]),{x:p.at}),d=k=>M.evalAt(M.derivative(parse(p[k]),'x'),{x:p.at});let u=val('u'),v=val('v'),du=d('u'),dv=d('v'),h=d('h');if([u,v,du,dv,h].some(a=>a.t!=='n'))throw Error('当前仅支持精确有理点及路径导数');return {point:[u.v,v.v],row:[du.v,dv.v,h.v],ast:normalize(B('-',B('+',B('*',du,V('a')),B('*',dv,V('b'))),h))}}
function eliminate27(a,b,k){if(a.point.join()!==b.point.join())throw Error('两个路径必须经过同一点');if(![0,1].includes(k))throw Error('请选择消去的偏导');let A=a.row.map(q),D=b.row.map(q);if(A[k].zero())throw Error('第一式所选消元系数不能为零');let ratio=D[k].div(A[k]),r=D.map((v,i)=>v.sub(A[i].mul(ratio))),j=1-k;if(r[j].zero())throw Error('不能唯一确定两个偏导');return {ratio:ratio.str(),index:j,value:r[2].div(r[j]).str(),row:r.map(v=>v.str())}}
function back27(a,z){let k=z.index,j=1-k,r=a.row.map(q);if(r[j].zero())throw Error('不能从当前方程回代');let v=r[2].sub(r[k].mul(z.value)).div(r[j]),out=[];out[k]=z.value;out[j]=v.str();return out}
function exceptional27(A,Bm,x){let p=M.determinant25(A),r=M.determinant25(Bm),roots=[M.solve(p,x),M.solve(r,x)];if(roots.some(z=>z.irr.length||z.status==='all'))throw Error('当前只支持非恒零行列式及完整有理根');return [...new Set(roots.flatMap(z=>z.roots))].sort((a,b)=>q(a).sub(b).n<0n?-1:1)}
function spanAt27(A,Bm,x,t){let env={[x]:q(t).str()};return M.span25(M.evalMatrix(A,env),M.evalMatrix(Bm,env))}
function paired27(c,d){c=q(c);d=q(d);return {mean:normalize(parse(`(${c.str()})*a+(${d.str()})*b`)),variance:normalize(parse(`(${c.pow(2).str()})*s^2+(${d.pow(2).str()})*t^2+(${c.mul(d).mul(2).str()})*r*s*t`))}}
function telescope27(term,A,C){let a=q(A),c=q(C),rhs=parse(`(${a.str()})/k+(${c.str()})/(k+1)`);if(!M.eqRat25(term,rhs)||!a.add(c).zero())throw Error('裂项与原通项不等价，或不能相邻抵消');return {a:a.str(),c:c.str(),rhs}}
function telescopeSum27(z){return normalize(parse(`(${z.a})+(${z.c})/(n+1)`))}
function radius27(lo,hi,center){let a=q(center).sub(lo),b=q(hi).sub(center);if(a.n<=0n||!a.sub(b).zero())throw Error('原收敛区间与中心不对称');return a.str()}
Object.assign(M,{path27,eliminate27,back27,exceptional27,spanAt27,paired27,telescope27,telescopeSum27,radius27});})(typeof module!=='undefined'?require('./core'):window.M);
