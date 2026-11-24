/* Exact arithmetic and restricted formula families for V2.5. */
(function(M){'use strict';const {Q,N,V,B,F,parse,normalize,simp}=M,q=Q.of;
const same=(A,B)=>JSON.stringify(A)===JSON.stringify(B),zero=a=>[...M.sparse(a).values()].every(v=>v.zero());
function determinant25(value){return normalize(M.detAst(value.map(r=>r.map(parse))))}
function rank25(A){return M.rref(A).pivots.length}
function span25(A,B){if(A.length!==B.length)throw Error('向量维数不一致');let ra=rank25(A),rb=rank25(B),rc=rank25(A.map((r,i)=>r.concat(B[i])));return {ra,rb,rc,equal:ra===rb&&rb===rc}}
function evaluateGroup25(A,B,a){return span25(M.evalMatrix(A,{a:q(a).str()}),M.evalMatrix(B,{a:q(a).str()}))}
function representation25(A,b,c){if(c.length!==A[0].length||b.length!==A.length)throw Error('系数或向量维数不一致');let val=A.map(row=>normalize(row.map((v,i)=>B('*',parse(v),N(c[i]))).reduce((s,t)=>B('+',s,t),N(0))));if(!val.every((v,i)=>zero(B('-',v,parse(b[i])))))throw Error('线性组合与目标向量不相等');return val}
function traceMatch25(A,Bm,y){y=q(y);if(!y.sub(A[2][2]).zero()&& !['2','-1'].includes(A[2][2]))throw Error('已知特征值必须在 B 的对角线上');let x=q(Bm[0][0]).add(Bm[1][1]).add(y).sub(A[0][0]).sub(A[2][2]);let a=M.evalMatrix(A,{x:x.str()}),b=M.evalMatrix(Bm,{y:y.str()});let diff=B('-',M.char(a,'l'),M.char(b,'l'));if(!zero(diff))throw Error('迹相等还不够：特征多项式不同');return {x:x.str(),y:y.str(),A:a,B:b}}
function column25(A,lambda,p,previous=null,k='0'){if(p.length!==A.length)throw Error('请填写正确维数的列向量');p=p.map(v=>q(v).str());if(p.every(v=>q(v).zero()))throw Error('列向量不可为零');let left=M.mul(A,p.map(v=>[v])).flat(),right=p.map((v,i)=>q(v).mul(lambda).add(previous?q(previous[i]).mul(k):0).str());if(!same(left,right))throw Error('当前列不满足 AP=PB 的对应列关系');return p}
function similarity25(A,B,P){if(q(M.det(P).v).zero())throw Error('P 不可逆');if(!same(M.mul(A,P),M.mul(P,B)))throw Error('AP 与 PB 不相等');return P}
function halfNorm25(){return F('sqrt',B('/',N(2),V('\\pi')))}
function halfLog25(n=V('n'),s=V('s')){return simp(B('-',B('*',B('/',N(-1),N(2)),B('*',n,F('ln',V('v')))),B('/',s,B('*',N(2),V('v')))))}
function rational25(a){if(a.t==='n'||a.t==='v')return [a,N(1)];if(a.t!=='b')throw Error('仅支持有理式');let [p,d]=rational25(a.a);if(a.v==='^'){let k=q(a.b.v);if(a.b.t!=='n'||k.d!==1n||k.n<0n||k.n>8n)throw Error('仅支持小整数非负幂');return [B('^',p,a.b),B('^',d,a.b)]}let [r,s]=rational25(a.b),m=(a,b)=>B('*',a,b);if(a.v==='*')return [m(p,r),m(d,s)];if(a.v==='/')return [m(p,s),m(d,r)];if(a.v==='+'||a.v==='-')return [B(a.v,m(p,s),m(r,d)),m(d,s)];throw Error('未知运算')}
function eqRat25(a,b){let [p,d]=rational25(a),[r,s]=rational25(b);return !zero(d)&&!zero(s)&&zero(B('-',B('*',p,s),B('*',r,d)))}
function halfScore25(log){let d=M.derivative(log,'v'),expected=parse('(s-n*v)/(2*v^2)');if(!eqRat25(d,expected))throw Error('对数似然的导数不匹配');return expected}
function halfRoot25(d){if(!eqRat25(d,parse('(s-n*v)/(2*v^2)')))throw Error('请选择正确的得分函数');return parse('s/n')}
function cosineEven25(n){if(!Number.isInteger(n)||n<0||n>20||n%2)throw Error('当前支持 0—20 的偶数幂');let r=q(1);for(let k=2;k<=n;k+=2)r=r.mul(q(k-1).div(k));return r.str()}
function halfDiskMoment25(R){R=q(R);if(R.n<=0n)throw Error('半径必须为正');return R.pow(4).div(8).str()}
function repeatedODE25(root){root=q(root);return normalize(B('^',B('-',V('r'),N(root)),N(2)))}
function odeForcing25(poly,exponent){return M.evalAt(poly,{r:q(exponent).str()})}
Object.assign(M,{determinant25,rank25,span25,evaluateGroup25,representation25,traceMatch25,column25,similarity25,halfNorm25,halfLog25,eqRat25,halfScore25,halfRoot25,cosineEven25,halfDiskMoment25,repeatedODE25,odeForcing25});})(typeof module!=='undefined'?require('./core'):window.M);
