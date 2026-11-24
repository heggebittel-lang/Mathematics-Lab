/* V1.3: source-transcribed, structured human reasoning practice. Not a general CAS. */
window.CONTENT13=[];
(function(){const L=String.raw, p25='2025考研数学（三）真题.pdf',p23='2023数学三真题.pdf',p24='2024考研数学（三）真题.docx';
// Each step contains a general formula, an unfilled task, alternatives (or exact input), and an independently reviewed derivation.
const pick=(title,formula,task,choices,correct,result,why)=>({title,formula,task,choices,correct,result,why});
const input=(title,formula,task,target,result,why,mode='exact')=>({title,formula,task,target,result,why,mode});
function add(id,chapter,source,page,body,given,steps,choice,solution){CONTENT13.push({id,chapter,title:id.slice(0,4)+' · 第'+Number(id.slice(5))+'题',source,page,points:5,body,givens:[{key:'given',kind:'raw',title:'题给条件',latex:given}],checks:steps.map(s=>[s.title,null]),hint:'先选择适用公式，再作答；不会时查看相应公式提示。',solution,steps13:steps,choice,route:[],guided13:true})}
add('2025-01','lim',p25,2,L`当 \(x\to0^+\) 时，下列无穷小中，与 x 等价的是（ ）。(A) \(e^{-\sin x}-1\)；(B) \(\sqrt{x+1}-\cos x\)；(C) \(1-\cos\sqrt{2x}\)；(D) \(1-\ln(1+x)/x\)。`,L`x\to0^+`,[
input('A项：复合等价无穷小',L`e^u-1\sim u,\quad\sin x\sim x`,'求 A 项除以 x 的极限。','-1',L`e^{-\sin x}-1\sim -\sin x\sim -x`,'注意指数中的负号。'),
input('B项：展开并合并',L`(1+x)^{1/2}=1+\frac{x}{2}+o(x),\quad\cos x=1+o(x)`,'求 B 项除以 x 的极限。','1/2',L`\sqrt{1+x}-\cos x=\frac x2+o(x)`,'先展开再做减法。'),
input('C项：选择余弦展开',L`1-\cos u=\frac{u^2}{2}+o(u^2)`,'令 u=√(2x)，求 C 项除以 x 的极限。','1',L`1-\cos\sqrt{2x}=x+o(x)`,'保留平方项。'),
input('D项：展开对数至二阶',L`\ln(1+x)=x-\frac{x^2}{2}+o(x^2)`,'求 D 项除以 x 的极限。','1/2',L`1-\frac{\ln(1+x)}x=\frac{x}{2}+o(x)`,'除以 x 以前需要展开到二阶。')],'C','四项与 x 之比的极限依次为 −1、1/2、1、1/2。只有 C 等价。');
add('2025-02','diff',p25,2,L`已知 \(f(x)=\int_0^x e^{t^2}\sin t\,dt,\ g(x)=\int_0^x e^{t^2}\sin t\,dt\cdot\sin^2x\)，则（ ）。(A) 0 是两函数的极值点；(B) 0 是 f 的极值点，(0,0) 是 g 的拐点；(C) 0 是 g 的极值点，(0,0) 是 f 的拐点；(D) (0,0) 是两曲线的拐点。`,L`f(x)=\int_0^x e^{t^2}\sin t\,dt,\qquad g(x)=f(x)\sin^2 x`,[
pick('变上限积分求导',L`\frac{d}{dx}\int_0^x h(t)dt=h(x)`,'选择 f′(x)。',[L`e^{x^2}\cos x`,L`e^{x^2}\sin x`,L`2xe^{x^2}\sin x`],1,L`f'(x)=e^{x^2}\sin x`,'被积函数连续，直接代入上限。'),
pick('根据导数变号判断 f',L`f': -\ \longrightarrow\ +\ \Rightarrow\ \text{极小}`,'0 左右邻域 f′ 的符号如何变化？',[L`+\to-`,L`+\to+`,L`-\to+`],2,L`f(0)=0,\quad f(x)>0\ (0<|x|\ll1)`,'指数因子为正，正弦在零点附近与 x 同号。'),
pick('利用乘积符号判断 g',L`g(x)-g(0)=f(x)\sin^2x`,'0 是否是 g 的极值点？',[L`\text{不是极值点}`,L`\text{严格局部极小点}`,L`\text{严格局部极大点}`],1,L`g(0)=0,\quad g(x)>0\ (0<|x|\ll1)`,'局部非零 x 的两个因子均为正。')],'A','由 f′ 的符号判得 f 在0处严格局部极小；f(0)=0，附近非零 x 有 f(x)>0，故 g=f sin²x 亦严格局部极小。');
add('2025-03','series',p25,2,L`已知 k 为常数，则级数 \(\sum_{n=1}^\infty (-1)^n[1/n-\ln(1+k/n^2)]\)（ ）。(A) 绝对收敛；(B) 条件收敛；(C) 发散；(D) 敛散性与 k 取值有关。`,L`\sum_{n=1}^\infty(-1)^n\left[\frac1n-\ln(1+\frac{k}{n^2})\right]`,[
pick('判断对数项的阶数',L`\ln(1+u)=u+O(u^2)`,'选取 n→∞ 时的展开。',[L`\ln(1+k/n^2)=k/n+O(n^{-2})`,L`\ln(1+k/n^2)=k/n^2+O(n^{-4})`,L`\ln(1+k/n^2)=1+o(1)`],1,L`\ln(1+k/n^2)=\frac{k}{n^2}+O(n^{-4})`,'有限初项须有定义；尾部对数总有定义。'),
pick('拆分级数分别判断',L`\sum (-1)^n/n\ \text{由 Leibniz 判别收敛}`,'对数项的级数属于哪种情形？',[L`\text{绝对收敛}`,L`\text{仅条件收敛}`,L`\text{发散}`],0,L`\sum |\ln(1+k/n^2)|<\infty`,'用与 1/n² 的上界比较；k=0 时恒为零。'),
pick('绝对值比较判别',L`\lim_{n\to\infty}\frac{|a_n|}{1/n}`,'原通项绝对值与 1/n 的比值极限为？',[L`0`,L`1`,L`+\infty`],1,L`\left|\frac1n-\ln(1+k/n^2)\right|\sim\frac1n`,'主项是 1/n，故绝对值级数发散。')],'B','交错调和级数收敛，对数项绝对收敛；绝对值通项等价于1/n，所以条件收敛。题面通常默认为实数级数有定义；若 k≤−1，部分初项对数无实数定义，需说明只讨论有定义的尾级数。');
add('2025-04','double',p25,2,L`设函数 f(x) 连续，则 \(\int_0^1dy\int_0^y f(x)dx=\)（ ）。(A) \(\int_0^1xf(x)dx\)；(B) \(\int_0^1(1+x)f(x)dx\)；(C) \(\int_0^1(x-1)f(x)dx\)；(D) \(\int_0^1(1-x)f(x)dx\)。`,L`\int_0^1dy\int_0^y f(x)\,dx`,[
pick('识别积分区域',L`D=\{(x,y):a\le y\le b,\ \alpha(y)\le x\le\beta(y)\}`,'原积分对应的区域是哪一个？',[L`0\le y\le x\le1`,L`0\le x\le y\le1`,L`0\le x,y\le1`],1,L`D=\{0\le x\le y\le1\}`,'内层 x 从0到 y。'),
pick('交换积分次序',L`\iint_D f(x)dxdy=\int dx\int f(x)dy`,'选择新的积分上下限。',[L`\int_0^1dx\int_0^xdy`,L`\int_0^1dx\int_x^1dy`,L`\int_x^1dx\int_0^1dy`],1,L`\int_0^1 dx\int_x^1 f(x)dy`,'固定 x，y 从 x 到1。'),
input('计算内层积分',L`\int_x^1 f(x)dy=f(x)[y]_x^1`,'填写 f(x) 前的因子（用 x 表示）。','1-x',L`\int_0^1(1-x)f(x)dx`,'f(x) 对 y 是常数。')],'D','原积分区域 0≤x≤y≤1；交换积分次序并对 y 积分，得 ∫₀¹(1−x)f(x)dx。');
add('2025-05','eq',p25,2,L`已知 A 是 m×n 矩阵，β 是 m 维非零列向量。若 A 有 k 阶非零子式，则（ ）。(A) k=m 时 Ax=β 有解；(B) k=m 时无解；(C) k<m 时有解；(D) k<m 时无解。`,L`A\in\mathbb R^{m\times n},\quad\beta\ne0,\quad A\text{ 有 }k\text{ 阶非零子式}`,[
pick('非零子式与秩',L`r(A)=\max\{\text{非零子式的阶数}\}`,'k 阶非零子式说明什么？',[L`r(A)=k`,L`r(A)\le k`,L`k\le r(A)\le m`],2,L`k\le r(A)\le m`,'题目没有说 k 阶是最高阶。'),
pick('满行秩的相容性',L`Ax=\beta\text{ 有解}\iff r(A)=r(A\mid\beta)`,'当 k=m，增广矩阵的秩是什么？',[L`m+1`,L`m`,L`m-1`],1,L`r(A\mid\beta)=r(A)=m`,'增广矩阵仍然只有 m 行。'),
pick('低阶子式不足以确定有无解',L`A=\begin{pmatrix}1&0\\0&0\end{pmatrix}`,'对于这个有一阶非零子式的矩阵，哪种陈述正确？',[L`\beta=(1,0)^T\text{ 有解，}(0,1)^T\text{ 无解}`,L`\text{两个右端都无解}`,L`\text{两个右端都有解}`],0,L`k<m\ \not\Rightarrow\ \text{有解或无解}`,'直接用第二行 0=β₂ 判断。')],'A','k=m 时 A 满行秩，增广不增加秩，所以必有解。k<m 不足以确定相容性。');
add('2025-06','diag',p25,2,L`设 A 为3阶矩阵，则“A³=A² 可对角化”是“A 可对角化”的（ ）。(A) 充分但不必要；(B) 必要但不充分；(C) 充分必要；(D) 既不充分也不必要。`,L`P:\ A^3=A^2\text{ 且该矩阵可对角化};\qquad Q:\ A\text{ 可对角化}`,[
pick('检验充分性：寻找反例',L`P\Rightarrow Q\ \text{要求不存在 }P\land\neg Q`,'选择能使 A²=A³=0 而 A 不可对角化的矩阵。',[L`A=E`,L`A=2E`,L`A=\begin{pmatrix}0&1&0\\0&0&0\\0&0&0\end{pmatrix}`],2,L`A\ne0,\ A^2=A^3=0,\ r(A)=1`,'非零幂零矩阵的所有特征值都是0，不可能相似于零矩阵。'),
pick('检验必要性：寻找反例',L`Q\Rightarrow P\ \text{要求不存在 }Q\land\neg P`,'选择 A 可对角化但 A³≠A² 的矩阵。',[L`A=2E`,L`A=0`,L`A=E`],0,L`(2E)^3=8E\ne4E=(2E)^2`,'对角矩阵本身可对角化。')],'D','非零二阶幂零块嵌入三阶给出充分性的反例；2E 给出必要性的反例。故 D。');
add('2025-11','lim',p25,3,L`设 g(x) 是函数 \(f(x)=\frac12\ln\frac{3+x}{3-x}\) 的反函数，则曲线 y=g(x) 的渐近线方程为 ______。`,L`f(x)=\frac12\ln\frac{3+x}{3-x}`, [
pick('去对数：交换自变量与因变量',L`u=\ln v\iff v=e^u\ (v>0)`,'若 y=g(x)，将 x=f(y) 去对数。',[L`e^x=\frac{3+y}{3-y}`,L`e^{2x}=\frac{3+y}{3-y}`,L`e^{2y}=\frac{3+x}{3-x}`],1,L`e^{2x}(3-y)=3+y`,'注意系数 1/2 和反函数变量互换。'),
pick('移项解出反函数',L`ay+b=cy+d\Rightarrow y=\frac{d-b}{a-c}`,'选择正确的 g(x)。',[L`\frac{3(e^{2x}+1)}{e^{2x}-1}`,L`\frac{3(e^{2x}-1)}{e^{2x}+1}`,L`\frac{e^{2x}-1}{3(e^{2x}+1)}`],1,L`g(x)=3\frac{e^{2x}-1}{e^{2x}+1}`,'把含 y 的项移到同一侧。'),
input('正无穷远处极限',L`\lim_{x\to+\infty}g(x)`,'填写极限（除以 e^{2x}）。','3',L`\lim_{x\to+\infty}3\frac{1-e^{-2x}}{1+e^{-2x}}=3`,'e^{-2x}→0。'),
input('负无穷远处极限',L`\lim_{x\to-\infty}g(x)`,'填写极限。','-3',L`\lim_{x\to-\infty}g(x)=-3`,'e^{2x}→0。'),
input('提交两条渐近线',L`\lim_{x\to\pm\infty}g(x)=c\Rightarrow y=c`,'填写两条直线，如 y=1,y=-1（顺序不限）。','3,-3',L`y=3,\qquad y=-3`,'两条水平渐近线；分母恒正，无垂直渐近线。','lines')],null,'反函数 g(x)=3(e^{2x}−1)/(e^{2x}+1)，定义域为 R，两端极限为±3，水平渐近线 y=±3，无垂直或斜渐近线。');
add('2025-14','multi',p25,3,L`已知函数 \(z=z(x,y)\) 由 \(z+\ln z-\int_y^x xe^{-t^2}dt=1\) 确定，则 \(\left.\frac{\partial^2 z}{\partial x^2}\right|_{(1,1)}=\) ______。`,L`z+\ln z-x\int_y^x e^{-t^2}dt=1`,[
input('先确定 z(1,1)',L`\int_a^a h(t)dt=0`,'代入 x=y=1，解 z+ln z=1（z>0）。','1',L`z(1,1)=1`,'z+ln z 在正半轴严格递增。'),
pick('对积分乘积求偏导',L`\frac{\partial}{\partial x}\left[x\int_y^x h(t)dt\right]=\int_y^x h(t)dt+xh(x)`,'选取隐函数一阶导关系。',[L`(1+1/z)z_x=xe^{-x^2}`,L`(1+1/z)z_x=\int_y^x e^{-t^2}dt+xe^{-x^2}`,L`(1+1/z)z_x=\int_y^x e^{-t^2}dt`],1,L`(1+1/z)z_x=\int_y^x e^{-t^2}dt+xe^{-x^2}`,'x 不仅出现在上限，也是被积函数的乘数。'),
input('代入求一阶偏导',L`(1+1/z)z_x=xe^{-x^2}\quad (x=y=1)`,'填写 z_x(1,1)，用 e 表示。','1/(2*e)',L`2z_x(1,1)=e^{-1}\Rightarrow z_x=\frac1{2e}`,'左侧系数为2。','epower'),
pick('再次隐式求导',L`\partial_x[(1+1/z)z_x]=(1+1/z)z_{xx}-z_x^2/z^2`,'选取右边再次求导后的结果。',[L`(1-2x^2)e^{-x^2}`,L`-2x^2e^{-x^2}`,L`(2-2x^2)e^{-x^2}`],2,L`(1+1/z)z_{xx}-\frac{z_x^2}{z^2}=(2-2x^2)e^{-x^2}`,'右侧两个项各贡献一个 e^{-x²}。'),
input('回代二阶偏导',L`2z_{xx}-\left(\frac1{2e}\right)^2=0`,'填写最终结果（用 e 表示）。','1/(8*e^2)',L`z_{xx}(1,1)=\frac{1}{8e^2}`,'右侧在 x=1 为零，移项后再除以2。','epower')],null,'z(1,1)=1。一次求偏导得 (1+1/z)z_x=∫_y^x e^{-t²}dt+xe^{-x²}，故 z_x=1/(2e)。再次求导得 (1+1/z)z_xx−z_x²/z²=(2−2x²)e^{-x²}；代入得1/(8e²)。');
add('2024-09','joint',p24,2,L`设随机变量 X,Y 相互独立，且 \(X\sim N(0,2),Y\sim N(-1,1)\)。记 \(p_1=P(2X>Y),p_2=P(X-2Y>1)\)，则（ ）。(A) \(p_1>p_2>1/2\)；(B) \(p_2>p_1>1/2\)；(C) \(p_1<p_2<1/2\)；(D) \(p_2<p_1<1/2\)。`,L`X\sim N(0,2),\quad Y\sim N(-1,1),\quad X,Y\text{ 独立}`,[
pick('构造第一个线性组合',L`E(aX+bY)=aEX+bEY,\ D(aX+bY)=a^2DX+b^2DY`,'选择 2X−Y 的分布。',[L`N(-1,9)`,L`N(1,9)`,L`N(1,5)`],1,L`2X-Y\sim N(1,9)`,'独立使协方差项消失。'),
pick('构造第二个线性组合',L`D(aX+bY)=a^2DX+b^2DY`,'选择 X−2Y 的分布。',[L`N(2,6)`,L`N(-2,6)`,L`N(2,4)`],0,L`X-2Y\sim N(2,6)`,'方差系数要平方。'),
pick('标准化后利用对称性',L`P(U>c)=1-\Phi((c-\mu)/\sigma)`,'选择两个概率的表达式。',[L`p_1=\Phi(-1/3),\ p_2=\Phi(-1/\sqrt6)`,L`p_1=\Phi(1/3),\ p_2=\Phi(1/\sqrt6)`,L`p_1=\Phi(1/9),\ p_2=\Phi(1/6)`],1,L`p_1=\Phi(1/3),\quad p_2=\Phi(1/\sqrt6)`,'标准化除以标准差，不是方差。'),
pick('比较标准正态分布函数',L`\Phi\text{ 严格递增},\quad\Phi(0)=1/2`,'比较两个正数的大小。',[L`1/\sqrt6>1/3>0`,L`1/3>1/\sqrt6>0`,L`1/\sqrt6=1/3`],0,L`p_2>p_1>1/2`,'√6<3，不需要计算正态积分。')],'B','2X−Y~N(1,9)，X−2Y~N(2,6)，故 p₁=Φ(1/3)，p₂=Φ(1/√6)，选 B。');
add('2024-11','lim',p24,2,L`当 \(x\to0\) 时，\(\int_0^x\frac{(1+t^2)\sin t^2}{1+\cos t^2}dt\) 与 \(x^k\) 是同阶无穷小，则 k=______。`,L`\int_0^x\frac{(1+t^2)\sin t^2}{1+\cos t^2}dt`,[
pick('求被积函数主项',L`\sin u\sim u,\quad\cos u\to1`,'选择 t→0 时的等价无穷小。',[L`t^2`,L`t^2/2`,L`t^4/2`],1,L`\frac{(1+t^2)\sin t^2}{1+\cos t^2}\sim\frac{t^2}{2}`,'分母趋于2。'),
pick('变限积分的渐近主项',L`h(t)=ct^m+o(t^m)\Rightarrow\int_0^x h(t)dt=\frac{c}{m+1}x^{m+1}+o(x^{m+1})`,'选择积分的主项。',[L`x^2/2`,L`x^3/6`,L`x^3/2`],1,L`\int_0^x h(t)dt=\frac{x^3}{6}+o(x^3)`,'可由积分余项估计或洛必达证明。'),
input('提交同阶次数',L`x^m/x^k\to c\ne0\Rightarrow k=m`,'填写 k。','3',L`k=3`,'同阶不要求系数为1。')],null,'被积函数等价于 t²/2，积分等价于 x³/6，k=3。');
add('2023-01','multi',p23,2,L`已知函数 \(f(x,y)=\ln(y+|x\sin y|)\)，则（ ）。(A) \(f_x(0,1)\) 不存在，\(f_y(0,1)\) 存在；(B) 前者存在、后者不存在；(C) 均存在；(D) 均不存在。`,L`f(x,y)=\ln(y+|x\sin y|)`,[
pick('固定 y，写 x 偏导差商',L`f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}h`,'选择正确差商。',[L`\ln(1+h\sin1)/h`,L`\ln(1+|h\sin1|)/h`,L`\ln(1+h)/h`],1,L`\frac{\ln(1+|h\sin1|)}h`,'绝对值不能删掉。'),
pick('比较左右极限',L`\ln(1+u)\sim u`,'两个单侧极限（左，右）分别为？',[L`(\sin1,\sin1)`,L`(-\sin1,\sin1)`,L`(0,0)`],1,L`f_x(0,1)\text{ 不存在}`,'sin1>0，|h|/h 左右异号。'),
input('固定 x=0，求 y 偏导',L`f(0,y)=\ln y`,'填写 f_y(0,1)。','1',L`f_y(0,1)=\left.\frac1y\right|_{y=1}=1`,'先固定 x，再求导。')],'A','x 偏导差商的左右极限相反；y 偏导等于 ln y 在1的导数1，选 A。');
add('2023-04','series',p23,2,L`已知 \(a_n<b_n\ (n=1,2,\ldots)\)。若级数 \(\sum a_n\) 与 \(\sum b_n\) 均收敛，则“\(\sum a_n\) 绝对收敛”是“\(\sum b_n\) 绝对收敛”的（ ）。(A) 充分必要条件；(B) 充分不必要；(C) 必要不充分；(D) 既不充分也不必要。`,L`a_n<b_n,\quad\sum a_n,\sum b_n\text{ 均收敛}`,[
pick('构造非负差项',L`\sum(b_n-a_n)=\sum b_n-\sum a_n`,'关于差项级数可知什么？',[L`\text{必发散}`,L`\text{非负且收敛，所以绝对收敛}`,L`\text{可能只条件收敛}`],1,L`\sum |b_n-a_n|=\sum(b_n-a_n)<\infty`,'每项为正，两个原级数均收敛。'),
pick('充分性：三角不等式',L`|b_n|=|a_n+(b_n-a_n)|`,'选择有效的上界。',[L`|b_n|\le |a_n|+|b_n-a_n|`,L`|b_n|\le |a_n|`,L`|b_n|\le b_n-a_n`],0,L`\sum|a_n|<\infty\Rightarrow\sum|b_n|<\infty`,'两项右端级数均收敛。'),
pick('必要性：反向三角不等式',L`|a_n|=|b_n-(b_n-a_n)|`,'选择有效的上界。',[L`|a_n|\le|b_n|`,L`|a_n|\le|b_n|+|b_n-a_n|`,L`|a_n|\le b_n`],1,L`\sum|b_n|<\infty\Rightarrow\sum|a_n|<\infty`,'同一个非负差项级数在两个方向都可用。')],'A','差项 b_n−a_n>0 且级数收敛，所以绝对收敛。由三角不等式，两个原级数的绝对收敛性等价。');
})();
