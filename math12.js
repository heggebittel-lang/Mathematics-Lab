/* V1.2 exact paper-and-pencil primitives. No question IDs. */
(function(M){'use strict';const {Q,N,V,B,parse,simp,normalize:norm}=M,q=Q.of;
function binVariance(n,p){n=q(n);if(n.d!==1n||n.n<=0n)throw Error('n 须正整数');return simp(B('*',N(n),B('*',p,B('-',N(1),p))))}
function indepCombination(a,b,n,m){a=q(a);b=q(b);n=q(n);m=q(m);if(n.n<=0n||m.n<=0n)throw Error('方差因子须正');return a.pow(2).mul(n).add(b.pow(2).mul(m)).str()}
function indepCov(a,b,c,d,n,m){return q(a).mul(c).mul(n).add(q(b).mul(d).mul(m)).str()}
function indicatorVariance(p,n){if(p.t==='n'&&(q(p.v).n<0n||q(p.v).n>q(p.v).d))throw Error('概率须在 [0,1]');return simp(B('/',B('*',p,B('-',N(1),p)),n))}
function pair(a,b,relation){a=q(a);b=q(b);if([a,b].some(z=>z.n<0n||z.n>z.d))throw Error('概率范围错误');if(relation==='independent')return a.mul(b).str();if(relation==='disjoint'){if(a.add(b).n>a.add(b).d)throw Error('互斥概率之和不能大于1');return '0'}throw Error('请选择独立或互斥条件')}
function event3(probs,pairs,triple){let s=probs.map(q).reduce((a,b)=>a.add(b),q(0)),p=pairs.map(q).reduce((a,b)=>a.add(b),q(0)),t=q(triple),u=s.sub(p).add(t),one=s.sub(p.mul(2)).add(t.mul(3));if(u.n<0n||u.n>u.d||one.n<0n||one.sub(u).n>0n)throw Error('概率条件不相容');return {sum:s.str(),pair:p.str(),triple:t.str(),union:u.str(),one:one.str()}}
function poisAbs(lambda){let l=q(lambda);if(l.n<=0n||l.d!==1n||l.n>100n)throw Error('此公式支持正整数泊松参数 ≤100');let k=Number(l.n),coef=q(0),parts=[],f=q(1);for(let i=0;i<k;i++){if(i)f=f.mul(i);let c=l.pow(i).div(f).mul(k-i).mul(2);coef=coef.add(c);parts.push(c.str())}return {lambda:l.str(),coef:coef.str(),parts}}
function asymptotic(exp,den,x,L){let e=M.taylor(exp,x,'0',2),d=M.taylor(den,x,'0',2);if(d.coeff[0]!=='0'||d.coeff[1]!=='0'||d.coeff[2]==='0'||e.coeff[0]!=='1')throw Error('本入口要求分母二阶非零首项且指数项常数为1');let slope=q(e.coeff[2]).add(q(L).mul(d.coeff[2]));return {e:e.coeff,d:d.coeff,f0:e.coeff[1],slope:slope.str(),L:q(L).str()}}
function reciprocalLog(k,lo,ratio){k=q(k);lo=q(lo);ratio=q(ratio);if(k.n<=0n||lo.n<=0n||ratio.n<=0n)throw Error('需要 k、下限与对数真数为正');return k.mul(lo).mul(ratio.sub(1)).str()}
function diffSum(g,x){let p=M.poly(g,x);while(p.length>1&&p.at(-1).zero())p.pop();if(p.length>2)throw Error('此累加公式当前只支持仿射右端');return norm(B('+',B('*',N(p[0]),V(x)),B('*',N((p[1]||q(0)).div(2)),B('*',V(x),B('-',V(x),N(1))))))}

function isolate(a,x){let ps=M.sparse(a),c=ps.get(x);if(!c||c.zero()||[...ps.keys()].some(k=>k.includes(x)&&k!==x))throw Error('所选变量必须只以非零常数系数的一次项出现');return norm(B('/',B('-',N(0),norm(B('-',a,B('*',N(c),V(x))))),N(c)))}
function verifyPoint(eqs,env){return eqs.every(e=>{let z=M.evalAt(B('-',e.lhs,e.rhs),env);return z.t==='n'&&q(z.v).zero()})}
Object.assign(M,{isolate12:isolate,verifyPoint12:verifyPoint,binVariance12:binVariance,indepCombination12:indepCombination,indepCov12:indepCov,indicatorVariance12:indicatorVariance,pair12:pair,event3_12:event3,poisAbs12:poisAbs,asymptotic12:asymptotic,reciprocalLog12:reciprocalLog,diffSum12:diffSum});})(typeof module!=='undefined'?require('./core.js'):window.M);
