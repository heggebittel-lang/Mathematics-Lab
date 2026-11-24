/* Exact probability and geometric-series primitives. */
(function(M){'use strict';const Q=M.Q,q=Q.of;
function prob(v){let x=q(v);if(x.n<0n||x.n>x.d)throw Error('概率不在 [0,1]');return x}
M.unionPair18=(a,b,c)=>{a=prob(a);b=prob(b);c=prob(c);if(c.sub(a).n>0n||c.sub(b).n>0n)throw Error('交集概率超过边缘概率');return prob(a.add(b).sub(c)).str()};
M.conditional18=(a,b)=>{a=prob(a);b=prob(b);if(b.zero()||a.sub(b).n>0n)throw Error('条件事件概率须正，且交集不得超过条件事件概率');return a.div(b).str()};
M.geoResidue18=(p,m,r)=>{p=prob(p);m=Number(m);r=Number(r);if(p.zero()||p.str()==='1'||!Number.isInteger(m)||m<2||m>12||!Number.isInteger(r)||r<0||r>=m)throw Error('要求 0<p<1，模数2–12，余数0至模数−1');let k=r||m,ratio=q(1).sub(p);return {k,first:p.mul(ratio.pow(k-1)).str(),ratio:ratio.pow(m).str(),m,r}};
M.geoSum18=(a,r)=>{a=q(a);r=q(r);if(r.pow(2).sub(1).n>=0n)throw Error('等比级数公比绝对值须小于1');return a.div(q(1).sub(r)).str()};
M.pmfMean18=(x,p)=>{return M.discrete(x,p).e};
})(globalThis.M);
