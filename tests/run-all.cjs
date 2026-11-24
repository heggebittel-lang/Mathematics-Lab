const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
let files=fs.readdirSync(__dirname).filter(f=>f.endsWith('.test.js')).sort(),bad=0;
for(const file of files){console.log('\n--- '+file+' ---');const r=spawnSync(process.execPath,[path.join(__dirname,file)],{cwd:path.join(__dirname,'..'),stdio:'inherit'});if(r.status!==0)bad++}
console.log(`\n${files.length-bad}/${files.length} scripts passed`);process.exitCode=bad?1:0;
