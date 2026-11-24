/* V5.2B: extend the existing replayable workbench, preserving all earlier IDs and history. */
'use strict';
const fB=fm52,pB=pp52,dB=def52, texB=E52, qb=Q52;
for(const n of [9,16])for(const v of ['X','Y']){
 const dist=n===9?(v==='X'?'normal,0,1':'binomial,2,1/2'):(v==='X'?'poisson,1':'poisson,3');
 dB(n,'moment'+v,`选择 ${v} 的原点矩阶数`,[v],[],[fB('order','矩阶数',['1','2'])],(g,d,u)=>M.moment52b(dist,u.order),r=>`E(${v}^{${r.order}})=${qb(r.value)}`);
 dB(n,'features'+v,`由原点矩计算 ${v} 的数字特征`,[],[pB('a','一阶矩','moment'+v),pB('b','二阶矩','moment'+v)],[],(g,d)=>M.features52b(d.a,d.b),r=>`E${v}=${qb(r.mean)},\\quad E(${v}^2)=${qb(r.second)},\\quad D${v}=${qb(r.variance)}`);
}
const XYB=[pB('x','X 的数字特征','featuresX'),pB('y','Y 的数字特征','featuresY')];
dB(9,'uv','选择乘积或和，计算数字特征',['ind'],XYB,[fB('kind','随机变量',['product','sum'])],(g,d,v)=>M.combineMom52b(d.x,d.y,v.kind),r=>`E(${r.kind==='product'?'XY':'X+Y'})=${qb(r.mean)},\\quad D(${r.kind==='product'?'XY':'X+Y'})=${qb(r.variance)}`);
const UVB=[pB('u','乘积数字特征','uv'),pB('v','和的数字特征','uv')];
dB(9,'cov','展开乘积后利用独立性求协方差',['ind'],[...XYB,...UVB],[],(g,d)=>M.covUV52b(d.x,d.y,d.u,d.v),r=>`E[XY(X+Y)]=${qb(r.cross)},\\quad \\operatorname{Cov}(U,V)=${qb(r.value)}`);
dB(9,'rho','引用协方差及方差，计算相关系数',[],[pB('c','协方差','cov'),...UVB],[],(g,d)=>M.rho52b(d.c,d.u,d.v),r=>`\\rho_{U,V}=${qb(r.value)}`,true);
dB(10,'tail','选择等比项、首项系数和公比',['pmf'],[],[fB('base','底数',['2','3']),fB('coef','原概率项 c*b^(−k) 中 c'),fB('ratio','公比')],(g,d,v)=>M.tail52b(v.base,v.coef,v.ratio),r=>`\\sum_{k=j+1}^\\infty c\\cdot ${r.base}^{-k}=${qb(r.factor)}\\cdot ${r.base}^{-j}`);
dB(10,'tailSum','合并两个尾概率项',[],[pB('a','等比项一','tail'),pB('b','等比项二','tail')],[],(g,d)=>M.tailCombine52b(d.a,d.b),r=>`S(j)=${qb(r.a)}2^{-j}+${qb(r.b)}3^{-j}`);
dB(10,'conditional','选择事件关系并构造条件概率',[],[pB('a','尾概率','tailSum')],[fB('mode','事件 X>m+n 与 X>m 的关系',['nested','disjoint','independent'])],(g,d,v)=>M.conditional52b(d.a,v.mode),r=>`P(X>m+n\\mid X>m)=${texB(r.expr)},\\quad a=2^{-m},b=3^{-m},c=2^{-n},d=3^{-n}`);
dB(10,'compare','选择比较方式及两个差的符号',[],[pB('a','条件概率','conditional')],[fB('mode','比较方式',['factor','cross']),fB('m','a−b 的符号',['positive','negative','signZero']),fB('n','c−d 的符号',['positive','negative','signZero'])],(g,d,v)=>M.tailDifference52b(d.a,v.mode,v.m,v.n),r=>`${r.mode==='factor'?'P(X>m+n\\mid X>m)-S(n)':'S(m+n)-S(m)S(n)'}=${texB(r.expr)}>0`,true);
dB(16,'diffMean','令 Z=Y−X，求 EZ',['ind'],XYB,[],(g,d)=>M.poissonDiff52b(d.x,d.y),r=>`EZ=${qb(r.mean)}`);
dB(16,'product','展开 XY=X(X+Z)，选择可用的独立关系',['ind'],[pB('x','X 的数字特征','featuresX'),pB('z','差的期望','diffMean')],[fB('rule','X 与 Z 的关系',['independent','unknown'])],(g,d,v)=>M.poissonProduct52b(d.x,d.z,v.rule),r=>`E(XZ)=${qb(r.cross)},\\quad E(XY)=${qb(r.value)}`,true);
dB(16,'cov','利用 Cov(X,Y−X) 求目标期望',['ind'],XYB,[fB('rule','Cov(X,Y−X)',['zeroCov','unknown'])],(g,d,v)=>M.poissonCov52b(d.x,d.y,v.rule==='zeroCov'?'zero':v.rule),r=>`\\operatorname{Cov}(X,Y)=${qb(r.cov)},\\quad E(XY)=${qb(r.value)}`,true);
dB(17,'integrate','为非积分项选择幂型原函数并代入端点',['fpart','relation'],[],[fB('c','c*(2-x)^k 中的 c'),fB('k','幂次 k')],(g,d,v)=>M.seriesIntegral52b(nExpr52(g.fpart),v.c,v.k),r=>`F(x)=${texB(r.primitive)},\\quad \\int_0^1(2-x)^{-2}dx=${qb(r.value)}`);
dB(17,'constant','对原关系两边积分并求常数',['relation'],[pB('a','非积分项定积分','integrate')],[fB('len','积分区间长度')],(g,d,v)=>M.seriesConstant52b(d.a,v.len),r=>`C=\\int_0^1f(t)dt=${qb(r.value)}`);
dB(17,'geom','自行选几何级数的首项与公比系数',['fpart'],[],[fB('base','分母 b−x 的 b'),fB('scale','首项'),fB('ratio','公比 r*x 中 r')],(g,d,v)=>M.geomSeries52b(v.base,v.scale,v.ratio),r=>`\\frac1{2-x}=\\sum_{n=0}^\\infty ${qb(r.scale)}(${qb(r.ratio)}x)^n`);
dB(17,'deriveSeries','选取逐项运算',[],[pB('a','几何级数','geom')],[fB('mode','运算',['differentiate','integrate'])],(g,d,v)=>M.seriesDerivative52b(d.a,v.mode),r=>`\\frac1{(2-x)^2}=\\sum_{n=0}^\\infty (n+1)${qb(r.scale)}(${qb(r.ratio)})^nx^n`);
dB(17,'finishSeries','扣除积分常数并检查收敛端点',[],[pB('a','逐项运算结果','deriveSeries'),pB('c','积分常数','constant')],[fB('ends','端点收敛情况',['neither','both','left','right'])],(g,d,v)=>M.seriesFinish52b(d.a,d.c,v.ends),r=>`f(x)=\\sum_{n=${r.start}}^\\infty(n+1)${qb(r.scale)}(${qb(r.ratio)})^nx^n,\\quad |x|<${qb(r.radius)}`,true);
dB(18,'substitute','选择 u=xt 后的上限与雅可比幂次',['f'],[],[fB('k','上限 x^k 的 k'),fB('jac','dt=x^j du 中 j')],(g,d,v)=>M.subst1852b(v.k,v.jac),r=>`f(x)=x^{${r.jac}}\\int_0^{x^{${r.k}}}g(u)du,\\quad x\\ne0`);
dB(18,'derive','选择适用求导法则（g 仅连续）',[],[pB('a','换元结果','substitute')],[fB('rule','法则',['product','differentiateG'])],(g,d,v)=>M.derivative1852b(d.a,v.rule),r=>`f'(x)=${r.coef}x^{${r.power}}\\int_0^{x^3}g(u)du+${r.edgeCoef}x^{${r.edgePower}}g(x^3),\\quad x\\ne0`);
dB(18,'bound','利用连续性估计零点差商与导数',[],[pB('a','非零点导数','derive')],[fB('k','积分绝对值上界 M|x|^k 中 k'),fB('rule','g 在零点邻域的性质',['bounded','differentiable'])],(g,d,v)=>M.bound1852b(d.a,v.k,v.rule),r=>`|f(x)/x|\\le M|x|^{${r.quotientPower}},\\quad |f'(x)|\\le4M|x|,\\quad f'(0)=0,\\quad \\lim_{x\\to0}f'(x)=0`,true);
dB(19,'partial','自主选择一阶或二阶偏导',['f'],[],[fB('vars','偏导变量',['x','y','xx','xy','yy'])],(g,d,v)=>M.partial1952b(nExpr52(g.f),v.vars),r=>`f_{${r.vars}}=e^x\\left(${texB(r.expr)}\\right)`);
dB(19,'stationary','选择先消去的变量，求全部驻点',[],[pB('a','x 一阶偏导','partial'),pB('b','y 一阶偏导','partial')],[fB('first','先消去的变量',['x','y'])],(g,d,v)=>M.stationary1952b(d.a,d.b,v.first),r=>`\\{${r.points.map(arr52).join(',')}\\}`);
dB(19,'hessian','选择驻点和二阶偏导，计算 Hessian',[],[pB('a','xx 偏导','partial'),pB('b','xy 偏导','partial'),pB('c','yy 偏导','partial'),pB('st','驻点列表','stationary')],[fB('i','驻点序号',['1','2'])],(g,d,v)=>M.hess1952b(d.a,d.b,d.c,d.st,v.i),r=>`p=${arr52(r.pt)},\\quad H=e^{${qb(r.pt[0])}}${matrix52([[r.A,r.B],[r.B,r.C]])},\\quad \\det H=${qb(r.det)}e^{${qb(Q.of(r.pt[0]).mul(2))}},\\quad \\text{${{max:'极大',min:'极小',saddle:'鞍点',unknown:'未判定'}[r.kind]}}`);
dB(19,'extrema','汇总全部驻点判别及极值',['f'],[pB('st','驻点列表','stationary'),pB('a','驻点判别一','hessian'),pB('b','驻点判别二','hessian')],[],(g,d)=>M.extrema1952b(nExpr52(g.f),d.st,d.a,d.b),r=>r.values.map(v=>`f${arr52(v.pt)}=${qb(v.coef)}e^{${qb(v.pt[0])}}\\quad \\text{${v.kind==='max'?'极大值':'极小值'}}`).join(',\\quad '),true);
dB(20,'inner','选择积分次序及幂型原函数',['f','D'],[],[fB('order','先积分的变量',['x','y']),fB('c','c*(1+x²+y²)^k 的 c'),fB('k','幂次 k')],(g,d,v)=>M.inner2052b(nExpr52(g.f),v.order,v.c,v.k),r=>`F(y)=${qb(r.c)}(1+x^2+y^2)^{${qb(r.k)}}`);
dB(20,'outer','代入内层积分上下限',['D'],[pB('a','内层原函数','inner')],[fB('lo','下限'),fB('hi','上限')],(g,d,v)=>M.outer2052b(d.a,v.lo,v.hi),r=>`I=\\int_0^1\\left[${r.terms.map((t,i)=>`${i?'':' '}${t.coef==='-1'?'-':'+'}\\frac1{\\sqrt{x^2+${t.constant}}}`).join('')}\\right]dx`);
dB(20,'log','选择外层积分项和原函数规则',[],[pB('a','外层积分','outer')],[fB('i','积分项序号',['1','2']),fB('rule','原函数规则',['log','power'])],(g,d,v)=>M.log2052b(d.a,v.i,v.rule),r=>`${qb(r.coef)}\\left[\\ln(x+\\sqrt{x^2+${r.constant}})\\right]_0^1=${qb(r.coef)}\\left[\\ln(${texB(r.hi)})-\\ln(${texB(r.lo)})\\right]`);
dB(20,'combineLogs','合并两项对数定积分',[],[pB('a','积分结果一','log'),pB('b','积分结果二','log')],[],(g,d)=>M.finish2052b(d.a,d.b),r=>`I=\\ln\\left(${texB(r.ratio)}\\right)`,true);
dB(21,'minor','选取两行验证 G 的列独立',['G'],[],[fB('i','第一行号'),fB('j','第二行号')],(g,d,v)=>M.colMinor52b(g.G.value,v.i,v.j),r=>`\\det G_{${r.rows.join(',')}}=${qb(r.det)}`);
dB(21,'column','选择 A 的一列求表示系数，并代回',['A','G'],[pB('a','非零子式','minor')],[fB('j','目标列号',['1','2','3','4'])],(g,d,v)=>M.colSolve52b(g.A.value,g.G.value,d.a,v.j),r=>`\\alpha_${r.col}=G${matrix52(r.value.map(x=>[x]))}`);
dB(21,'buildH','拼接各列表示系数并验证 GH=A',['A','G'],[1,2,3,4].map(i=>pB('c'+i,'列表示记录 '+i,'column')),[],(g,d)=>M.buildH52b(g.A.value,g.G.value,[d.c1,d.c2,d.c3,d.c4]),r=>`H=${matrix52(r.value)}`);
dB(21,'smallPower','选择二阶矩阵的幂次',['G'],[pB('h','秩分解 H','buildH')],[fB('n','HG 的指数')],(g,d,v)=>M.smallPower52b(g.G.value,d.h,v.n),r=>`HG=${matrix52(r.hg)},\\quad (HG)^{${r.n}}=${matrix52(r.value)}`);
dB(21,'nilPower','选择 HG−I 的幂零二项式路线',['G'],[pB('h','秩分解 H','buildH')],[fB('n','HG 的指数')],(g,d,v)=>M.nilPower52b(g.G.value,d.h,v.n),r=>`N=HG-I=${matrix52(r.N)},\\quad N^2=O,\\quad (HG)^{${r.n}}=I+${r.n}N=${matrix52(r.value)}`);
dB(21,'directPower','完成秩分解后，直接计算 A 的幂',['A','G'],[pB('h','秩分解 H','buildH')],[fB('n','A 的指数')],(g,d,v)=>M.directPower52b(g.A.value,g.G.value,d.h,v.n),r=>`A^{10}=${matrix52(r.value)}`,true);
dB(21,'finishPower','用秩分解合并矩阵幂',['A','G'],[pB('h','秩分解 H','buildH'),pB('a','小矩阵幂',['smallPower','nilPower'])],[],(g,d)=>M.finishPower52b(g.A.value,g.G.value,d.h,d.a),r=>`A^{10}=${matrix52(r.value)}`,true);
dB(22,'survival','首次失效：选择事件及指数率',['life'],[],[fB('rule','T>t 对所有元件的要求',['all','any']),fB('rate','生存函数 exp(−rt) 的 r（v 表示 θ）')],(g,d,v)=>M.survival2252b(v.rule,v.rate),r=>T51`P(T>t)=e^{-nt/\theta},\quad t\ge0`);
dB(22,'density','由生存函数得到密度',[],[pB('a','生存函数','survival')],[fB('rule','求导符号',['negativeDerivative','positiveDerivative'])],(g,d,v)=>M.density2252b(d.a,v.rule==='negativeDerivative'?'negative':'positive'),r=>T51`f_T(t)=\frac n\theta e^{-nt/\theta}\ (t>0),\quad 0\ (t\le0)`);
dB(22,'unbiased','利用指数分布数字特征选择无偏系数',[],[pB('a','首次失效密度','density')],[fB('scale','估计量 aT 中 a（用 n）')],(g,d,v)=>M.unbiased2252b(d.a,v.scale),r=>T51`a=n,\quad E(aT)=\theta,\quad D(aT)=\theta^2`,r=>true);
dB(22,'loglike','自主构造对数似然（含截尾贡献）',['L'],[],[fB('c','k ln(θ) 的系数'),fB('mode','总试验时间 S 是否包含未失效元件',['include','omit'])],(g,d,v)=>M.loglike2252b(v.c,v.mode),r=>T51`S=\sum_{i=1}^k t_i+(n-k)t_k,\quad \ell(\theta)=-k\ln\theta-S/\theta`);
dB(22,'score','对参数求导',[],[pB('a','对数似然','loglike')],[],(g,d)=>M.score2252b(d.a),r=>`\\ell'(v)=${texB(r.expr)},\\quad v=\\theta,\\ s=S`);
dB(22,'mle','选择驻点表达式与导数符号变化',[],[pB('a','对数似然导数','score')],[fB('form','驻点（用 s,k）'),fB('sign','在驻点两侧导数符号',['plusminus','minusplus'])],(g,d,v)=>M.mle2252b(d.a,v.form,v.sign),r=>T51`\widehat\theta=\frac{S}{k}=\frac{\sum_{i=1}^k t_i+(n-k)t_k}{k},\quad S>0`,true);
// Q22 has two independent subproblems. Neither alone is a complete endpoint.
dB(22,'complete','汇总无偏估计与最大似然两问',[],[pB('a','第一问估计量','unbiased'),pB('b','第二问似然估计','mle')],[],(g,d)=>({variance:d.a.variance,scale:d.a.scale,mle:d.b.expr}),r=>T51`a=n,\quad D(nT)=\theta^2,\quad \widehat\theta=S/k`,true);
for(let k of ['unbiased','mle'])chain52.get(22).find(d=>d.k===k).final=()=>false;
Object.assign(labels52,{product:'乘积 XY',sum:'和 X+Y',nested:'前者包含于后者',disjoint:'互斥',independent:'独立',factor:'直接通分比较',cross:'乘正分母后比较',positive:'正',negative:'负',signZero:'零',zeroCov:'等于零',unknown:'未知',differentiate:'逐项求导',integrate:'逐项积分',neither:'两端均发散',both:'两端均收敛',left:'仅左端收敛',right:'仅右端收敛',differentiateG:'直接对 g 求导',bounded:'局部有界',differentiable:'可导',log:'对数原函数',power:'幂函数原函数',all:'所有元件均未失效',any:'至少一个未失效',include:'包含未失效元件贡献',omit:'仅失效元件',plusminus:'先正后负',minusplus:'先负后正'});
// Avoid global label collisions: use operation-specific labels for product rule and negative derivative.
// The form renderer resolves label strings through labels52, so choose separate keys.
chain52.get(18).find(d=>d.k==='derive').fields[0].choices=['productRule','differentiateG'];chain52.get(18).find(d=>d.k==='derive').fn=(g,d,v)=>M.derivative1852b(d.a,v.rule==='productRule'?'product':v.rule);labels52.productRule='乘积及变限积分求导';labels52.negativeDerivative='生存函数的负导数';labels52.positiveDerivative='生存函数的正导数';
// Relabel source data buttons now that all definitions are installed.
refresh();
