/* Local coordinate transforms and order-statistic arithmetic. */
(function(M){'use strict';const {Q,N,V,B,F,parse:P,simp:S,derivative:D}=M,q=Q.of;
// Sufficient denominator certificate on positive variables, with n>=1 shifted to n=1+w.
function domain34(a,positive=[],atLeastOne=[]){if(a.t==='f')throw Error('这里只接受有理表达式');if(a.t!=='b')return;domain34(a.a,positive,atLeastOne);domain34(a.b,positive,atLeastOne);if(a.v==='/'){let d=a.b;for(let k of atLeastOne)d=M.sub(d,k,P('1+'+k));let terms=[...M.sparse(d).entries()];if(!terms.length||terms.some(([key,c])=>c.n*terms[0][1].n<=0n||[...key].some(k=>!positive.includes(k)&&!atLeastOne.includes(k)))||!terms.some(([key])=>![...key].some(k=>atLeastOne.includes(k))))throw Error('无法保证分母在题给定义域内非零');}}
const eq=(a,b)=>M.eqRat25(a,b), mul=(a,b)=>S(B('*',a,b)),sub=(a,b)=>S(B('-',a,b)),div=(a,b)=>S(B('/',a,b)),add=(a,b)=>S(B('+',a,b));
function rect34(r){let a=q(r.a),b=q(r.b),l=q(r.l),h=q(r.h);if(a.n<=0n||b.sub(a).n<=0n||l.n<=0n||h.sub(l).n<=0n)throw Error('需要第一象限正的有序边界');return {a:a.str(),b:b.str(),l:l.str(),h:h.str()}}
function symmetry34(r,ast,proposal){r=rect34(r);if(!q(r.l).mul(r.h).sub(1).zero())throw Error('互换后比值区间不相同');let swap=M.sub(M.sub(M.sub(ast,'x',V('w')),'y',V('x')),'w',V('y')),avg=div(add(ast,swap),N(2)),p=P(proposal);domain34(p);if(!eq(avg,p)||M.vars(p).length)throw Error('请核验互换平均后的常数被积函数');return p}
function map34(r,u,v,bounds){r=rect34(r);let U=P(u),W=P(v);domain34(U,['x','y']);domain34(W,['x','y']);if(!eq(U,P('x*y'))||!eq(W,P('y/x')))throw Error('本工具适用 u=xy、v=y/x，其他换元尚未实现');for(let k of ['a','b','l','h'])if(!q(bounds[k]).sub(r[k]).zero())throw Error('新积分限与原边界不一致');return {...r,U,W}}
function jac34(m,proposal){let A=[[D(m.U,'x'),D(m.U,'y')],[D(m.W,'x'),D(m.W,'y')]],det=sub(mul(A[0][0],A[1][1]),mul(A[0][1],A[1][0])),p=P(proposal);domain34(p,['v']);if(!eq(det,M.sub(p,'v',m.W))||!eq(p,P('2*v')))throw Error('正向雅可比须等于实际偏导行列式');return {...m,A,det:p}}
function invJac34(j,proposal){let p=P(proposal);domain34(p,['v']);if(!eq(mul(p,j.det),N(1))||!eq(p,P('1/(2*v)')))throw Error('正向雅可比非零且为正，面积因子应取倒数');return p}
function rectInner34(j,integrand,axis){if(axis!=='u')throw Error('当前支持先对 u 积分；被积函数与 u 无关');if(M.vars(integrand).includes('u'))throw Error('不能把含 u 的函数当常数');return mul(N(q(j.b).sub(j.a)),integrand)}
function logOuter34(j,ast,coef){let c=q(coef);if(!eq(ast,div(N(c),V('v'))))throw Error('所填系数与内积分结果不符');let ratio=q(j.h).div(j.l);return q(j.l).mul(j.h).sub(1).zero()?mul(N(c.mul(2)),F('ln',N(j.h))):mul(N(c),F('ln',N(ratio)))}
// U=max(X_i)/theta on [0,1]. Monomial c*u^(n+k), c rational in n.
function maxCDF34(event){if(event!=='all')throw Error('最大值不超过 u 等价于所有样本不超过 u');return {coef:'1',shift:0}}
function powerD34(p){return {coef:M.str(mul(P(p.coef),P('n'+(p.shift===0?'':p.shift>0?'+'+p.shift:String(p.shift))))),shift:p.shift-1}}
function powerMoment34(p,k){k=Number(k);if(!Number.isInteger(k)||k<0||k>12||p.shift< -1)throw Error('支持 0—12 阶矩；积分幂次须大于 -1');let d=p.shift+k+1;return div(P(p.coef),P('n'+(d===0?'':d>0?'+'+d:String(d))))}
function unbiased34(m){return m.t==='b'&&m.v==='/'?div(m.b,m.a):div(N(1),m)}
function mse34(m1,m2){return add(sub(mul(P('c^2'),m2),mul(P('2*c'),m1)),N(1))}
function mseD34(a,proposal){let d=D(a,'c'),p=P(proposal);domain34(p,[],['n']);if(!eq(d,p))throw Error('导数化简不等价');return p}
function mseRoot34(d,proposal){let p=P(proposal);domain34(p,[],['n']);if(M.vars(p).some(k=>k!=='n')||!eq(M.sub(d,'c',p),N(0)))throw Error('输入的系数不满足一阶条件');return p}
function mseMin34(d,m2,root,claim){if(claim!=='min'||!eq(D(d,'c'),mul(N(2),m2))||!eq(M.sub(d,'c',root),N(0)))throw Error('须满足一阶条件，且二阶导为正的二阶矩两倍');return mul(N(2),m2)}
// y=A/[x sqrt(1+x²)] on [L,+∞); positivity permits the reciprocal-root identity.
function areaModel34(p){let a=q(p.A),l=q(p.L);if(a.n<=0n||l.n<=0n)throw Error('要求 A,L>0');return {A:a.str(),L:l.str()}}
function areaChange34(p,lo,hi){p=areaModel34(p);let a=q(lo),b=q(hi);if(!a.zero()||!b.sub(q(1).div(p.L)).zero())throw Error('倒数换元的积分限应为 0 到 1/L');return {...p,lo:a.str(),hi:b.str(),ast:div(N(p.A),F('sqrt',P('1+t^2')))}}
function areaPrim34(p,method){if(method!=='log')throw Error('请选根式倒数的对数型原函数');return mul(N(p.A),F('ln',add(V('t'),F('sqrt',P('1+t^2')))))}
function areaEnd34(p,ast){let f=t=>M.exact19(M.sub(ast,'t',N(t)));return sub(f(p.hi),f(p.lo))}
function disk34(p,axis){p=areaModel34(p);if(axis!=='x')throw Error('题给绕 x 轴，使用竖条圆盘');return {...p,ast:div(N(q(p.A).pow(2)),P('x^2*(1+x^2)'))}}
function diskSplit34(p,a,b){a=q(a);b=q(b);let x=b.n<0n?sub(div(N(a),P('x^2')),div(N(b.neg()),P('1+x^2'))):add(div(N(a),P('x^2')),div(N(b),P('1+x^2')));if(!eq(x,p.ast))throw Error('拆项通分后与原圆盘被积函数不等价');return {...p,a:a.str(),b:b.str(),ast:x}}
function diskTerm34(p,k){let c=q(p[k]);if(k==='a')return N(c.div(p.L));if(k==='b'){if(p.L!=='1')throw Error('当前反正切端点只支持 L=1');return mul(N(c.div(4)),V('\\pi'))}throw Error('请选择两个拆项之一')}
function diskSum34(a,b){return mul(V('\\pi'),add(a,b))}

Object.assign(M,{areaModel34,areaChange34,areaPrim34,areaEnd34,disk34,diskSplit34,diskTerm34,diskSum34,domain34,rect34,symmetry34,map34,jac34,invJac34,rectInner34,logOuter34,maxCDF34,powerD34,powerMoment34,unbiased34,mse34,mseD34,mseRoot34,mseMin34});})(typeof module!=='undefined'?require('./core'):window.M);
