/* V4.0: last guided-question batch; exact elementary arithmetic, restricted theorem applications. */
(function(M){'use strict';const {Q,N,V,B,F,parse:P,simp:S}=M,q=Q.of,eq=M.eqRat25,D=M.derivative,req=(b,t)=>{if(!b)throw Error(t)},add=(a,b)=>S(B('+',a,b)),sub=(a,b)=>S(B('-',a,b)),mul=(a,b)=>S(B('*',a,b)),div=(a,b)=>S(B('/',a,b)),norm=M.normalize;
// Noncommutative words with inverse cancellation. A,B denote independent invertible blocks.
function word40(s){let parts=s.trim().split(/\s+/),sign=1,w=[];if(parts[0]==='-'){sign=-1;parts.shift()}for(let k of parts){req(['A','B','Ai','Bi'].includes(k),'块乘积用空格分开，逆块写 Ai、Bi');let last=w.at(-1);if(last&&(last+'i'===k||k+'i'===last))w.pop();else w.push(k)}return {sign,w}}
function blockInv40(s){let x=word40(s),left=word40('A '+s.replace(/^-\s*/,''));req(x.sign===-1&&left.w.join(' ')==='Bi','上右块需满足 AX+B⁻¹=0；保持乘法次序');return x}
function blockAdj40(inv,order){let w=order.trim().split(/\s+/);req(inv.sign===-1&&w.join(' ')===inv.w.map(k=>k[0]+'*').join(' '),'伴随替换必须保留块乘积顺序');return w}
function angle40(u){let a=P(u);M.domain34(a,['x','y']);req(eq(a,P('y/x')),'取第一象限内 u=y/x');let dx=D(a,'x'),dy=D(a,'y'),den=add(N(1),B('^',a,N(2)));req(eq(div(dx,den),P('-y/(x^2+y^2)'))&&eq(div(dy,den),P('x/(x^2+y^2)')),'全微分不匹配');return {u:a,dx,dy}}
function angleConst40(a,c){let val=M.evalAt(a.u,{x:'1',y:'1'});req(val.t==='n'&&val.v==='1','初值点比值不匹配');let k=q(c);req(k.zero(),'初值 π/4 对应 arctan(1)=π/4；C=0');return k.str()}
function angleEnd40(c,ratio){req(q(c).zero()&&q(ratio).sub(3).zero(),'目标比值为正且平方为 3');return q(1).div(3).add(c).str()}
function assetEq40(s){let a=P(s);M.sparse(a);req(eq(a,P('f-t^2')),'两边乘 t 后积分应为 f-t²');return a}
function assetD40(a){let d=add(D(a,'t'),mul(D(a,'f'),V('p')));return norm(sub(d,V('f')))}
function assetPart40(d,a,b){let p=P(`${q(a).str()}*t+(${q(b).str()})`),r=norm(sub(sub(D(p,'t'),p),P('2*t')));req(eq(d,P('p-f-2*t'))&&eq(r,N(0)),'代入 f′−f=2t，核验一次与常数项');return p}
function assetInit40(p,c){let k=q(c),p0=M.evalAt19(p,'t',0);req(p0.t==='n'&&k.add(p0.v).zero(),'初值不满足');return add(mul(N(k),F('exp',V('t'))),p)}
function rowCoeff40(rhs,coeff){let c=q(coeff);req(rhs.length===4&&q(rhs[1]).zero()&&q(rhs[2]).zero()&&!q(rhs[0]).zero()&&c.mul(rhs[0]).sub(rhs[3]).zero(),'用方程组有解及各行右端核验系数');return c.str()}
function rowDet40(c,det,perm){let a=perm.trim().split(/[,\s]+/).map(Number);req(a.join(',')==='2,3,1','按目标行列式的行顺序输入非零项行号');let inversions=a.reduce((s,v,i)=>s+a.slice(i+1).filter(z=>z<v).length,0);return q(c).mul(det).mul(inversions%2?-1:1).str()}
function minor40(A,j){j=Number(j);req(Number.isInteger(j)&&j>=1&&j<=3,'选择第1至3列');return {j,ast:M.determinant25(A.filter((_,i)=>i!==1).map(r=>r.filter((_,i)=>i!==j-1)))}}
function minors40(ms){req(ms.length===3&&new Set(ms.map(z=>z.j)).size===3,'必须引用三个不同余子式');return ms.slice().sort((a,b)=>a.j-b.j).map(z=>z.ast)}
function minorRel40(ms,expr){let a=norm(add(sub(ms[1],ms[0]),mul(N(-1),ms[2]))),p=P(expr);M.sparse(p);req(eq(M.sub(a,'b',p),N(0))&&M.vars(p).every(v=>v==='a'),'输入 b 关于 a 的表达式');return {ast:a,b:p}}
function minorExpand40(A,ms){return norm(ms.reduce((s,m,j)=>add(s,mul(P(A[1][j]),mul(N(j%2?1:-1),m))),N(0)))}
function minorRoots40(d,rel,factor){let a=norm(add(M.sub(d,'b',rel.b),N('1/2'))),p=P(factor);M.sparse(p);req(eq(a,p)||eq(a,mul(N(-1),p)),'因式分解与代入后的零式不等价（可差负号）');let r=M.solve(a,'a');return {ast:a,roots:r.roots}}
function fracDen40(ast,s){let p=P(s);M.sparse(p);req(eq(p,ast),'因式分解不等价');return p}
function fracSplit40(den,a,b){a=q(a);b=q(b);let p=add(div(N(a),P('x^2-1')),div(N(b),P('x^2+4')));req(eq(p,div(N(5),den)),'通分后不等于被积函数');return {a:a.str(),b:b.str(),ast:p}}
function fracTerm40(p,side){req(['a','b'].includes(side),'选择拆项');let c=q(p[side]);return {side,coef:c.str(),ast:side==='a'?mul(N(c.div(2)),F('ln',N(3))):mul(N(c.div(8)),V('\\pi'))}}
function fracJoin40(a,b){req(a.side==='a'&&b.side==='b','分别引用两项');return add(a.ast,b.ast)}
// derivative equality for linear polynomials times exp(kx), with independent exponential atoms.
function expAtoms40(a,x){if(a.t==='f'){req(a.v==='exp','仅支持此处指数多项式');let p=M.sparse(a.a),k=p.get(x)||q(0);req([...p].every(([s,c])=>s===x||c.zero())&&['-2','-4','1'].includes(k.str()),'仅支持当前线性指数');return V({'-2':'u','-4':'v','1':'w'}[k.str()])}if(a.t==='b')return B(a.v,expAtoms40(a.a,x),expAtoms40(a.b,x));return a}
function areaD40(h,lo,hi){let a=P(lo),b=P(hi);req(eq(a,V('t'))&&eq(b,P('2*t')),'移动边界与题面不一致');return sub(mul(M.sub(h,'x',b),D(b,'t')),mul(M.sub(h,'x',a),D(a,'t')))}
function areaRoot40(d,expr){let p=P(expr);req(M.vars(p).every(k=>k==='t'),'仅允许变量 t');M.sparse(expAtoms40(p,'t'));req(eq(expAtoms40(d,'t'),expAtoms40(p,'t')),'导数因式与实际导数不等价');return F('ln',N(2))}
function areaPrim40(h,s){let p=P(s);req(M.vars(p).every(k=>k==='x'),'仅允许变量 x 与有理常数');let d=D(p,'x');M.sparse(expAtoms40(p,'x'));req(eq(expAtoms40(d,'x'),expAtoms40(h,'x')),'原函数实际求导不等于题给曲线');return p}
function areaAt40(p,k){let a=M.sub(p,'x',mul(N(k),F('ln',N(2))));function walk(z){if(z.t==='f'&&z.v==='exp'){// exponent = -2 k ln2, verify by treating ln2 as atom
 let b=replaceLog(z.a),coef=M.sparse(b).get('l')||q(0);req(eq(b,mul(N(coef),V('l')))&&coef.d===1n,'仅支持整数倍 ln2 的指数');return N(q(2).pow(Number(coef.n)))}if(z.t==='b')return S(B(z.v,walk(z.a),walk(z.b)));return z}return walk(a)}
function replaceLog(z){if(z.t==='f'&&z.v==='ln'&&z.a.t==='n'&&z.a.v==='2')return V('l');if(z.t==='b')return B(z.v,replaceLog(z.a),replaceLog(z.b));return z}
function areaMax40(p){let a=areaAt40(p,1),b=areaAt40(p,2);return M.sub(norm(sub(replaceLog(b),replaceLog(a))),'l',F('ln',N(2)))}
Object.assign(M,{blockInv40,blockAdj40,angle40,angleConst40,angleEnd40,assetEq40,assetD40,assetPart40,assetInit40,rowCoeff40,rowDet40,minor40,minors40,minorRel40,minorExpand40,minorRoots40,fracDen40,fracSplit40,fracTerm40,fracJoin40,areaD40,areaRoot40,areaPrim40,areaMax40});})(typeof module!=='undefined'?require('./core'):window.M);
