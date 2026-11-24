/* V1.5: original-paper transcription, paper-style guided practice. */
(function(){const L=String.raw,p23='2023数学三真题.pdf',p24='2024考研数学（三）真题.docx';
const pick=(title,formula,task,choices,correct,result,why)=>({title,formula,task,choices,correct,result,why});
const input=(title,formula,task,target,result,why,mode='exact')=>({title,formula,task,target,result,why,mode});
function add(id,chapter,source,page,body,given,steps,choice,solution){CONTENT13.push({id,chapter,title:id.slice(0,4)+' · 第'+Number(id.slice(5))+'题',source,page,points:5,body,givens:[{key:'given',kind:'raw',title:'题给条件',latex:given}],checks:steps.map(s=>[s.title,null]),hint:'先自己选择适用公式，完成必要的数学步骤。',solution,steps13:steps,choice,route:[],guided13:true,new15:true})}
add('2023-02','int',p23,2,L`函数 \(f(x)=\begin{cases}1/\sqrt{1+x^2},&x\le0\\(x+1)\cos x,&x>0\end{cases}\) 的一个原函数为（ ）。各选项为：A 左段 \(\ln(\sqrt{1+x^2}-x)\)，右段 \((x+1)\cos x-\sin x\)；B 左段同A加1，右段同A；C 左段 \(\ln(\sqrt{1+x^2}+x)\)，右段 \((x+1)\sin x+\cos x\)；D 左段同C加1，右段同C。`,L`f(x)=\begin{cases}1/\sqrt{1+x^2}&x\le0\\(x+1)\cos x&x>0\end{cases}`,[
pick('左段：选对数型原函数',L`\int\frac{dx}{\sqrt{1+x^2}}`, '选择原函数（暂不定常数）。',[L`\ln(\sqrt{1+x^2}-x)+C`,L`\ln(\sqrt{1+x^2}+x)+C`,L`\sqrt{1+x^2}+C`],1,L`F_-(x)=\ln(\sqrt{1+x^2}+x)+C_-`,'左段对数中的 x 应取正号。'),
pick('右段：分部积分',L`\int u\,dv=uv-\int v\,du`,'取 u=x+1, dv=cos x dx，选择积分结果。',[L`(x+1)\sin x+\cos x+C`,L`(x+1)\cos x-\sin x+C`,L`(x+1)\sin x-\cos x+C`],0,L`F_+(x)=(x+1)\sin x+\cos x+C_+`,'减去 sin x 的积分等于加 cos x。'),
input('在分界点拼接常数',L`F_-(0)=F_+(0)`,'填写 C_−−C_+。','1',L`C_-=1+C_+`,'原函数必须连续；两侧导数在0也均为1。')],'D','分段积分后用连续性拼接，左段常数比右段大1。选D；零点两侧导数均为1。');
add('2023-03','ode',p23,2,L`若微分方程 \(y''+ay'+by=0\) 的解在 \((-\infty,+\infty)\) 上有界，则（ ）。A a<0,b>0；B a>0,b>0；C a=0,b>0；D a=0,b<0。`,L`y''+ay'+by=0`,[
pick('写特征方程',L`y=e^{rx}`,'代入原方程。',[L`r^2+ar+b=0`,L`r+a+b=0`,L`r^2+br+a=0`],0,L`r^2+ar+b=0`,'分别计算一阶和二阶导数。'),
pick('判断全实轴有界的根',L`e^{(u+iv)x}=e^{ux}(\cos vx+i\sin vx)`,'要使通解在两端都不增长，应选择？',[L`u<0`,L`u>0`,L`u=0,\ v\ne0`],2,L`r_{1,2}=\pm iv,\quad v>0`,'非零实部在一个方向发散；重零根会产生 x 项。'),
pick('由根反推系数',L`r_1+r_2=-a,\ r_1r_2=b`,'选择系数条件。',[L`a=0,b>0`,L`a>0,b>0`,L`a=0,b<0`],0,L`a=0,b=v^2>0`,'纯虚共轭根的积为正。')],'C','题意按通解（所有解）有界理解，特征根应为非零纯虚共轭根，故C。若仅要求存在某个有界解，则零解总存在，题目无唯一结论。');
add('2023-05','mat',p23,2,L`设 A,B 为 n 阶可逆矩阵，E 为单位矩阵，M* 表示伴随矩阵。求 \(\begin{pmatrix}A&E\\O&B\end{pmatrix}^*\)。A：左上 |A|B*，右上 −B*A*，右下 |B|A*；B：左上 |B|A*，右上 −A*B*，右下 |A|B*；C：左上 |B|A*，右上 −B*A*，右下 |A|B*；D：左上 |A|B*，右上 −A*B*，右下 |B|A*。各选项左下均为 O。`,L`M=\begin{pmatrix}A&E\\O&B\end{pmatrix}`, [
pick('分块三角行列式',L`\det\begin{pmatrix}A&C\\O&B\end{pmatrix}=|A||B|`,'选择 |M|。',[L`|A|+|B|`,L`|A||B|`,L`|A+B|`],1,L`|M|=|A||B|\ne0`,'分块上三角矩阵。'),
pick('分块逆矩阵：保持乘法次序',L`MM^{-1}=E`,'选择逆矩阵的右上块。',[L`-B^{-1}A^{-1}`,L`-A^{-1}B^{-1}`,L`A^{-1}B^{-1}`],1,L`M^{-1}=\begin{pmatrix}A^{-1}&-A^{-1}B^{-1}\\O&B^{-1}\end{pmatrix}`,'上右块满足 AX+B^{-1}=0。'),
pick('代入伴随公式',L`M^*=|M|M^{-1}`,'选择右上块。',[L`-B^*A^*`,L`A^*B^*`,L`-A^*B^*`],2,L`M^*=\begin{pmatrix}|B|A^*&-A^*B^*\\O&|A|B^*\end{pmatrix}`,'不要交换矩阵乘法的次序。')],'B','分块三角行列式乘分块逆矩阵，按原顺序合并伴随，选B。');
add('2023-06','quad',p23,2,L`二次型 \(f=(x_1+x_2)^2+(x_1+x_3)^2-4(x_2-x_3)^2\) 的规范形为（ ）。A \(y_1^2+y_2^2\)；B \(y_1^2-y_2^2\)；C \(y_1^2+y_2^2-4y_3^2\)；D \(y_1^2+y_2^2-y_3^2\)。`,L`f=(x_1+x_2)^2+(x_1+x_3)^2-4(x_2-x_3)^2`,[
pick('观察平方项关系',L`u=x_1+x_2,\ v=x_1+x_3`,'x₂−x₃ 用 u,v 如何表示？',[L`u+v`,L`u-v`,L`v/u`],1,L`f=u^2+v^2-4(u-v)^2`,'第三项依赖前两个线性形式。'),
pick('配平方而非求三阶特征值',L`u^2+v^2=\frac{(u+v)^2+(u-v)^2}{2}`,'选化简结果。',[L`\frac12(u+v)^2-\frac72(u-v)^2`,L`\frac12(u+v)^2+\frac72(u-v)^2`,L`(u+v)^2-4(u-v)^2`],0,L`f=\frac12(u+v)^2-\frac72(u-v)^2`,'两个线性形式独立，可再补 x₁ 构成可逆变换。'),
pick('判断正负惯性指数',L`f=y_1^2-y_2^2+0y_3^2`,'规范形对应哪种符号结构？',[L`(+,+,0)`,L`(+,-,0)`,L`(+,+,-)`],1,L`p=q=1,\quad r=2`,'规范形非零系数化为 ±1。')],'B','令u=x₁+x₂,v=x₁+x₃，配平方为(u+v)²/2−7(u−v)²/2，惯性指数1、1，选B。');
add('2023-07','vec',p23,3,L`已知 \(\alpha_1=(1,2,3)^T,\alpha_2=(2,1,1)^T,\beta_1=(2,5,9)^T,\beta_2=(1,0,1)^T\)。若 γ 既可由 α₁,α₂ 线性表示，也可由 β₁,β₂ 线性表示，则 γ 为（ ）。A k(3,3,4)ᵀ；B k(3,5,10)ᵀ；C k(−1,1,2)ᵀ；D k(1,5,8)ᵀ；k∈R。`,L`\gamma=s\alpha_1+t\alpha_2=u\beta_1+v\beta_2`,[
pick('从选项出发：观察 α 平面',L`(x,y,z)=(s+2t,2s+t,3s+t)`,'消去 s,t，选择坐标关系。',[L`-x+5y-3z=0`,L`x+y=z`,L`x-5y-3z=0`],0,L`-x+5y-3z=0`,'直接验证两个 α 向量都满足，且它们独立。'),
pick('观察 β 平面',L`(x,y,z)=(2u+v,5u,9u+v)`,'利用 z−x=7u 和 y=5u。',[L`5(z-x)=7y`,L`7(z-x)=5y`,L`z=x+y`],0,L`5x+7y-5z=0`,'消去 u，无需四元增广矩阵。'),
pick('代入消元或直接验证选项',L`z=x+7y/5`,'代入第一个关系后，哪个方向同时满足？',[L`(3,3,4)^T`,L`(3,5,10)^T`,L`(-1,1,2)^T`,L`(1,5,8)^T`],3,L`y=5x,\ z=8x\Rightarrow\gamma=k(1,5,8)^T`,'两个独立平面相交成直线。')],'D','α平面为−x+5y−3z=0，β平面为5x+7y−5z=0，得y=5x,z=8x。选D。');
add('2023-09','stat',p23,3,L`两个独立简单随机样本分别来自 \(N(\mu_1,\sigma^2),N(\mu_2,2\sigma^2)\)，容量 n,m。样本方差分别为 \(S_1^2=\sum(X_i-\bar X)^2/(n-1),S_2^2=\sum(Y_i-\bar Y)^2/(m-1)\)。则（ ）。A \(S_1^2/S_2^2\sim F(n,m)\)；B 同一比值服从 F(n−1,m−1)；C \(2S_1^2/S_2^2\sim F(n,m)\)；D 同一带2比值服从 F(n−1,m−1)。`,L`X_i\sim N(\mu_1,\sigma^2),\quad Y_i\sim N(\mu_2,2\sigma^2)`,[
pick('分别构造卡方统计量',L`(n-1)S^2/\sigma^2\sim\chi^2(n-1)`,'选择第二个样本对应的统计量。',[L`mS_2^2/\sigma^2`,L`(m-1)S_2^2/(2\sigma^2)`,L`(m-1)S_2^2/\sigma^2`],1,L`U=\frac{(n-1)S_1^2}{\sigma^2},\ V=\frac{(m-1)S_2^2}{2\sigma^2}`,'注意第二总体方差有系数2。'),
pick('导入 F 分布定义',L`\frac{U/(n-1)}{V/(m-1)}\sim F(n-1,m-1)`,'化简比值。',[L`S_1^2/S_2^2`,L`S_2^2/S_1^2`,L`2S_1^2/S_2^2`],2,L`\frac{2S_1^2}{S_2^2}\sim F(n-1,m-1)`,'两个样本独立，故卡方量独立。')],'D','两卡方统计量除自由度后作比，方差比给出系数2。选D。');
add('2023-10','mle',p23,3,L`设 X₁,X₂ 来自总体 \(N(\mu,\sigma^2)\) 的简单随机样本，σ>0 未知。记 \(\hat\sigma=a|X_1-X_2|\)，若 \(E\hat\sigma=\sigma\)，则 a=（ ）。A √π/2；B √(2π)/2；C √π；D √(2π)。`,L`\hat\sigma=a|X_1-X_2|`,[
pick('求差的分布',L`D(X_1-X_2)=DX_1+DX_2`,'选择分布。',[L`N(0,\sigma^2)`,L`N(0,2\sigma^2)`,L`N(2\mu,2\sigma^2)`],1,L`W=X_1-X_2\sim N(0,2\sigma^2)`,'独立样本、均值相消。'),
pick('标准化并利用对称性',L`E|Z|=2\int_0^\infty\frac{z}{\sqrt{2\pi}}e^{-z^2/2}dz`,'选标准正态绝对值期望。',[L`1`,L`\sqrt\pi`,L`\sqrt{2/\pi}`],2,L`E|W|=\sqrt2\sigma E|Z|=2\sigma/\sqrt\pi`,'用指数函数微分完成积分。'),
pick('根据无偏条件求系数',L`aE|W|=\sigma`,'填写对应常数的选项。',[L`\sqrt\pi/2`,L`\sqrt{2\pi}/2`,L`\sqrt\pi`],0,L`a=\sqrt\pi/2`,'σ>0，可约去。')],'A','W~N(0,2σ²)，E|W|=2σ/√π，故a=√π/2。');
add('2023-12','multi',p23,3,L`已知函数 f(x,y) 满足 \(df=(xdy-ydx)/(x^2+y^2)\)，\(f(1,1)=\pi/4\)，则 \(f(\sqrt3,3)=\underline{\quad}\)。`,L`df=\frac{xdy-ydx}{x^2+y^2}`, [
pick('观察商的微分',L`d(y/x)=\frac{xdy-ydx}{x^2}`,'将 df 写成只含 u=y/x 的形式。',[L`du/(1+u^2)`,L`du/u`,L`du/(1-u^2)`],0,L`df=\frac{du}{1+u^2}`,'第一象限内 x>0。'),
pick('积分并用已知点定常数',L`\int\frac{du}{1+u^2}=\arctan u+C`,'选择 f 的表达式（第一象限）。',[L`\arctan(y/x)`,L`\arctan(x/y)`,L`\arctan(y/x)+\pi/4`],0,L`f(x,y)=\arctan(y/x)`,'f(1,1)=π/4，所以 C=0。'),
input('代入目标点','\\arctan(3/\\sqrt3)','填写结果（pi 表示 π）。','pi/3',L`f(\sqrt3,3)=\pi/3`,'arctan√3=π/3。','symbol14')],null,'在第一象限令u=y/x，df=du/(1+u²)，由初值确定C=0，目标值π/3。');
add('2023-14','ode',p23,3,L`某公司在 t 时刻的资产为 f(t)，从0时刻到t时刻的平均资产等于 \(f(t)/t-t\)。假设 f(t) 连续且 f(0)=0，求 f(t)。`,L`\frac1t\int_0^t f(s)ds=\frac{f(t)}t-t,\quad t>0`,[
pick('把平均值写成积分',L`\bar f=\frac1t\int_0^t f(s)ds`,'两侧乘 t 后的关系。',[L`\int_0^t f(s)ds=f(t)-t^2`,L`\int_0^t f(s)ds=f(t)-t`,L`\int_0^t f(s)ds=tf(t)-t^2`],0,L`\int_0^t f(s)ds=f(t)-t^2`,'等式右边乘 t。'),
pick('变上限积分求导',L`\frac d{dt}\int_0^t f(s)ds=f(t)`,'选择微分方程。',[L`f'+f=2t`,L`f'-f=2t`,L`f'-f=-2t`],1,L`f'-f=2t`,'连续性保证积分可导，故 f 亦可导。'),
pick('观察特解并求通解',L`f_p=At+B`,'代入 f′−f=2t 比较系数。',[L`f_p=2t+2`,L`f_p=-2t+2`,L`f_p=-2t-2`],2,L`f(t)=Ce^t-2t-2`,'-A=2，A−B=0。'),
input('初值确定任意常数',L`f(0)=C-2=0`,'填写 C。','2',L`f(t)=2e^t-2t-2`,'带回积分关系也成立。')],null,'平均值乘t后求导，得 f′−f=2t；线性特解−2t−2，加齐次解Ce^t，由初值C=2。');
add('2023-15','det',p23,3,L`线性方程组 \(ax_1+x_3=1,\ x_1+ax_2+x_3=0,\ x_1+2x_2+ax_3=0,\ ax_1+bx_2=2\) 有解。已知 \(\begin{vmatrix}a&0&1\\1&a&1\\1&2&a\end{vmatrix}=4\)，求 \(\begin{vmatrix}1&a&1\\1&2&a\\a&b&0\end{vmatrix}\)。`,L`r_1x=1,\ r_2x=r_3x=0,\ r_4x=2,\quad |r_1;r_2;r_3|=4`,[
pick('利用已知非零行列式',L`|r_1;r_2;r_3|\ne0`,'前三行组成一组基，选择 r₄ 的表示形式。',[L`r_4=c_1r_1+c_2r_2+c_3r_3`,L`r_4=r_2+r_3`,L`r_4=0`],0,L`r_4=c_1r_1+c_2r_2+c_3r_3`,'三行线性无关，构成 R³ 的基。'),
input('用方程组有解条件消去未知系数',L`r_4x=c_1(r_1x)+c_2(r_2x)+c_3(r_3x)`,'填写 c₁。','2',L`2=c_1\cdot1+c_2\cdot0+c_3\cdot0\Rightarrow c_1=2`,'不必求 a、b 或 x 的具体值。'),
input('按行线性性与换行符号',L`|r_2;r_3;r_4|=c_1|r_2;r_3;r_1|`,'填写所求行列式。','8',L`|r_2;r_3;r_4|=2|r_1;r_2;r_3|=8`,'其他两项有重复行为零；循环换行两次，符号不变。')],null,'前三行成基，设第四行为线性组合，两边乘题给方程组的一个解，得第一行系数2。按行线性性和偶置换得8。');
add('2024-01','lim',p24,1,L`函数 \(f(x)=\lim_{n\to\infty}(1+x)/(1+nx^{2n})\)，则 f(x)（ ）。A 在 x=±1 均连续；B x=1 连续、−1 不连续；C 均不连续；D x=1 不连续、−1 连续。`,L`f(x)=\lim_{n\to\infty}\frac{1+x}{1+nx^{2n}}`,[
pick('分类讨论指数项',L`nq^n\to0\ (0\le q<1)`,'选择 |x|<1 时的函数值。',[L`0`,L`1+x`,L`1`],1,L`f(x)=1+x\quad(|x|<1)`,'令 q=x²。'),
pick('检查边界及外部',L`n x^{2n}\ge n\quad(|x|\ge1)`,'选择外部与边界的值。',[L`f(x)=0`,L`f(x)=1+x`,L`f(x)=1`],0,L`f(x)=0\quad(|x|\ge1)`,'对每个固定 x 取 n→∞。'),
pick('比较左右极限',L`f(1)=f(-1)=0`,'哪一点不连续？',[L`x=-1`,L`x=\pm1`,L`x=1`],2,L`\lim_{x\to1^-}f(x)=2,\quad\lim_{x\to-1^+}f(x)=0`,'外侧极限均为0。')],'D','按 |x|<1 和 |x|≥1 分段，x=1 左极限为2，−1 两侧极限均0。选D。');
add('2024-02','int',p24,1,L`设 \(I=\int_a^{a+k\pi}|\sin x|dx\)，k 为整数，则 I（ ）。A 只与a有关；B 只与k有关；C 与a,k均有关；D 与a,k均无关。`,L`I=\int_a^{a+k\pi}|\sin x|dx`,[
pick('识别绝对值函数的周期',L`|\sin(x+T)|=|\sin x|`,'最小正周期是多少？',[L`\pi/2`,L`2\pi`,L`\pi`],2,L`T=\pi`,'绝对值消除了正负号。'),
input('计算一个周期的积分',L`\int_0^\pi\sin x\,dx=[-\cos x]_0^\pi`,'填写积分值。','2',L`\int_0^\pi|\sin x|dx=2`,'π区间内 sin 非负。'),
pick('推广到整数周期',L`\int_a^{a+T}f=\int_0^Tf`,'k 可为负数，选正确表达式。',[L`2|k|`,L`2k`,L`2ak`],1,L`I=2k`,'负 k 时积分方向反转。')],'B','周期π，单周期积分2，故I=2k，与a无关。');
add('2024-03','double',p24,1,L`设 f(x,y) 连续，交换积分 \(\int_{\pi/6}^{\pi/2}dx\int_{\sin x}^{1} f(x,y)dy\) 的积分次序（ ）。A y 从1/2到1，x 从π/6到arcsin y；B y 从1/2到1，x 从arcsin y到π/2；C y 从0到1/2，x 从π/6到arcsin y；D y 从0到1/2，x 从arcsin y到π/2。`,L`\pi/6\le x\le\pi/2,\quad\sin x\le y\le1`,[
pick('确定 y 投影',L`\sin(\pi/6)=1/2,\quad\sin(\pi/2)=1`,'选择 y 的范围。',[L`0\le y\le1/2`,L`1/2\le y\le1`,L`0\le y\le1`],1,L`1/2\le y\le1`,'sin 在给定区间递增。'),
pick('固定 y 解 x 的不等式',L`\sin x\le y`,'选择 x 的范围。',[L`\arcsin y\le x\le\pi/2`,L`0\le x\le\arcsin y`,L`\pi/6\le x\le\arcsin y`],2,L`\pi/6\le x\le\arcsin y`,'单调递增，不等号方向不变。'),
pick('写交换后的积分',L`\iint_D f(x,y)dxdy`,'选择结果。',[L`\int_{1/2}^1dy\int_{\pi/6}^{\arcsin y}f(x,y)dx`,L`\int_{1/2}^1dy\int_{\arcsin y}^{\pi/2}f(x,y)dx`],0,L`\int_{1/2}^1dy\int_{\pi/6}^{\arcsin y}f(x,y)dx`,'先写外层投影，再写内层边界。')],'A','区域y∈[1/2,1]，固定y有π/6≤x≤arcsin y，选A。');
add('2024-04','series',p24,1,L`已知幂级数 \(\sum_{n=0}^\infty a_nx^n\) 的和函数为 ln(2+x)，则 \(\sum_{n=0}^\infty na_{2n}=\)（ ）。A −1/6；B −1/3；C 1/6；D 1/3。`,L`F(x)=\ln(2+x)=\sum a_nx^n`,[
pick('提取偶数项',L`G(x)=\frac{F(x)+F(-x)}2`,'选 G 的简化式（|x|<2）。',[L`\frac12\ln(4-x^2)`,L`\frac12\ln(4+x^2)`,L`\ln(2+x)`],0,L`G(x)=\frac12\ln(4-x^2)=\sum a_{2n}x^{2n}`,'对数相加化为乘积。'),
pick('逐项求导并补因子',L`G'(x)=\sum 2na_{2n}x^{2n-1}`,'怎样构造所求和？',[L`G'(1)`,L`G'(1)/2`,L`2G'(1)`],1,L`\sum na_{2n}=\frac12G'(1)`,'x=1 严格位于收敛半径2以内。'),
input('代入 x=1',L`G'(x)=-x/(4-x^2)`,'填写所求和。','-1/6',L`\sum na_{2n}=-\frac16`,'分母为3，另有1/2。')],'A','偶部和函数G=ln(4−x²)/2；求导，在x=1代入后除2得−1/6。');
add('2024-05','quad',p24,1,L`二次型 \(x^TAx\) 经正交变换化为 \(y_1^2-2y_2^2+3y_3^2\)，则二次型矩阵 A 的行列式与迹分别为（ ）。A −6,−2；B 6,−2；C −6,2；D 6,2。`,L`P^TAP=\operatorname{diag}(1,-2,3),\quad P^TP=E`,[
pick('正交合同也是相似',L`P^T=P^{-1}`,'A 的特征值集合为？',[L`1,2,3`,L`1,-2,3`,L`1,-2,-3`],1,L`\lambda_1=1,\ \lambda_2=-2,\ \lambda_3=3`,'相似变换保持特征值。'),
input('行列式为特征值之积',L`|A|=\lambda_1\lambda_2\lambda_3`,'填写行列式。','-6',L`|A|=-6`,'注意负号。'),
input('迹为特征值之和',L`\operatorname{tr}A=\sum\lambda_i`,'填写迹。','2',L`\operatorname{tr}A=2`,'1−2+3=2。')],'C','正交合同即相似，特征值1、−2、3；行列式−6，迹2。');
add('2024-06','mat',p24,1,L`设 A 为3阶矩阵，\(P=\begin{pmatrix}1&0&0\\0&1&0\\1&0&1\end{pmatrix}\)，若 \(P^TAP^2=\begin{pmatrix}a+2c&0&c\\0&b&0\\2c&0&c\end{pmatrix}\)，则 A（ ）。A diag(c,a,b)；B diag(b,c,a)；C diag(a,b,c)；D diag(c,b,a)。`,L`P^TAP^2=M`,[
pick('用选项代入简化运算',L`A=\operatorname{diag}(u,v,w)`,'左乘 A 相当于将 P² 的各行分别乘 u,v,w。P² 为？',[L`\begin{pmatrix}1&0&0\\0&1&0\\2&0&1\end{pmatrix}`,L`\begin{pmatrix}1&0&0\\0&1&0\\1&0&1\end{pmatrix}`],0,L`AP^2=\begin{pmatrix}u&0&0\\0&v&0\\2w&0&w\end{pmatrix}`,'P² 的(3,1) 元素为2。'),
pick('乘 Pᵀ 并比较元素',L`P^T=\begin{pmatrix}1&0&1\\0&1&0\\0&0&1\end{pmatrix}`,'比较结果的(2,2)和(3,3)元素。',[L`v=a,w=b`,L`v=b,w=c`,L`v=c,w=a`],1,L`P^TAP^2=\begin{pmatrix}u+2w&0&w\\0&v&0\\2w&0&w\end{pmatrix},\quad v=b,w=c`,'用相同位置的元素比较。'),
pick('比较(1,1)并回验',L`u+2w=a+2c`,'选择 A。',[L`\operatorname{diag}(c,a,b)`,L`\operatorname{diag}(b,c,a)`,L`\operatorname{diag}(a,b,c)`],2,L`A=\operatorname{diag}(a,b,c)`,'P 可逆，方程唯一确定 A。')],'C','选项均为对角矩阵，直接设diag(u,v,w)代入，按元素比较得u=a,v=b,w=c。');
add('2024-07','det',p24,2,L`矩阵 \(A=\begin{pmatrix}a+1&b&3\\a&b/2&1\\1&1&2\end{pmatrix}\)，Mᵢⱼ表示余子式。若 |A|=−1/2 且 −M₂₁+M₂₂−M₂₃=0，则（ ）。A a=0或−3/2；B a=0或3/2；C b=1或−1/2；D b=−1或1/2。`,L`|A|=-1/2,\quad -M_{21}+M_{22}-M_{23}=0`,[
pick('按第二行提取三个余子式',L`M_{2j}=\det(A\text{ 去第2行、第}j\text{列})`,'选三个余子式（尚未乘代数符号）。',[L`2b-3,\ 2a-1,\ a+1-b`,L`3-2b,\ 2a-1,\ b-a-1`,L`2b-3,\ 2a+1,\ a-b`],0,L`M_{21}=2b-3,\ M_{22}=2a-1,\ M_{23}=a+1-b`,'逐个计算二阶行列式。'),
pick('代入题给关系并化简',L`-M_{21}+M_{22}-M_{23}=0`,'选择 b 的表达式。',[L`b=a-1`,L`b=a+1`,L`b=1-a`],1,L`a-b+1=0\Rightarrow b=a+1`,'直接合并同类项。'),
pick('按第二行展开 |A|',L`|A|=-aM_{21}+\frac b2M_{22}-M_{23}`,'选择展开并化简的结果。',[L`-ab+2a+b/2-1`,L`ab+2a-b/2+1`,L`-ab+2a-b/2-1`],0,L`|A|=-ab+2a+b/2-1`,'第二行符号依次 −,+,−。'),
pick('代入 b 并因式分解',L`|A|=-1/2`,'选择等价方程。',[L`a(a+3/2)=0`,L`a(a-3/2)=0`,L`a(a-1)=0`],1,L`a(a-3/2)=0\Rightarrow a=0\text{ 或 }3/2`,'代入b=a+1后，常数项−1/2抵消。')],'B','三个余子式为2b−3,2a−1,a+1−b。题给关系得b=a+1；按第二行展开并代入，得a(a−3/2)=0。');
add('2024-10','joint',p24,2,L`设随机变量 X,Y 相互独立且均服从参数 λ 的指数分布，令 Z=|X−Y|，则下列随机变量与 Z 同分布的是（ ）。A X+Y；B (X+Y)/2；C 2X；D X。`,L`X,Y\overset{ind}{\sim}\mathrm{Exp}(\lambda),\quad Z=|X-Y|`,[
pick('先求尾概率并利用对称性',L`P(Z>z)=P(X>Y+z)+P(Y>X+z)`,'当 z≥0，两个事件互斥且等概率，化为什么？',[L`2P(X>Y+z)`,L`P(X>Y+z)`,L`2P(X>z)`],0,L`P(Z>z)=2P(X>Y+z)`,'交换 X,Y 的联合分布不变。'),
pick('按 Y 条件化',L`P(X>s)=e^{-\lambda s},\quad f_Y(y)=\lambda e^{-\lambda y}`,'选择正确的积分。',[L`2\int_0^\infty\lambda e^{-\lambda(y+z)}dy`,L`2\int_0^\infty e^{-\lambda(y+z)}\lambda e^{-\lambda y}dy`,L`2\int_0^z\lambda e^{-\lambda y}dy`],1,L`P(Z>z)=2\lambda e^{-\lambda z}\int_0^\infty e^{-2\lambda y}dy`,'独立性允许直接使用 X 的尾概率。'),
pick('积分后识别分布',L`\int_0^\infty e^{-2\lambda y}dy=1/(2\lambda)`,'选择 Z 的尾概率。',[L`e^{-2\lambda z}`,L`2e^{-\lambda z}`,L`e^{-\lambda z}`],2,L`P(Z>z)=e^{-\lambda z},\ z\ge0`,'与 X 的尾概率完全一致。')],'D','独立同分布下P(|X−Y|>z)=2∫ e^{−λ(y+z)}λe^{−λy}dy=e^{−λz}。');
add('2024-12','int',p24,2,L`计算 \(\int_2^{+\infty}5/(x^4+3x^2-4)\,dx\)。`,L`I=\int_2^\infty\frac5{x^4+3x^2-4}dx`,[
pick('分母因式分解',L`t=x^2,\quad t^2+3t-4`,'选择分解。',[L`(x^2+1)(x^2-4)`,L`(x^2-1)(x^2+4)`,L`(x^2-2)^2`],1,L`x^4+3x^2-4=(x^2-1)(x^2+4)`,'常数乘积−4，一次项3。'),
pick('观察分母之差直接拆项',L`(x^2+4)-(x^2-1)=5`,'选择部分分式。',[L`1/(x^2-1)+1/(x^2+4)`,L`1/(x^2+4)-1/(x^2-1)`,L`1/(x^2-1)-1/(x^2+4)`],2,L`\frac5{(x^2-1)(x^2+4)}=\frac1{x^2-1}-\frac1{x^2+4}`,'通分即可，不必建立方程组。'),
pick('导入两个基本积分',L`\frac1{x^2-1}=\frac12\left(\frac1{x-1}-\frac1{x+1}\right)`,'选择原函数。',[L`\frac12\ln\frac{x-1}{x+1}-\frac12\arctan\frac x2`,L`\ln\frac{x-1}{x+1}-\arctan x`,L`\frac12\ln\frac{x+1}{x-1}+\frac12\arctan\frac x2`],0,L`G(x)=\frac12\ln\frac{x-1}{x+1}-\frac12\arctan\frac x2`,'x≥2，对数真数为正。'),
input('取上限并减去下限',L`G(\infty)-G(2)`,'填写结果，使用 ln(3) 和 pi。','ln(3)/2-pi/8',L`I=\frac12\ln3-\frac\pi8`,'上限−π/4，下限−ln3/2−π/8。','symbol14')],null,'分母拆成(x²−1)(x²+4)，直接相减拆分式，原函数为ln((x−1)/(x+1))/2−arctan(x/2)/2，端点差为ln3/2−π/8。');
add('2024-14','econ',p24,3,L`某产品价格 \(p=\begin{cases}25-0.25Q,&Q\le20\\35-0.75Q,&Q>20\end{cases}\)，总成本 \(C=150+5Q+0.25Q^2\)。求最大利润（万元）。`,L`\pi(Q)=Qp(Q)-C(Q),\quad Q\ge0`,[
pick('分别构造利润函数',L`\pi=Qp-C`,'选择两个区间的表达式。',[L`-Q^2+20Q-150,\ -Q^2+30Q-150`,L`-Q^2/2+20Q-150,\ -Q^2+30Q-150`,L`-Q^2/2+25Q-150,\ -Q^2+35Q-150`],1,L`\pi(Q)=\begin{cases}-Q^2/2+20Q-150&0\le Q\le20\\-Q^2+30Q-150&Q>20\end{cases}`,'收入为 Q 乘价格，再减全部成本。'),
input('第一段驻点',L`\pi_1'(Q)=20-Q`,'填写第一段最大值所在 Q。','20',L`Q=20`,'二阶导为−1。'),
pick('第二段驻点及可行性',L`\pi_2'(Q)=30-2Q`,'选择第二段的单调性。',[L`Q>20\text{ 时递增}`,L`Q>20\text{ 时先增后减}`,L`Q>20\text{ 时严格递减}`],2,L`\pi_2'(Q)<0\quad(Q>20)`,'驻点15不在该段。'),
input('代入公共边界比较',L`\pi_1(20)=-20^2/2+20\cdot20-150`,'填写最大利润。','50',L`\max\pi=50`,'第二段边界极限相同且往右下降。')],null,'分段求利润，第一段在20达到最大，第二段递减，最大50万元。');
add('2024-15','eig',p24,3,L`设 A 为3阶矩阵，A* 为其伴随矩阵，E 为单位矩阵。若 r(2E−A)=1，r(E+A)=2，则 |A*|=____。`,L`r(2E-A)=1,\quad r(E+A)=2`,[
input('根据秩求特征空间维数',L`\dim\ker(2E-A)=3-r(2E-A)`,'填写 λ=2 的特征空间维数。','2',L`\dim V_2=2`,'秩与零空间维数之和为3。'),
input('第二个特征空间',L`\dim\ker(E+A)=3-r(E+A)`,'填写 λ=−1 的特征空间维数。','1',L`\dim V_{-1}=1`,'不同特征值的特征空间直和。'),
input('由三个独立特征向量求行列式',L`|A|=\lambda_1\lambda_2\lambda_3`,'填写 |A|。','-4',L`|A|=2\cdot2\cdot(-1)=-4`,'两空间维数和为3。'),
input('伴随矩阵行列式公式',L`|A^*|=|A|^{n-1}`,'填写最终值。','16',L`|A^*|=(-4)^2=16`,'三阶矩阵取二次方。')],null,'秩给出特征值2的几何重数2及−1的几何重数1，故可对角化，|A|=−4，|A*|=16。');
add('2024-16','event',p24,3,L`随机试验每次成功概率 p，进行3次独立重复试验。在至少成功1次的条件下，3次全部成功的概率为4/13，求 p。`,L`X\sim B(3,p),\quad P(X=3\mid X\ge1)=4/13`,[
pick('导入条件概率',L`P(A\mid B)=P(AB)/P(B)`,'由于全部成功包含于至少一次成功，选择关系。',[L`p^3/[1-(1-p)^3]=4/13`,L`p^3/(1-p)^3=4/13`,L`3p/[1-(1-p)^3]=4/13`],0,L`\frac{p^3}{1-(1-p)^3}=\frac4{13},\quad0<p\le1`,'条件事件概率必须大于0。'),
pick('交叉相乘并约去 p',L`13p^3=4(3p-3p^2+p^3)`,'选择二次方程。',[L`3p^2-4p+4=0`,L`3p^2+4p-4=0`,L`9p^2-12p-12=0`],1,L`3p^2+4p-4=0`,'先除p，再除3。'),
pick('因式分解并排除不合条件的根',L`(3p-2)(p+2)=0`,'选择有效根。',[L`p=-2`,L`p=0`,L`p=2/3`],2,L`p=2/3`,'概率必须在(0,1]。')],null,'二项分布与补事件，p³/[1−(1−p)³]=4/13，约p得(3p−2)(p+2)=0，舍负根。');
})();
