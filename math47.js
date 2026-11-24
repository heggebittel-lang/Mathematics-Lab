/* Restricted exact verification primitives, independent of exam IDs. */
(function(M){'use strict';const {Q,N,V,B,parse,simp}=M,q=Q.of;
function rational(a,b){try{return M.eqRat25(a,b)}catch{return false}}
function primitive(f,u,x){if(!rational(M.derivative(u,x),f))throw Error('原函数求导与被积函数不一致');return u}
function split(k,A,Bb){k=q(k);A=q(A);Bb=q(Bb);if(!A.sub(1).zero()||!A.mul(k).add(Bb).zero())throw Error('通分后分子系数不一致');return {A:A.str(),B:Bb.str()}}
function logDomain(k,lo,a){k=q(k);lo=q(lo);a=q(a);if(k.n<=0n||lo.n<=0n||!a.add(k.mul(lo)).zero())throw Error('请重新判断分母零点在积分区间外的条件');return a.str()}
function expPrimitive(h,u,x){let a=M.odePrimitive11(h,x);if(M.str(simp(u))!==M.str(simp(a))&&M.str(simp(M.derivative(u,x)))!==M.str(simp(h)))throw Error('原函数求导不一致（本入口支持指数项及其有理倍数）');return u}
function difference(g,p,x){let d=M.normalize(B('-',M.sub(p,x,parse(x+'+1')),p));if(!rational(d,g))throw Error('代入差分方程后不成立');return d}
function powerPrimitive(c,A,n){c=q(c);A=q(A);n=q(n);if(!n.sub('3/2').zero()||!A.mul(n).sub(c).zero())throw Error('幂函数原函数求导不一致');return {A:A.str(),n:n.str()}}
Object.assign(M,{primitive47:primitive,split47:split,logDomain47:logDomain,expPrimitive47:expPrimitive,difference47:difference,powerPrimitive47:powerPrimitive});})(typeof module!=='undefined'?require('./core'):window.M);
