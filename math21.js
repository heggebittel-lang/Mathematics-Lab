/* V2.1 Exact, restricted operations for economic optimization, polar integrals, and CDFs. */
(function(M){'use strict';const {Q,N,V,B,F,parse,simp,normalize}=M,q=Q.of;
const pos=v=>{let z=q(v);if(z.n<=0n)throw Error('参数必须为正');return z};
const eq=(a,b)=>M.sparse(B('-',a,b)).size===0;
function costRatio(p){let x=pos(p.wx),y=pos(p.wy);return y.mul(3).div(x).str()}
function costScale(p,ratio){if(q(ratio).str()!==costRatio(p))throw Error('边际产量比与要素价格比不一致');let r=M.exact19(F('sqrt',N(ratio)));if(r.t!=='n')throw Error('当前精确工具要求投入比为有理平方');return {K:pos(p.A).mul(r.v).str(),C:pos(p.wx).mul(ratio).add(pos(p.wy)).str(),ratio:q(ratio).str()}}
function profitAst(p,c){let x=V('q');return B('-',B('-',B('*',N(p.a),x),B('*',N(p.b),B('^',x,N(2)))),B('*',N(c.C),B('^',B('/',x,N(c.K)),N('3/2'))))}
function profitDerivative(p,c){let K=pos(c.K),C=pos(c.C),b=pos(p.b),a=pos(p.a),x=V('q');return simp(B('-',B('-',N(a),B('*',N(b.mul(2)),x)),B('*',N(C.mul('3/2').div(K)),F('sqrt',B('/',x,N(K))))))}
function profitScore(p,c){let K=pos(c.K),C=pos(c.C),b=pos(p.b),a=pos(p.a);return normalize(B('-',B('-',N(a),B('*',N(b.mul(2).mul(K)),B('^',V('t'),N(2)))),B('*',N(C.mul('3/2').div(K)),V('t'))))}
function optQuantity(p,c,t,left,right){t=pos(t);let score=profitScore(p,c);if(!q(M.simp(M.sub(score,'t',N(t))).v).zero())throw Error('该点不是利润导数的零点');if(left!=='+'||right!=='-')throw Error('导数符号不正确：在 t≥0 上严格递减，且起点为正');return pos(c.K).mul(t.pow(2)).str()}
// Upper half disk on right and triangle on left: integrand (x-y)^2/(x²+y²).
function polarBranch(p,side,bound,theta){let a=pos(p.R),b=pos(p.L);if(!['right','left'].includes(side)||bound!==(side==='right'?'circle':'line')||theta!==(side==='right'?'first':'second'))throw Error('区域角度或半径上限不匹配');return {side,R:a.str(),L:b.str()}}
function polarRadial(p){let a=pos(p.side==='right'?p.R:p.L).pow(2).div(2);return {side:p.side,k:a.str(),trig:p.side==='right'}}
function polarAngular(p,method){if(method!==(p.trig?'trig':'constant'))throw Error('请选择与径向积分结果匹配的公式');let k=q(p.k);return {pi:k.div(2).str(),constant:p.trig?k.neg().str():'0',side:p.side}}
function polarSum(a,b){if(a.side===b.side)throw Error('请选择两片不同区域');return {pi:q(a.pi).add(b.pi).str(),constant:q(a.constant).add(b.constant).str()}}
// Sector 0<=theta<=pi/4, e^{(x+y)^2}(x²-y²).
function sectorPlan(R,bound,theta){if(bound!=='circle'||theta!=='wedge')throw Error('区域是第一象限 x 轴与 y=x 之间的圆扇形');return {R:pos(R).str()}}
function sectorAngle(p,u){if(!eq(parse(u),parse('1+s')) )throw Error('请用 s 代表 sin(2θ)，换元 t=1+s');return {...p,u:'1+s'}}
function sectorInner(p){return B('*',B('/',V('r'),N(2)),B('-',F('exp',B('*',N(2),B('^',V('r'),N(2)))),F('exp',B('^',V('r'),N(2))))) }
function sectorOuter(p){let R=pos(p.R).pow(2);return simp(B('-',B('/',B('-',F('exp',N(R.mul(2))),N(1)),N(8)),B('/',B('-',F('exp',N(R)),N(1)),N(4))))}
// Uniform cut of (0,L), shorter segment X, longer Y.
function cutCDF(L,events){let a=pos(L);if(events!=='tails')throw Error('短段≤x对应分割点落在两端区间的并集');return {L:a.str(),half:a.div(2).str(),slope:q(2).div(a).str()}}
function ratioCDF(p,direction){if(direction!=='ge')throw Error('Y/X≤z 等价于 X≥L/(z+1)，注意不等号');return simp(B('-',N(1),B('/',N(2),B('+',V('z'),N(1)))))}
function cutRatioMoment(p){let L=pos(p.L);return {ast:simp(B('*',N(q(2).div(L)),B('/',V('x'),B('-',N(L),V('x'))))),lo:'0',hi:L.div(2).str()}}
function cutRatioPrimitive(p){let L=pos(p.L);return B('+',B('*',N(q(-2).div(L)),V('x')),B('*',N(-2),F('ln',B('-',N(L),V('x')))))}
function cutRatioBounds(p){return B('-',B('*',N(2),F('ln',N(2))),N(1))}
// One-sided limit of (1+c|x|)^(d/x) and atan(k/x), k>0.
function sideLimit(p,side){if(!['left','right'].includes(side))throw Error('请选择单侧');let sign=side==='right'?q(1):q(-1);pos(p.k);return {side,coef:sign.div(2).str(),exp:q(p.c).mul(p.d).mul(sign).str()}}
function sideSolve(a,b){if(a.side===b.side)throw Error('请选择左右两侧不同的极限');let r=a.side==='right'?a:b,l=a.side==='left'?a:b;return B('/',B('-',F('exp',N(l.exp)),F('exp',N(r.exp))),simp(B('*',N(q(r.coef).sub(l.coef)),V('\\pi'))))}
Object.assign(M,{costRatio21:costRatio,costScale21:costScale,profitAst21:profitAst,profitDerivative21:profitDerivative,profitScore21:profitScore,optQuantity21:optQuantity,polarBranch21:polarBranch,polarRadial21:polarRadial,polarAngular21:polarAngular,polarSum21:polarSum,sectorPlan21:sectorPlan,sectorAngle21:sectorAngle,sectorInner21:sectorInner,sectorOuter21:sectorOuter,cutCDF21:cutCDF,ratioCDF21:ratioCDF,cutRatioMoment21:cutRatioMoment,cutRatioPrimitive21:cutRatioPrimitive,cutRatioBounds21:cutRatioBounds,sideLimit21:sideLimit,sideSolve21:sideSolve});})(typeof module!=='undefined'?require('./core'):window.M);
