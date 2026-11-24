/* V2.2: exact staged operations for quadratic fractions, shifts, power series and parameter branches. */
(function(M){'use strict';const {Q,N,V,B,F,parse,normalize,simp}=M,q=Q.of,x=V('x'),y=V('y');
const add=(a,b)=>normalize(B('+',a,b)),mul=(a,b)=>normalize(B('*',a,b)),pow=(a,k)=>B('^',a,N(k)),div=(a,b)=>simp(B('/',a,b));
function splitQuadratic(a,b,c,u,v){a=q(a);b=q(b);c=q(c);u=q(u);v=q(v);if(a.str()!=='1')throw Error('目前要求首一二次分母');let h=b.div(2),d=c.sub(h.pow(2));if(d.n<=0n)throw Error('配方后的常数必须为正');let k=u.div(2),r=v.sub(k.mul(b));return {b:b.str(),c:c.str(),h:h.str(),d:d.str(),k:k.str(),r:r.str()}}
function quadBounds(p,lo,hi){lo=q(lo);hi=q(hi);let h=q(p.h),d=q(p.d),a=lo.add(h),b=hi.add(h);if(d.str()!=='3'||a.str()!=='1'||b.str()!=='3')throw Error('本工具目前仅支持反正切端点 1/√3、√3 的精确角度');let ratio=b.pow(2).add(d).div(a.pow(2).add(d));return B('+',B('*',N(p.k),F('ln',N(ratio))),B('*',div(N(q(p.r).div(6)),F('sqrt',N(d))),V('\\pi')))}
function shiftIntegral(p,choice){if(choice!=='y-x')throw Error('要使 f(y−x) 的自变量变成独立变量，请选择 u=y−x');let lo=q(p.lo),hi=q(p.hi);if(hi.sub(lo).n<=0n)throw Error('区间无效');return {...p,lo:lo.str(),hi:hi.str()}}
function expIntegral(p){return simp(B('-',F('exp',N(p.hi)),F('exp',N(p.lo))))}
function multiplySame(a,b){return simp(B('*',a,b))}
// f=c ln|x| + ((x−h)^2+y^2)/(2x²), x≠0. Numerators and powers of x stored independently.
function absPartial(p,variable){if(!['x','y'].includes(variable))throw Error('请选择 x 或 y');let c=q(p.c),h=q(p.h);if(variable==='x')return {num:normalize(parse(`${c.str()}*x^2+(${h.str()})*x-(${h.pow(2).str()})-y^2`)),power:3,path:'x'};return {num:y,power:2,path:'y'}}
function partialNext(p,variable){if(!['x','y'].includes(variable)||p.path.length!==1)throw Error('请选择一阶偏导再求导');let d=M.derivative(p.num,variable);return {num:variable==='x'?normalize(B('-',mul(x,d),mul(N(p.power),p.num))):normalize(d),power:p.power+(variable==='x'?1:0),path:p.path+variable}}
function partialAst(p){return div(p.num,pow(x,p.power))}
function partialSub(p,env){let n=p.num;for(let [k,v] of Object.entries(env))n=M.sub(n,k,N(v));return normalize(n)}
function evalPartial(p,env){if(env.x===undefined||q(env.x).zero())throw Error('x 必须非零');return q(M.evalAt(p.num,env).v).div(q(env.x).pow(p.power)).str()}
function absValue(p,env){let a=q(env.x),b=q(env.y),h=q(p.h),c=q(p.c);if(a.zero())throw Error('x=0 不在定义域');let aa=a.n<0n?a.neg():a,log=aa.str()==='1'?N(0):aa.n===1n?B('*',N(c.neg()),F('ln',N(aa.d))):B('*',N(c),F('ln',N(aa))),v=a.sub(h).pow(2).add(b.pow(2)).div(a.pow(2).mul(2));return simp(B('+',N(v),log))}
function hessAt(p,parts,env){if(parts.map(z=>z.path).join(',')!=='xx,xy,yx,yy')throw Error('请按 xx、xy、yx、yy 选择对应二阶偏导');if(!['x','y'].every(v=>q(evalPartial(absPartial(p,v),env)).zero()))throw Error('所选点不满足驻点条件');return [parts.slice(0,2),parts.slice(2)].map(r=>r.map(z=>evalPartial(z,env)))}
function classifyH(H,claim){let d=q(M.det(H).v),a=q(H[0][0]),correct=d.n<0n?'saddle':d.zero()?'unknown':a.n>0n?'min':'max';if(claim!==correct)throw Error('请检查 Hessian 行列式及 fₓₓ 的符号');return correct}
// Upper-right-zero matrix A=[[d,c,0],[c,d,0],[u,a,b]]; c,u nonzero.
function blockRoots(p){let d=q(p.d),c=q(p.c);if(c.zero())throw Error('本结构要求两个不同的块特征值');return [d.sub(c).str(),d.add(c).str()]}
function repeatedBranch(p,b){let [l,h]=blockRoots(p);b=q(b).str();if(![l,h].includes(b))throw Error('b 必须等于两个已求特征值之一');let sign=b===l?'minus':'plus',a=q(p.u).mul(sign==='minus'?1:-1).str();return {p,b,sign,a,other:b===l?h:l}}
function branchMatrix(p,a){a=q(a).str();if(a!==p.a)throw Error('末行必须与前两行的限制相容，重特征空间维数才为2');return [[p.p.d,p.p.c,'0'],[p.p.c,p.p.d,'0'],[p.p.u,a,p.b]]}
function branchVerify(A,P,L){if([A,P,L].some(m=>m.length!==3||m.some(r=>r.length!==3)))throw Error('需要三个三阶矩阵');if(q(M.det(P).v).zero())throw Error('P 不可逆');if(L.some((r,i)=>r.some((v,j)=>i!==j&&!q(v).zero())))throw Error('Λ 不是对角矩阵');if(JSON.stringify(M.mul(A,P))!==JSON.stringify(M.mul(P,L)))throw Error('AP 与 PΛ 不相等');return true}
// xy'−(n+1)y=0, positive integer n; power-series extension of the positive-half-axis solution.
function seriesTerm(n){n=q(n);if(n.d!==1n||n.n<1n)throw Error('n 为正整数');return {degree:n.add(1).str(),coef:q(1).div(n.mul(n.add(1))).str()}}
function seriesFamily(){let n=V('n'),degree=B('+',n,N(1)),coef=B('/',N(1),B('*',n,degree));return {degree,coef,ast:B('*',coef,B('^',V('x'),degree))}}
function seriesDifferentiate(p){let n=V('n'),degree=normalize(B('-',p.degree,N(1))),c=p.coef;if(JSON.stringify(degree)!==JSON.stringify(n)||JSON.stringify(c)!==JSON.stringify(seriesFamily().coef))throw Error('暂仅支持当前 n(n+1) 幂级数系数');return {degree,coef:B('/',N(1),n),ast:B('/',B('^',V('x'),degree),n)}}
function seriesLog(p,method){if(method!=='log'||JSON.stringify(p.ast)!==JSON.stringify(seriesDifferentiate(seriesFamily()).ast))throw Error('请匹配 ∑xⁿ/n 的对数展开');return B('*',N(-1),F('ln',B('-',N(1),V('x'))))}
function seriesPrimitive(p){if(JSON.stringify(p)!==JSON.stringify(seriesLog(seriesDifferentiate(seriesFamily()),'log')))throw Error('当前原函数工具仅支持 −ln(1−x)');return B('+',V('x'),B('*',B('-',N(1),V('x')),F('ln',B('-',N(1),V('x')))))}
function seriesConstant(p,C){let v=M.evalAt(p,{x:'0'});if(v.t!=='n'||!q(v.v).add(C).zero())throw Error('请利用 S(0)=0 求积分常数');return simp(B('+',p,N(C)))}
function seriesDomain(left,right){if(left!=='abs'||right!=='abs')throw Error('两端的绝对值级数都由 1/[n(n+1)] 收敛');return '[-1,1]'}
Object.assign(M,{splitQuadratic22:splitQuadratic,quadBounds22:quadBounds,shiftIntegral22:shiftIntegral,expIntegral22:expIntegral,multiplySame22:multiplySame,absPartial22:absPartial,partialNext22:partialNext,partialAst22:partialAst,partialSub22:partialSub,evalPartial22:evalPartial,absValue22:absValue,hessAt22:hessAt,classifyH22:classifyH,blockRoots22:blockRoots,repeatedBranch22:repeatedBranch,branchMatrix22:branchMatrix,branchVerify22:branchVerify,seriesTerm22:seriesTerm,seriesFamily22:seriesFamily,seriesDifferentiate22:seriesDifferentiate,seriesLog22:seriesLog,seriesPrimitive22:seriesPrimitive,seriesConstant22:seriesConstant,seriesDomain22:seriesDomain});})(typeof module!=='undefined'?require('./core'):window.M);
