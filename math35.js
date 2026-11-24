/* Exact local radial integrals, variable-limit total derivatives, piecewise quadratic extrema. */
(function(M){'use strict';const {Q,N,V,B,F,parse:P,simp:S,derivative:D}=M,q=Q.of,add=(a,b)=>S(B('+',a,b)),sub=(a,b)=>S(B('-',a,b)),mul=(a,b)=>S(B('*',a,b)),div=(a,b)=>S(B('/',a,b)),eq=(a,b)=>M.eqRat25(a,b),norm=(a,x)=>M.fromPoly(M.poly(a,x),x),req=(b,s)=>{if(!b)throw Error(s)};
// Circle centered (a,0), radius a. Exact split currently supports a=1, cut radius=1.
function polar35(p,upper,angle,sym){req(q(p.a).str()==='1'&&q(p.cut).str()==='1','当前仅支持本单位圆分区');let u=P(upper.replace(/cos\(t\)/g,'c'));M.domain34(u);req(eq(u,P('2*c'))&&angle==='1/2'&&sym==='2','核对圆的半径上限、上半区域角度和对称倍数');return {...p,upper:'2*cos(t)',sym:'2'}}
function cut35(p,cut){req(q(cut).str()==='1/3','由 2cosθ=1 得 θ=π/3');return {...p,angle:cut}}
function radial35(p,side,proposal){req(['low','high'].includes(side),'请选择角区间');let r=V('r'),c=N(p.cut),R=P('2*c'),low=P(proposal),target=mul(r,sub(c,r));M.domain34(low);req(eq(low,target),'负号区间应为 (1−r)r，包含极坐标因子 r');let positive=mul(r,sub(r,c));let prim=a=>M.fromPoly(M.poly(a,'r').map((v,i)=>v.div(i+1)).reduce((a,b)=>[...a,b],[q(0)]),'r');let int=(a,l,h)=>sub(S(M.sub(prim(a),'r',h)),S(M.sub(prim(a),'r',l)));let result=side==='low'?add(int(low,N(0),c),int(positive,c,R)):int(low,N(0),R);return {side,ast:norm(result,'c'),p};}
// primitives for cos^0, cos^1, cos^2, cos^3, evaluated at the three supported angles.
const ends={ '0':[['0','0','0'],['0','0','0'],['0','0','0'],['0','0','0']], '1/3':[['0','1/3','0'],['0','0','1/2'],['0','1/6','1/8'],['0','0','3/8']], '1/2':[['0','1/2','0'],['1','0','0'],['0','1/4','0'],['2/3','0','0']]};
function angular35(r,method){req(method==='powers','请选余弦幂降幂及 sin 换元');let lo=r.side==='low'?'0':'1/3',hi=r.side==='low'?'1/3':'1/2',coeff=M.poly(r.ast,'c');req(coeff.length<=4,'只支持三次余弦多项式');return {side:r.side,terms:[0,1,2].map(j=>coeff.reduce((s,c,k)=>s.add(c.mul(q(ends[hi][k][j]).sub(ends[lo][k][j]))),q(0)).str())}}
function polarSum35(a,b,sym){req(a.side!==b.side,'必须引用两个不同角区间');return a.terms.map((v,i)=>q(v).add(b.terms[i]).mul(sym).str())}
function radical35(a){return add(add(N(a[0]),mul(N(a[1]),V('\\pi'))),mul(N(a[2]),F('sqrt',N(3))))}
// j=integral_y^x h(t)dt; differentiation along x adds h(x)∂j.
function total35(a,h,order){let d=k=>M.vars(a).includes(k)?D(a,k):N(0);let s=add(add(d('x'),mul(d('z'),V('p'))),mul(d('j'),M.sub(h,'t',V('x'))));if(order===2)s=add(s,mul(d('p'),V('q')));else req(order===1,'只支持前两阶');return atom35(s)}
// canonical rational expressions in e, preserving exp(k) as e^k for exact arithmetic.
function atom35(a){if(a.t==='f'){let v=S(a.a);if(a.v==='exp'&&v.t==='n'&&q(v.v).d===1n)return q(v.v).n<0n?div(N(1),S(B('^',V('e'),N(q(v.v).neg())))):S(B('^',V('e'),v));return F(a.v,atom35(a.a))}if(a.t==='b'){let l=atom35(a.a),r=atom35(a.b);if(a.v==='/'&&l.t==='n'&&l.v==='0'){M.domain34(B('/',N(1),r),['e','z']);return N(0)}if(a.v==='-'&&l.t==='n'&&l.v==='0')return mul(N(-1),r);return S(B(a.v,l,r))}return a}
function eval35(a,env){return atom35(M.evaluate33(a,env))}
function eq35(a,b){return eq(atom35(a),atom35(b))}
function isolate35(a,k,proposal){let c=atom35(D(a,k)),b=atom35(M.sub(a,k,N(0))),p=P(proposal);req(c.t==='n'&&c.v!=='0'&&eq35(a,add(mul(c,V(k)),b)),'须为非零常系数一次方程');let d=div(mul(N(-1),b),c);M.validate(p);M.domain34(p,['e']);req(M.vars(p).every(v=>v==='e')&&eq35(d,p),'输入的解与移项结果不一致');return p}
function z35(a,proposal){let p=q(proposal);req(p.n>0n,'对数真数必须为正');let v=eval35(a,{z:p.str()});req(v.t==='n'&&v.v==='0','代入后原方程不为零');req(M.str(S(a))===M.str(S(P('z+ln(z)-1'))),'目前仅支持 z+ln z=1 的唯一正根');return N(p)}
function profit35(price,cost){return norm(sub(M.revenue19(price,'x'),cost),'x')}
function score35(a){return norm(D(a,'x'),'x')}
function stationary35(d,proposal){let p=q(proposal),cs=M.poly(d,'x');req(cs.length===2&&cs[1].n!==0n&&S(M.sub(d,'x',N(p))).v==='0','驻点必须满足导数为零');return p.str()}
function branch35(a,d,root,b,claim){let c=M.poly(d,'x'),r=q(root),lo=q(b.lo),hi=b.hi===null?null:q(b.hi);req(c.length===2&&c[1].n<0n&&eq35(D(a,'x'),d),'要求严格凹二次利润');let point=r.sub(lo).n<0n?lo:hi&&r.sub(hi).n>0n?hi:r,attained=!(point.sub(lo).zero()&&!b.closedLo)&&!(hi&&point.sub(hi).zero()&&!b.closedHi);req(claim===(attained?'max':'sup'),'区分闭区间最大值和开端点上确界');return {side:b.side,point:point.str(),attained,value:S(M.sub(a,'x',N(point))).v}}
function profitMax35(a,b){req(a.side!==b.side,'请选择两个不同价格区间');let v=q(a.value).sub(b.value);let best=v.n>0n?a:v.n<0n?b:a.attained?a:b;req(best.attained,'仅有上确界，未达到最大值');return best}
Object.assign(M,{polar35,cut35,radial35,angular35,polarSum35,radical35,total35,atom35,eval35,eq35,isolate35,z35,profit35,score35,stationary35,branch35,profitMax35});})(typeof module!=='undefined'?require('./core'):window.M);
