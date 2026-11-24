/* Exact spectral invariants, signed normal thresholds and matrix witnesses. */
(function(M){'use strict';const {Q,N,B,F,V,parse:P,simp:S}=M,q=Q.of,req=(b,s)=>{if(!b)throw Error(s)},sum=a=>a.reduce((s,v)=>s.add(v),q(0)),prod=a=>a.reduce((s,v)=>s.mul(v),q(1));
function spectrum36(n,groups){req(Number.isInteger(n)&&n>0,'阶数无效');let seen=new Set(),out=[];for(let g of groups){let l=q(g.lambda).str();req(!seen.has(l)&&Number.isInteger(g.dim)&&g.dim>0,'特征值必须不同且维数为正');seen.add(l);for(let i=0;i<g.dim;i++)out.push(l)}req(out.length===n,'不同特征空间的维数之和必须等于矩阵阶数');return out}
function eigDim36(n,rank,lambda){let dim=M.rankNull28(n,rank);req(dim>0,'零空间必须非零');return {lambda:q(lambda).str(),dim,n}}
function invariant36(vals,mode){req(vals.length>0,'需要完整特征值列表');req(['det','trace'].includes(mode),'请选择行列式或迹');return (mode==='det'?prod:sum)(vals).str()}
function adjDet36(n,d){req(Number.isInteger(n)&&n>=2,'阶数须至少为2');return q(d).pow(n-1).str()}
function symbolicMul36(a,b){req(a.length&&b.length&&a[0].length===b.length&&a.every(r=>r.length===a[0].length)&&b.every(r=>r.length===b[0].length),'矩阵尺寸不匹配');return a.map(r=>b[0].map((_,j)=>M.str(M.normalize(r.reduce((s,v,k)=>B('+',s,B('*',P(v),P(b[k][j]))),N(0))))))}
function diagonal36(s){let a=s.split(/[,，\s]+/).filter(Boolean);req(a.length===3&&a.slice().sort().join(',')==='a,b,c','请按选项输入 a,b,c 的排列');return a.map((v,i)=>a.map((_,j)=>i===j?v:'0'))}
function sameMat36(a,b){return a.length===b.length&&a.every((r,i)=>r.length===b[i].length&&r.every((v,j)=>M.eqRat25(P(v),P(b[i][j]))))}
function normal36(g,a,b){return M.normalLinear11([q(a).str(),q(b).str()],g.means,g.vars,'0')}
function threshold36(z,c){let d=q(z.mean).sub(c),v=q(z.variance);req(v.n>0n,'方差必须为正');return {num:d.str(),variance:v.str(),u:z.u,threshold:q(c).str(),sign:d.n<0n?-1:d.n>0n?1:0,square:d.pow(2).div(v).str()}}
function compare36(a,b){return a.sign!==b.sign?Math.sign(a.sign-b.sign):a.sign===0?0:(q(a.square).sub(b.square).n<0n?-1:q(a.square).sub(b.square).n>0n?1:0)*a.sign}
function rankBounds36(m,k,claim){req(Number.isInteger(m)&&Number.isInteger(k)&&k>=1&&m>=k,'子式阶数不合法');req(claim===(m===k?'equal':'lower'),'非零子式仅给出秩的下界；满行秩时才确定');return {m,k,full:m===k}}
function matrixInput36(s){return s.trim().split(/[;；\n]+/).map(r=>r.trim().split(/[,，\s]+/).filter(Boolean).map(x=>q(x).str()))}
function rankWitness36(A,yes,no){req(A.length===2&&A.every(r=>r.length===2)&&yes.length===2&&no.length===2,'当前反例使用二阶矩阵和两个二维右端');req(yes.some(v=>!q(v).zero())&&no.some(v=>!q(v).zero()),'右端必须非零');let r=M.rref(A).rank;req(r===1,'须构造秩为1的矩阵（存在一阶非零子式）');let ry=M.rref(A.map((row,i)=>[...row,yes[i]])).rank,rn=M.rref(A.map((row,i)=>[...row,no[i]])).rank;req(ry===r&&rn>r,'第一个右端须有解，第二个须无解');return {A,yes,no,r,ry,rn}}
Object.assign(M,{spectrum36,eigDim36,invariant36,adjDet36,symbolicMul36,diagonal36,sameMat36,normal36,threshold36,compare36,rankBounds36,matrixInput36,rankWitness36});})(typeof module!=='undefined'?require('./core'):window.M);
