/* Phase II: local implicit derivatives and monotone exponential transformations. */
(function(M){'use strict';const {N,V,B,F,parse:P,simp:S}=M,Q=M.Q;
const add=(a,b)=>S(B('+',a,b)),mul=(a,b)=>S(B('*',a,b)),sub=(a,b)=>S(B('-',a,b)),div=(a,b)=>S(B('/',a,b)),D=(a,x)=>M.derivative(a,x),eq=(a,b)=>M.eqRat25(a,b);
// Canonicalize polynomial expressions in constant logarithms as exact independent atoms.
function atomize(a){if(a.t==='f'&&a.v==='ln'&&a.a.t==='n'&&a.a.v==='2')return V('L');if(a.t==='f')return F(a.v,atomize(a.a));if(a.t==='b')return B(a.v,atomize(a.a),atomize(a.b));return a}
function clean(a){if(a.t==='f')return S(F(a.v,clean(a.a)));if(a.t!=='b')return a;let x=clean(a.a),y=clean(a.b);if(a.v==='-'&&x.t==='n'&&x.v==='0')return mul(N(-1),y);if(a.v==='-'&&JSON.stringify(x)===JSON.stringify(y))return N(0);return S(B(a.v,x,y))}
function tidy(a){a=clean(a);if(M.vars(a).includes('L'))return a;let b=atomize(a);try{return M.sub(M.normalize(b),'L',F('ln',N(2)))}catch{return a}}
function equal(a,b){try{return eq(atomize(S(a)),atomize(S(b)))}catch{return JSON.stringify(S(a))===JSON.stringify(S(b))}}
function evaluate(a,env){for(let [k,v] of Object.entries(env))a=M.sub(a,k,typeof v==='object'?v:N(v));M.validate(a);return tidy(a)}
function total(a,x,z,order){if(x===z||['p','q'].includes(x)||['p','q'].includes(z)||!['x','y'].includes(x)||!['y','z'].includes(z))throw Error('请选择不同的独立变量与因变量');if(order===1){if(M.vars(a).some(k=>['p','q'].includes(k)))throw Error('一阶输入不能含导数占位符');return clean(add(D(a,x),mul(D(a,z),V('p'))))}if(order===2){if(M.vars(a).includes('q'))throw Error('只支持二阶求导');return clean(add(add(D(a,x),mul(D(a,z),V('p'))),mul(D(a,'p'),V('q'))))}throw Error('仅支持一、二阶')}
function isolate(a,k){if(!/^[a-z]$/.test(k)||!M.vars(a).includes(k))throw Error('该式不含指定未知量');let c=tidy(D(a,k)),b=evaluate(a,{[k]:'0'});if(M.vars(c).length||c.t!=='n'||Q.of(c.v).zero())throw Error('当前要求未知量的系数是非零有理常数');if(!equal(a,add(mul(c,V(k)),b)))throw Error('不是所选未知量的一次方程');return tidy(div(mul(N(-1),b),c))}
function replace(a,from,to){if(JSON.stringify(a)===JSON.stringify(from))return to;if(a.t==='f')return F(a.v,replace(a.a,from,to));if(a.t==='b')return B(a.v,replace(a.a,from,to),replace(a.b,from,to));return a}
function regular(a,u){if(a.t==='f')throw Error('目前支持无奇点的有理式');if(a.t!=='b')return;if(a.v==='/'){let p=M.poly(a.b,u);if(p[0].zero()||!p.every(c=>c.n===0n||(c.n>0n)===(p[0].n>0n)))throw Error('无法确认分母在非负半轴无零点，请保留正分母')}regular(a.a,u);regular(a.b,u)}
function expChange(a,x,u,proposal){let transformed=div(replace(a,F('exp',V(x)),V(u)),V(u)),p=P(proposal);regular(p,u);if(M.vars(transformed).some(k=>k!==u)||M.vars(p).some(k=>k!==u)||!eq(transformed,p))throw Error('换元后必须包含 dx=du/u，且与原表达式恒等');return p}
function primitive(a,u,s){let p=P(s);regular(p,u);if(M.vars(p).some(k=>k!==u)||!eq(D(p,u),a))throw Error('原函数求导与被积函数不一致');return p}
function cdf(p,u){let lo=evaluate(p,{[u]:'0'});return sub(p,lo)}
function tail(a,u){let r=M.detRational08(a,u);if(r.t!=='b'||r.v!=='/')throw Error('目前要求有理分式');let p=M.poly(r.a,u),d=M.poly(r.b,u),i=p.length-1,j=d.length-1,c=p[i].div(d[j]);if(c.n<=0n)throw Error('尾部主项系数必须为正');return {power:i-j,coef:c.str(),diverges:i-j>=-1}}
Object.assign(M,{regular33:regular,total33:total,evaluate33:evaluate,isolate33:isolate,equal33:equal,tidy33:tidy,expChange33:expChange,primitive33:primitive,cdf33:cdf,tail33:tail});})(typeof module!=='undefined'?require('./core'):window.M);
