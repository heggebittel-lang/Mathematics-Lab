(function(M){'use strict';const q=M.Q.of,{N,B,V,F}=M;
function lead46(p,k){if(!Number.isInteger(k)||k<0||k>=p.length)throw Error('指定阶数超出已知展开范围');let a=p.map(q);if(a.slice(0,k).some(c=>!c.zero())||a[k].zero())throw Error('所选幂次不是最低非零项；请检查抵消或提高展开阶数');return a[k].str()}
function ratio46(p,r,i,j){let a=lead46(p,i),b=lead46(r,j);if(i<j)throw Error('分子阶数更低，不能使用有限极限公式');return {i,j,a,b,value:i>j?'0':q(a).div(b).str()}}
function expMix46(a,b){let A=q(a),C=q(b),even=A.add(C),odd=A.sub(C),ast=M.simp(B('+',B('*',N(A),F('exp',V('x'))),B('*',N(C),F('exp',B('*',N(-1),V('x'))))));return {a:A.str(),b:C.str(),even:even.str(),odd:odd.str(),ast}}
function quotient46(f){let x=V('x'),s=F('sin',x),c=F('cos',x),want=B('-',x,B('/',s,c));if(M.str(f)!==M.str(want))throw Error('只支持本题的三角差式');return B('/',B('-',B('*',x,c),s),c)}
Object.assign(M,{lead46,ratio46,expMix46,quotient46});})(typeof module!=='undefined'?require('./core.js'):window.M);
