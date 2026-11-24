/* Reusable exact moment calculations; no question-specific answer table. */
(function(M){'use strict';const q=M.Q.of;
function covariance43(u,v,dx,dy,c){return M.covLinear10(u,v,dx,dy,c)}
function sameVec43(a,b){return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>q(x).sub(b[i]).zero())}
function varianceFor43(cov,u,v,n,m,side){if(!['u','v'].includes(side))throw Error('请选择一个组合');let z=side==='u'?u:v;return {a:z[0],b:z[1],c:M.indepCombination12(z[0],z[1],n,m)}}
function corr43(cov,va,vb){if(!sameVec43(cov.u,va.u)||!sameVec43(va.u,va.v)||!sameVec43(cov.v,vb.u)||!sameVec43(vb.u,vb.v))throw Error('方差的随机变量与协方差不对应');if(cov.c!==va.c||cov.c!==vb.c||cov.dx!==va.dx||cov.dx!==vb.dx||cov.dy!==va.dy||cov.dy!==vb.dy)throw Error('请引用同一协方差模型');return M.corr10(cov.value,va.value,vb.value)}
function poissonCheck43(o,lambda,k){if(!o||o.mode!=='cdf'||q(o.lambda).sub(lambda).n!==0n||o.k!==k)return false;return q(o.coeff).sub(M.poissonTerms10(lambda,k,'cdf').coeff).zero()}
Object.assign(M,{covariance43,sameVec43,varianceFor43,corr43,poissonCheck43});})(typeof module!=='undefined'?require('./core.js'):window.M);
