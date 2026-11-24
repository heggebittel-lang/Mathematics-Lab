const assert=require('node:assert/strict'),M=require('../core');require('../algebra');require('../calculus-extra');require('../math07');require('../math10');const p=M.parse;let n=0;function t(name,f){f();console.log('PASS '+name);n++}
t('coefficient of expanded polynomial',()=>assert.equal(M.coefficient10(p('(x+1)^4'),'x',3),'4'));
t('coefficient of absent term',()=>assert.equal(M.coefficient10(p('x^2+1'),'x',3),'0'));
t('reciprocal substitution and removable quotient series',()=>{let a=M.inverseSub10(p('x^2*(2-x*sin(1/x)-cos(1/x))'),'x','t'),r=M.limitParts10(a,'t',3);assert.equal(M.seriesRatio10(r.p,r.q).value,'2/3');assert.equal(r.trace.find(z=>z.ast.v==='sin').degree,4)});
t('insufficient Taylor order rejected',()=>{let a=M.inverseSub10(p('x^2*(2-x*sin(1/x)-cos(1/x))'),'x','t'),r=M.limitParts10(a,'t',1);assert.throws(()=>M.seriesRatio10(r.p,r.q))});
t('Taylor quotient with removable zero',()=>{let r=M.limitParts10(p('(1-cos(x))/x^2'),'x',2);assert.equal(M.seriesRatio10(r.p,r.q).value,'1/2')});
t('covariance equation and solved variance',()=>{let a=M.covLinear10(['1','0'],['1','2'],'1','2',p('c'));assert.equal(M.compare(a,p('1+2*c'),'c'),'ok');let v=M.covLinear10(['1','-1'],['1','-1'],'1','2',p('-1/2'));assert.equal(v.v,'4')});
t('correlation exact and invalid covariance rejected',()=>{assert.equal(M.corr10('3/2','1','4').v,'3/4');assert.throws(()=>M.corr10('2','1','1'))});
t('Poisson approximation and cumulative probability',()=>{assert.equal(M.binomialPoisson10({dist:'binomial',n:'20',p:'1/10'}),'2');assert.equal(M.poissonTerms10('2',1,'cdf').coeff,'3')});
t('Poisson mass and invalid input',()=>{assert.equal(M.poissonTerms10('3',2,'mass').coeff,'9/2');assert.throws(()=>M.poissonTerms10('3',-1,'mass'))});
t('partial fraction general numerator',()=>{let r=M.partial10(p('(3*x+2)/((x-2)*(x^2+1))'),'x',p('x-2'),p('x^2+1'));assert.equal(r.A,'8/5');assert.equal(r.B,'-8/5');assert.equal(r.C,'-1/5')});
t('reject mismatched denominator and reducible quadratic',()=>{assert.throws(()=>M.partial10(p('1/((x+1)*(x^2+1))'),'x',p('x+2'),p('x^2+1')));assert.throws(()=>M.partial10(p('1/((x+1)*(x^2-1))'),'x',p('x+1'),p('x^2-1')))});
t('partial fraction primitive bounds',()=>{let r=M.partial10(p('1/((x+1)*(x^2-2*x+2))'),'x',p('x+1'),p('x^2-2*x+2')),f=M.primitivePartial10(r);assert.deepEqual(M.rationalBounds10(f,0,1).terms,[{type:'ln',arg:'2',coef:'3/10'},{type:'pi',arg:'1',coef:'1/10'}]);assert.throws(()=>M.rationalBounds10(f,-2,0));});
console.log(n+' V1.0 tests passed');
