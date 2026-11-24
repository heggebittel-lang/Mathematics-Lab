/* V1.4: human-written derivations from original scans. Guided tasks deliberately separate from executable objects. */
(function(){const L=String.raw,p23='2023数学三真题.pdf',p24='2024考研数学（三）真题.docx';
const pick=(title,formula,task,choices,correct,result,why)=>({title,formula,task,choices,correct,result,why});
const input=(title,formula,task,target,result,why,mode='exact')=>({title,formula,task,target,result,why,mode});
function add(id,chapter,source,page,points,body,given,steps,solution){CONTENT13.push({id,chapter,title:id.slice(0,4)+' · 第'+Number(id.slice(5))+'题',source,page,points,body,givens:[{key:'given',kind:'raw',title:'题给条件',latex:given}],checks:steps.map(s=>[s.title,null]),hint:'先按纸笔思路选公式、写中间结果。',solution,steps13:steps,route:[],guided13:true,new14:true})}
// Correct original transcription: the source is A^3-A^2, not the equation A^3=A^2.
const old=CONTENT13.find(q=>q.id==='2025-06');old.body=L`【题面校勘】上传 PDF 此处印为等号；公开同年题面普遍为减号。本题按校勘版本训练。设 A 为3阶矩阵，则“\(A^3-A^2\) 可对角化”是“A 可对角化”的（ ）。(A) 充分但不必要；(B) 必要但不充分；(C) 充分必要；(D) 既不充分也不必要。`;old.givens[0].latex=L`P:\ A^3-A^2\text{ 可对角化};\quad Q:\ A\text{ 可对角化}`;old.steps13=[pick('检验充分性',L`A^2=0\Rightarrow A^3-A^2=0`,'选择反例：多项式矩阵可对角化，但 A 不可对角化。',[L`A=E`,L`A=2E`,L`A=\begin{pmatrix}0&1&0\\0&0&0\\0&0&0\end{pmatrix}`],2,L`A^2=A^3=0,\quad A\ne0`,'非零幂零矩阵不可对角化。'),pick('检验必要性',L`A=P\Lambda P^{-1}\Rightarrow A^k=P\Lambda^kP^{-1}`,'若 A 可对角化，选择 A³−A² 的表达式。',[L`P(\Lambda^3-\Lambda^2)P^{-1}`,L`P(\Lambda^3+\Lambda^2)P^{-1}`,L`\Lambda^3-A^2`],0,L`A^3-A^2=P(\Lambda^3-\Lambda^2)P^{-1}`,'对角矩阵之差仍为对角矩阵。')];old.checks=old.steps13.map(s=>[s.title,null]);old.choice='B';old.solution='A可对角化推出A³−A²可对角化；反之取非零平方为零的矩阵即可反驳。必要不充分，选B。';old.hint='分别判断两个方向；对角化对矩阵多项式封闭。上传 PDF 等号版本与公开减号版本不同，见 SOURCES-V14.md。';
add('2023-17','multi',p23,4,10,L`已知可导函数 \(y=y(x)\) 满足 \(ae^x+y^2+y-\ln(1+x)\cos y+b=0\)，且 \(y(0)=0,y'(0)=0\)。（I）求 a,b；（II）判断 x=0 是否为 y(x) 的极值点。`,L`ae^x+y^2+y-\ln(1+x)\cos y+b=0`,[
pick('代入初始条件',L`y(0)=0`,'代入原式，选取参数关系。',[L`a+b=0`,L`a-b=0`,L`a+b=1`],0,L`a+b=0`,'ln1=0。'),
pick('对隐式方程求一阶导',L`(uv)'=u'v+uv'`,'选择求导后的等式。',[L`ae^x+(2y+1)y'-\cos y/(1+x)+\ln(1+x)\sin y\,y'=0`,L`ae^x+(2y+1)y'-\cos y/(1+x)=0`,L`ae^x+2yy'+\sin y=0`],0,L`ae^x+(2y+1)y'-\frac{\cos y}{1+x}+\ln(1+x)\sin y\,y'=0`,'对 ln 与 cos 的乘积用乘积法则。'),
input('代入 x=0, y=y′=0 求 a',L`a-1=0`,'填写 a。','1',L`a=1`,'只剩指数项和对数导数项。'),input('回代求 b',L`a+b=0`,'填写 b。','-1',L`b=-1`,'使用第一步的关系。'),
pick('再次求导并在零点化简',L`F_y y''+F_{xx}+2F_{xy}y'+F_{yy}(y')^2=0`,'已知 y′(0)=0，选择零点的关系。',[L`y''(0)+2=0`,L`y''(0)-2=0`,L`y''(0)=0`],0,L`y''(0)+2=0`,'F_y(0,0)=1，F_xx(0,0)=2。'),input('求二阶导数','y\'\'(0)+2=0','填写 y″(0)。','-2',L`y''(0)=-2`,'移项即可。'),pick('二阶判别',L`y'(0)=0,\ y''(0)<0`,'判断性质。',[L`\text{严格局部极大点}`,L`\text{严格局部极小点}`,L`\text{不是极值点}`],0,L`x=0\text{ 为严格局部极大点}`,'二阶导小于零。')],'a=1,b=−1。隐式求导两次并代入零点，得 y″(0)=−2，故严格局部极大。');
add('2023-18','int',p23,4,12,L`已知平面区域 \(D=\{(x,y)\mid0\le y\le 1/(x\sqrt{1+x^2}),\ x\ge1\}\)。（I）求 D 的面积；（II）求 D 绕 x 轴旋转所得旋转体的体积。`,L`0\le y\le\frac1{x\sqrt{1+x^2}},\ x\ge1`,[
pick('第一问：建立面积积分',L`S=\int_a^b (y_\text{上}-y_\text{下})dx`,'选择积分。',[L`\int_1^\infty\frac{dx}{x\sqrt{1+x^2}}`,L`\int_0^1\frac{dx}{x\sqrt{1+x^2}}`,L`\pi\int_1^\infty\frac{dx}{x^2(1+x^2)}`],0,L`S=\int_1^\infty\frac{dx}{x\sqrt{1+x^2}}`,'面积不平方、不乘 π。'),
pick('倒数换元',L`t=1/x,\ dx=-dt/t^2`,'转换上下限并化简。',[L`\int_0^1\frac{dt}{\sqrt{1+t^2}}`,L`\int_1^0\frac{dt}{\sqrt{1+t^2}}`,L`\int_0^1\frac{t\,dt}{\sqrt{1+t^2}}`],0,L`S=\int_0^1\frac{dt}{\sqrt{1+t^2}}`,'x→∞ 时 t→0，负号交换积分限。'),
pick('导入对数型原函数',L`\int\frac{dt}{\sqrt{1+t^2}}=\ln(t+\sqrt{1+t^2})+C`,'选择面积。',[L`\ln(1+\sqrt2)`,L`\ln2`,L`\sqrt2-1`],0,L`S=[\ln(t+\sqrt{1+t^2})]_0^1=\ln(1+\sqrt2)`,'下限项 ln1=0。'),
pick('第二问：圆盘法',L`V=\pi\int_a^b y^2dx`,'建立旋转体体积。',[L`\pi\int_1^\infty\frac{dx}{x^2(1+x^2)}`,L`2\pi\int_1^\infty\frac{dx}{\sqrt{1+x^2}}`,L`\int_1^\infty\frac{dx}{x^2(1+x^2)}`],0,L`V=\pi\int_1^\infty\frac{dx}{x^2(1+x^2)}`,'截面半径为题给 y。'),
pick('部分分式：直接拆项',L`\frac1{x^2(1+x^2)}=\frac{A}{x^2}+\frac{B}{1+x^2}`,'选择分解。',[L`1/x^2+1/(1+x^2)`,L`1/x^2-1/(1+x^2)`,L`1/x-1/(1+x^2)`],1,L`V=\pi\int_1^\infty\left(\frac1{x^2}-\frac1{1+x^2}\right)dx`,'通分检查分子为1。'),
pick('求原函数并取反常积分极限',L`\int x^{-2}dx=-1/x,\quad\int(1+x^2)^{-1}dx=\arctan x`,'选择体积。',[L`\pi(1-\pi/4)`,L`\pi(1+\pi/4)`,L`\pi^2/4`],0,L`V=\pi[-1/x-\arctan x]_1^\infty=\pi-\frac{\pi^2}4`,'上限反正切为 π/2，下限为 π/4。')],'面积 ln(1+√2)，体积 π−π²/4。两问均用反常积分，面积换元、体积拆项。');
add('2023-19','double',p23,4,12,L`已知平面区域 \(D=\{(x,y)\mid(x-1)^2+y^2\le1\}\)，计算 \(\iint_D|\sqrt{x^2+y^2}-1|dxdy\)。`,L`(x-1)^2+y^2\le1`,[
pick('极坐标转换',L`x=r\cos\theta,y=r\sin\theta,dxdy=rdrd\theta`,'选择区域。',[L`-\pi/2\le\theta\le\pi/2,\ 0\le r\le2\cos\theta`,L`0\le\theta\le2\pi,\ 0\le r\le1`,L`0\le\theta\le\pi,\ 0\le r\le2\sin\theta`],0,L`D:\ -\pi/2\le\theta\le\pi/2,\ 0\le r\le2\cos\theta`,'圆的方程化为 r²≤2r cosθ。'),
pick('识别对称性与绝对值分界',L`|r-1|=\begin{cases}1-r&r\le1\\r-1&r>1\end{cases}`,'利用上下对称，哪一个角度分隔径向上限是否超过1？',[L`\pi/6`,L`\pi/4`,L`\pi/3`],2,L`2\cos\theta=1\Rightarrow\theta=\pi/3`,'先只取上半区域，最后乘2。'),
pick('写出完整分区积分',L`I=\iint_D |r-1|r\,drd\theta`,'选择正确的径向分段。',[L`2\int_0^{\pi/3}\!\left[\int_0^1(1-r)rdr+\int_1^{2\cos\theta}(r-1)rdr\right]d\theta+2\int_{\pi/3}^{\pi/2}\int_0^{2\cos\theta}(1-r)rdrd\theta`,L`2\int_0^{\pi/2}\int_0^{2\cos\theta}(r-1)rdrd\theta`],0,L`I=2\int_0^{\pi/3}(R^3/3-R^2/2+1/3)d\theta+2\int_{\pi/3}^{\pi/2}(R^2/2-R^3/3)d\theta,\ R=2\cos\theta`,'必须分段处理绝对值。'),
pick('角向积分：选择原函数',L`\int\cos^2\theta\,d\theta=\theta/2+\sin2\theta/4`,'cos³θ 的原函数为？',[L`\sin\theta-\sin^3\theta/3`,L`\sin^3\theta/3`,L`\theta/2+\sin2\theta/4`],0,L`\int\cos^3\theta d\theta=\sin\theta-\frac{\sin^3\theta}3`,'拆成 cosθ(1−sin²θ) 换元。'),
pick('分别代入角度上下限',L`\int_a^b H(\theta)d\theta=[G(\theta)]_a^b`,'第一、第二段尚未乘2的积分分别是多少？',[L`\frac{3\sqrt3}4-\frac{2\pi}9,\quad\frac\pi6-\frac{16}9+\frac{3\sqrt3}4`,L`\frac{3\sqrt3}4+\frac{2\pi}9,\quad\frac\pi6-\frac{16}9+\frac{3\sqrt3}4`],0,L`I_1=\frac{3\sqrt3}4-\frac{2\pi}9,\quad I_2=\frac\pi6-\frac{16}9+\frac{3\sqrt3}4`,'检查 sin2θ 在 π/3 的值为 √3/2。'),
input('合并并乘对称系数',L`I=2(I_1+I_2)`,'填写最终值（pi 表示 π，sqrt(3) 表示 √3）。','3*sqrt(3)-pi/9-32/9',L`I=3\sqrt3-\frac\pi9-\frac{32}9`,'分别合并根式、π 和有理数。','symbol14')],'极坐标区域 R=2cosθ，上半圆按 θ=π/3 分割；两段分别为 3√3/4−2π/9、π/6−16/9+3√3/4，乘2得 3√3−π/9−32/9。');
add('2023-22','joint',p23,4,12,L`设随机变量 X 的概率密度为 \(f(x)=e^x/(1+e^x)^2\)，\(-\infty<x<+\infty\)，令 \(Y=e^X\)。（I）求 X 的分布函数；（II）求 Y 的概率密度；（III）Y 的期望是否存在？`,L`f_X(x)=\frac{e^x}{(1+e^x)^2},\quad Y=e^X`,[
pick('第一问：建立分布函数积分',L`F_X(x)=\int_{-\infty}^x f_X(t)dt`,'选择自然换元。',[L`u=1+e^t`,L`u=t^2`,L`u=1+t`],0,L`F_X(x)=\int_1^{1+e^x}u^{-2}du`,'du=e^t dt；下限为1。'),
pick('求原函数与分布函数',L`\int u^{-2}du=-1/u+C`,'选择 F_X。',[L`\frac1{1+e^x}`,L`\frac{e^x}{1+e^x}`,L`\frac{e^x}{(1+e^x)^2}`],1,L`F_X(x)=1-\frac1{1+e^x}=\frac{e^x}{1+e^x}`,'分布函数必须递增。'),
pick('第二问：先判断 Y 的取值范围',L`Y=e^X>0`,'对 y>0，写出 F_Y(y)。',[L`F_X(e^y)`,L`F_X(\ln y)`,L`1-F_X(\ln y)`],1,L`F_Y(y)=\begin{cases}0,&y\le0\\y/(1+y),&y>0\end{cases}`,'指数函数递增，事件 Y≤y 等价于 X≤ln y。'),
pick('求导得到密度',L`f_Y(y)=F_Y'(y)`,'选择 y>0 的密度。',[L`1/(1+y)^2`,L`y/(1+y)^2`,L`1/(1+y)`],0,L`f_Y(y)=\begin{cases}0,&y\le0\\1/(1+y)^2,&y>0\end{cases}`,'对商求导。'),
pick('第三问：建立期望积分并比较',L`EY=\int_0^\infty y f_Y(y)dy`,'与哪个函数等价（y→∞）？',[L`1/y^2`,L`1/y`,L`1/y^3`],1,L`\frac{y}{(1+y)^2}\sim\frac1y`,'对数型反常积分发散。'),
pick('判断期望存在性',L`\int_1^\infty dy/y=+\infty`,'选择结论。',[L`EY=1`,L`EY=0`,L`EY=+\infty\text{，有限期望不存在}`],2,L`EY=+\infty`,'Y>0，不涉及正负部分抵消。')],'F_X=e^x/(1+e^x)，F_Y 在 y>0 为 y/(1+y)，否则0；密度在 y>0 为 1/(1+y)^2，否则0；期望积分的尾部等价于1/y，故无有限期望。');
add('2024-17','double',p24,3,10,L`设平面有界区域 D 位于第一象限，由曲线 \(xy=1/3,xy=3\) 与直线 \(y=x/3,y=3x\) 围成，计算 \(\iint_D(1+x-y)dxdy\)。`,L`1/3\le xy\le3,\quad1/3\le y/x\le3`,[
pick('识别交换 x、y 的对称性',L`\iint_D(x-y)dxdy=-\iint_D(x-y)dxdy`,'利用对称性，原积分化为什么？',[L`\iint_D1dxdy`,L`2\iint_Dxdxdy`,L`0`],0,L`I=\iint_Ddxdy`,'区域交换 x、y 后不变，奇对称项抵消。'),
pick('选择贴合边界的换元',L`u=xy,\ v=y/x`,'选择换元后区域。',[L`1/3\le u,v\le3`,L`0\le u,v\le3`,L`1\le u,v\le3`],0,L`1/3\le u\le3,\quad1/3\le v\le3`,'第一象限保证换元一一对应。'),
pick('求雅可比',L`\frac{\partial(u,v)}{\partial(x,y)}=\begin{vmatrix}y&x\\-y/x^2&1/x\end{vmatrix}`,'选择 dxdy 的转换系数。',[L`2v`,L`1/(2v)`,L`1/u`],1,L`\frac{\partial(u,v)}{\partial(x,y)}=2v,\quad dxdy=\frac{du\,dv}{2v}`,'取正雅可比的倒数。'),
input('先对 u 积分',L`\int_{1/3}^3 du=3-1/3`,'填写积分区间长度。','8/3',L`I=\frac43\int_{1/3}^3\frac{dv}{v}`,'外面还有1/2。'),
input('对数积分与化简',L`\int_a^b dv/v=\ln b-\ln a`,'填写最后结果（使用 ln(3)）。','8*ln(3)/3',L`I=\frac83\ln3`,'ln3−ln(1/3)=2ln3。','symbol14')],'对称性消去 x−y。令 u=xy,v=y/x，雅可比 2v，积分为 (8/3)∫(1/(2v))dv=8ln3/3。');
add('2024-18','multi',p24,4,12,L`设函数 \(z=z(x,y)\) 由方程 \(z+e^x-y\ln(1+z^2)=0\) 确定，求 \(\left.(z_{xx}+z_{yy})\right|_{(0,0)}\)。`,L`z+e^x-y\ln(1+z^2)=0`,[
input('代入零点','z+1=0','填写 z(0,0)。','-1',L`z(0,0)=-1`,'y=0 时对数项消失。'),
pick('对 x 求偏导',L`\partial_x\ln(1+z^2)=2zz_x/(1+z^2)`,'选择一阶关系。',[L`(1-2yz/(1+z^2))z_x=-e^x`,L`(1-2yz/(1+z^2))z_x=e^x`],0,L`(1-2yz/(1+z^2))z_x=-e^x`,'对 x 求导时 y 为常数。'),
input('再求 x 偏导并代入',L`y=0\Rightarrow z(x,0)=-e^x`,'填写 z_xx(0,0)。','-1',L`z_{xx}(0,0)=-1`,'在 y=0 这条切片上直接求导两次。'),
pick('对 y 求偏导',L`\partial_y[y\ln(1+z^2)]=\ln(1+z^2)+2yzz_y/(1+z^2)`,'选择 z_y 的关系。',[L`(1-2yz/(1+z^2))z_y=\ln(1+z^2)`,L`z_y=2yz/(1+z^2)`],0,L`(1-2yz/(1+z^2))z_y=\ln(1+z^2)`,'不能漏掉 y 的导数。'),
input('代入零点求 z_y',L`(1-2yz/(1+z^2))z_y=\ln(1+z^2)`,'填写 z_y(0,0)。','ln(2)',L`z_y(0,0)=\ln2`,'z=-1。','symbol14'),
pick('第二次 y 偏导',L`z_{yy}=2L'(z)z_y+y[L''(z)z_y^2+L'(z)z_{yy}],\quad L(z)=\ln(1+z^2)`,'代入 y=0,z=-1 后选择结果。',[L`-2\ln2`,L`2\ln2`,L`-\ln2`],0,L`z_{yy}(0,0)=-2\ln2`,'L′(-1)=-1，注意系数2。'),
input('合并两个二阶偏导','z_{xx}+z_{yy}','填写最终值。','-1-2*ln(2)',L`-1-2\ln2`,'直接合并。','symbol14')],'z(0,0)=−1；在 y=0 切片 z=−e^x，z_xx=−1。对 y 求导两次，在原点 z_y=ln2,z_yy=−2ln2，最终 −1−2ln2。');
add('2024-19','int',p24,4,12,L`设 \(t>0\)（上传图漏写该条件，经公开同年题面核对补入），平面有界区域 D 由曲线 \(y=xe^{-2x}\) 与直线 \(x=t,x=2t\) 及 x 轴围成，D 的面积为 S(t)，求 S(t) 的最大值。`,L`t>0,\quad y=xe^{-2x},\quad t\le x\le2t`,[
pick('建立面积函数',L`S(t)=\int_{a(t)}^{b(t)}f(x)dx`,'选择 S(t)。',[L`\int_t^{2t}xe^{-2x}dx`,L`\int_0^{2t}xe^{-2x}dx`,L`\int_t^{2t}e^{-2x}dx`],0,L`S(t)=\int_t^{2t}xe^{-2x}dx`,'t>0 时曲线在 x 轴上方。'),
pick('变限积分求导',L`\frac d{dt}\int_{a(t)}^{b(t)}f(x)dx=f(b(t))b'(t)-f(a(t))a'(t)`,'选择 S′(t)。',[L`4te^{-4t}-te^{-2t}`,L`2te^{-4t}-te^{-2t}`,L`4te^{-2t}-te^{-4t}`],0,L`S'(t)=te^{-4t}(4-e^{2t})`,'上限 2t 的导数为2。'),
input('求内部驻点',L`t>0,\quad e^{-4t}>0`,'解 4−e^{2t}=0，填写 t。','ln(2)',L`t=\ln2`,'取自然对数后除以2。','symbol14'),
pick('判断全局最大值',L`e^{2t}\text{ 严格递增}`,'S′ 的符号在 ln2 左右如何变化？',[L`+\to-`,L`-\to+`,L`+\to+`],0,L`S(t)\text{ 在 }t=\ln2\text{ 取得最大值}`,'定义域为正半轴，先增后减。'),
pick('分部积分求原函数',L`\int u\,dv=uv-\int v\,du`,'选择 ∫xe^{-2x}dx 的原函数。',[L`-(2x+1)e^{-2x}/4`,L`-(2x-1)e^{-2x}/4`,L`-xe^{-2x}/2`],0,L`S(t)=[-(2x+1)e^{-2x}/4]_t^{2t}`,'令 u=x,dv=e^{-2x}dx。'),
input('代入最优 t 并化简',L`e^{-2\ln2}=1/4,\quad e^{-4\ln2}=1/16`,'填写最大面积。','(4*ln(2)+3)/64',L`S_{\max}=\frac{4\ln2+3}{64}`,'上下限分别代入，再相减。','symbol14')],'t>0；S′=te^{-4t}(4−e^{2t})，先增后减，最大点 ln2。分部积分得最大值(4ln2+3)/64。');
add('2024-22','stat',p24,6,12,L`设总体 X 服从 [0,θ] 上的均匀分布，其中 \(\theta>0\) 为未知参数，\(X_1,\ldots,X_n\) 是简单随机样本，记 \(X_{(n)}=\max\{X_1,\ldots,X_n\},T_c=cX_{(n)}\)。（1）求 c 使 \(E(T_c)=\theta\)；（2）记 \(h(c)=E(T_c-\theta)^2\)，求 c 使 h(c) 最小。`,L`X_i\sim U(0,\theta),\ X_{(n)}=\max_iX_i,\quad T_c=cX_{(n)}`, [
pick('最大次序统计量：事件转换',L`\{\max_iX_i\le x\}=\bigcap_i\{X_i\le x\}`,'选择 0<x<θ 时的分布函数。',[L`(x/\theta)^n`,L`1-(x/\theta)^n`,L`nx/\theta`],0,L`F_{X_{(n)}}(x)=\begin{cases}0&x<0\\(x/\theta)^n&0\le x\le\theta\\1&x>\theta\end{cases}`,'简单随机样本独立同分布。'),
pick('由分布函数求密度',L`f(x)=F'(x)`,'选择密度在 (0,θ) 的形式。',[L`nx^{n-1}/\theta^n`,L`x^n/\theta^n`,L`nx^n/\theta^{n-1}`],0,L`f_{X_{(n)}}(x)=nx^{n-1}/\theta^n\quad(0<x<\theta),\ \text{其余为0}`,'幂函数求导。'),
input('第一问：计算一阶矩系数',L`EX_{(n)}=\int_0^\theta x\frac{nx^{n-1}}{\theta^n}dx`,'填写 EX_(n)/θ（使用 n）。','n/(n+1)',L`EX_{(n)}=\frac{n\theta}{n+1}`,'积分 x^n。','rational14'),
input('无偏条件求 c',L`E(cX_{(n)})=cEX_{(n)}=\theta`,'填写第一问 c。','(n+1)/n',L`c=\frac{n+1}{n}`,'θ>0，可约去。','rational14'),
input('第二问：计算二阶矩系数',L`EX_{(n)}^2=\int_0^\theta x^2\frac{nx^{n-1}}{\theta^n}dx`,'填写 E[X_(n)^2]/θ²。','n/(n+2)',L`E[X_{(n)}^2]=\frac{n\theta^2}{n+2}`,'积分 x^(n+1)。','rational14'),
pick('展开均方误差',L`E[(cX-\theta)^2]=c^2EX^2-2c\theta EX+\theta^2`,'选择除以 θ² 后的 h(c)。',[L`\frac{n}{n+2}c^2-\frac{2n}{n+1}c+1`,L`\frac{n}{n+1}c^2-\frac{2n}{n+2}c+1`,L`\frac{n}{n+2}c^2+1`],0,L`h(c)=\theta^2\left(\frac{n}{n+2}c^2-\frac{2n}{n+1}c+1\right)`,'不能把 E(X²) 当成 (EX)²。'),
input('对 c 求导并令其为零',L`h'(c)=2\theta^2\left(\frac n{n+2}c-\frac n{n+1}\right)`,'填写第二问最优 c。','(n+2)/(n+1)',L`c^*=\frac{n+2}{n+1}`,'θ>0,n≥1，二阶导严格为正。','rational14'),
pick('核验全局最小',L`h''(c)=2\theta^2 n/(n+2)`,'选择最值性质。',[L`\text{严格全局最小}`,L`\text{严格全局最大}`,L`\text{不能判断}`],0,L`c^*=\frac{n+2}{n+1}\text{ 为唯一全局最小点}`,'二次项系数为正。')],'分布函数 (x/θ)^n、密度 nx^(n−1)/θ^n。E[Xmax]=nθ/(n+1)，E[Xmax²]=nθ²/(n+2)。无偏 c=(n+1)/n，MSE 最优 c=(n+2)/(n+1)。');
})();
