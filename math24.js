/* Restricted exact formula operations. Rational coefficients, explicit domains. */
(function(M){'use strict';const {Q,N,V,B,F,parse,simp}=M,q=Q.of,x=V('x'),pi=V('\\pi'),mul=(a,b)=>simp(B('*',a,b)),add=(a,b)=>simp(B('+',a,b)),sub=(a,b)=>simp(B('-',a,b)),div=(a,b)=>simp(B('/',a,b)),exp=a=>F('exp',a),sq=a=>simp(B('^',a,N(2)));
function trig24(p){let a=q(p.a),b=q(p.b),c=q(p.c),d=q(p.d);if(b.n<=0n)throw Error('频率必须为正');return {a:a.str(),b:b.str(),c:c.str(),d:d.str()}}
function trigAst24(p){p=trig24(p);return mul(exp(mul(N(p.a),x)),add(mul(N(p.c),F('cos',mul(N(p.b),x))),mul(N(p.d),F('sin',mul(N(p.b),x)))))}
function trigDerivative24(p){p=trig24(p);return {...p,c:q(p.a).mul(p.c).add(q(p.b).mul(p.d)).str(),d:q(p.a).mul(p.d).sub(q(p.b).mul(p.c)).str()}}
function trigPrimitive24(p){p=trig24(p);let a=q(p.a),b=q(p.b),c=q(p.c),d=q(p.d),den=a.pow(2).add(b.pow(2));return {...p,c:a.mul(c).sub(b.mul(d)).div(den).str(),d:b.mul(c).add(a.mul(d)).div(den).str()}}
function odeRoots24(p){let a=q(p.a),b=q(p.b),r=a.div(-2),s=b.sub(r.pow(2));if(s.n<=0n)throw Error('当前支持共轭复根情形');let z=M.exact19(F('sqrt',N(s)));if(z.t!=='n')throw Error('当前支持有理频率');return {a:r.str(),b:z.v}}
function odeInitial24(p,y,dy){let a=q(p.a),b=q(p.b),c=q(y);return trig24({a:p.a,b:p.b,c:c.str(),d:q(dy).sub(a.mul(c)).div(b).str()})}
// A primitive exp(ax)(c cos bx+d sin bx) at x=kπ, exact integer b*k.
function trigAtPi24(p,k){p=trig24(p);k=q(k);let j=q(p.b).mul(k);if(j.d!==1n)throw Error('当前只支持相位为整数倍 π 的端点');let c=q(p.c).mul(j.n%2n===0n?1:-1),e=q(p.a).mul(k);return mul(N(c),e.zero()?N(1):exp(mul(N(e),pi)))}
function trigTail24(p,k){if(q(p.a).n>=0n)throw Error('指数不衰减，不能直接使用无穷远零边界');return trigAtPi24({...p,c:q(p.c).neg().str(),d:q(p.d).neg().str()},k)}
function geo24(first,ratio){return div(first,sub(N(1),ratio))}
function trigInterval24(p){return add(trigAtPi24(p,1),N(q(p.c).neg()))}
function halfWave24(p){p=trig24(p);if(q(p.a).n>=0n||p.b!=='1'||p.c!=='0'||q(p.d).n<=0n)throw Error('当前支持衰减的正弦半波，且首段非负');let f=trigPrimitive24(p);return trigInterval24(f)}
function expMoment24(rate,k){rate=q(rate);if(rate.n<=0n||!Number.isInteger(k)||k<0||k>12)throw Error('正速率，整数阶 0 至12');let f=q(1);for(let j=1;j<=k;j++)f=f.mul(j);return f.div(rate.pow(k)).str()}
function signedMoment24(k){if(!Number.isInteger(k)||k<0||k>12)throw Error('整数阶 0 至12');return k%2?parse('1-2*p'):N(1)}
function productMoment24(ex,ey){return M.normalize(mul(ex,ey))}
function covariance24(ex,ez,exz){return M.normalize(sub(exz,mul(ex,ez)))}
function weibullSurvival24(t){return exp(mul(N(-1),B('^',div(t,V('h')),V('m'))))}
function weibullConditional24(s,t){return exp(mul(N(-1),sub(B('^',div(add(s,t),V('h')),V('m')),B('^',div(s,V('h')),V('m')))))}
function weibullDensity24(){let t=V('t'),h=V('h'),m=V('m');return mul(div(m,h),mul(B('^',div(t,h),sub(m,N(1))),weibullSurvival24(t)))}
// Set u=theta^m, sufficient statistic S=sum t_i^m; log likelihood up to constant.
function weibullLog24(){return parse('-n*ln(u)-s/u')}
function rat24(a){if(a.t==='n'||a.t==='v')return [a,N(1)];if(a.t!=='b')throw Error('不支持的有理式');if(a.v==='^'){if(a.b.t!=='n'||q(a.b.v).d!==1n||q(a.b.v).n<0n||q(a.b.v).n>8n)throw Error('仅支持非负小整数幂');let [p,d]=rat24(a.a);return [B('^',p,a.b),B('^',d,a.b)]}let [p,d]=rat24(a.a),[r,s]=rat24(a.b);if(a.v==='*')return [mul(p,r),mul(d,s)];if(a.v==='/')return [mul(p,s),mul(d,r)];if(a.v==='+'||a.v==='-')return [B(a.v,mul(p,s),mul(r,d)),mul(d,s)];throw Error('不支持的有理式')}
function equalPoly24(a,b){let z=M.sparse(B('-',a,b));return [...z.values()].every(v=>v.zero())}
function weibullScore24(log=weibullLog24()){let derivative=M.derivative(log,'u'),[p,d]=rat24(derivative),num=parse('s-n*u'),den=parse('u^2');if(!equalPoly24(mul(p,den),mul(d,num)))throw Error('得分公式与实际导数不相符');return {num,den,derivative}}
function weibullRoot24(score){let [p,d]=rat24(score);if(!equalPoly24(mul(p,parse('u^2')),mul(d,parse('s-n*u'))))throw Error('请选择正确的尺度得分函数');return parse('s/n')}
function weibullRestore24(root){let [p,d]=rat24(root);if(!equalPoly24(mul(p,V('n')),mul(d,V('s'))))throw Error('请选择正确的尺度驻点');return B('^',root,parse('1/m'))}
function weibullEstimate24(){return parse('(s/n)^(1/m)')}
// Integrating factor family y'-a*x*y = b*x^(-1/2)*exp(a*x^2/2).
function factor24(p){return exp(mul(N(q(p.a).div(-2)),sq(x)))}
function factorRhs24(p){return div(N(p.b),F('sqrt',x))}
function factorPrimitive24(p){return mul(N(q(p.b).mul(2)),F('sqrt',x))}
function factorInitial24(p){let a=q(p.a),b=q(p.b);if(p.x0!=='1'||!q(p.initialExponent).sub(a.div(2)).zero())throw Error('当前初值支持 x=1, y(1)=exp(a/2)');return q(1).sub(b.mul(2)).str()}
function factorSolution24(p,c){return mul(exp(mul(N(q(p.a).div(2)),sq(x))),add(factorPrimitive24(p),N(c)))}
function diskFactor24(p,c){if(!q(c).zero()||!q(p.b).mul(2).sub(1).zero()||q(p.a).zero())throw Error('当前圆盘积分支持 y=sqrt(x) exp(a*x²/2), a≠0');return mul(x,exp(mul(N(p.a),sq(x))))}
function diskPrimitive24(p){return div(exp(mul(N(p.a),sq(x))),N(q(p.a).mul(2)))}
function diskBounds24(p,f){return mul(pi,sub(M.exact19(M.sub(f,'x',N(p.hi))),M.exact19(M.sub(f,'x',N(p.lo)))))}
Object.assign(M,{trig24,trigAst24,trigDerivative24,trigPrimitive24,odeRoots24,odeInitial24,trigAtPi24,trigTail24,trigInterval24,geo24,halfWave24,expMoment24,signedMoment24,productMoment24,covariance24,weibullSurvival24,weibullConditional24,weibullDensity24,weibullLog24,weibullScore24,weibullRoot24,weibullRestore24,weibullEstimate24,factor24,factorRhs24,factorPrimitive24,factorInitial24,factorSolution24,diskFactor24,diskPrimitive24,diskBounds24});})(typeof module!=='undefined'?require('./core'):window.M);
