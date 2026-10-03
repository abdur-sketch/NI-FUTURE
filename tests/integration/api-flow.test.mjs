import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port=3100,base=`http://127.0.0.1:${port}`;
let output="";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",String(port)],{cwd:process.cwd(),env:{...process.env,GOOGLE_CLOUD_PROJECT:"ni-future-local-test",GCLOUD_PROJECT:"ni-future-local-test",FIREBASE_PROJECT_ID:"ni-future-local-test",ADMIN_EMAIL:"admin@test.local",ADMIN_PASSWORD:"correct-test-password",ADMIN_SESSION_SECRET:"test-admin-session-secret-32-characters",RESULT_TOKEN_SECRET:"test-result-token-secret-32-characters",RATE_LIMIT_SECRET:"test-rate-limit-secret-32-characters"},stdio:["ignore","pipe","pipe"]});
server.stdout.on("data",chunk=>output+=chunk);server.stderr.on("data",chunk=>output+=chunk);

async function ready(){for(let i=0;i<80;i++){try{const r=await fetch(base);if(r.ok)return}catch{}await new Promise(r=>setTimeout(r,250))}throw new Error(`Next server did not start:\n${output}`)}
async function post(path,body,ip=`203.0.113.${Math.floor(Math.random()*200)+1}`){return fetch(base+path,{method:"POST",headers:{"content-type":"application/json","x-forwarded-for":ip},body:JSON.stringify(body),redirect:"manual"})}
const profile={studentName:"Integration Test",parentName:"Wali Integration",phone:"081234567890",school:"Sekolah Emulator"};
const answers=[
  ["q1","design"],["q2","visual"],["q3","poster"],["q4","see"],["q5","camera"],
  ["q6","brand"],["q7","compose"],["q8","look"],["q9","useful"],["q10","studio"],
].map(([questionId,answerId])=>({questionId,answerId}));

await ready();
test.after(()=>server.kill("SIGTERM"));

test("existing public routes remain available with security headers",async()=>{for(const path of ["/","/presentasi","/mulai","/minat","/karya","/biaya","/konsultasi","/admin/login","/design-system"]){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.match(r.headers.get("content-security-policy")??"",/nonce-/)}const admin=await fetch(base+"/admin",{redirect:"manual"});assert.equal(admin.status,307);assert.equal(admin.headers.get("location"),"/admin/login")});

test("assessment writes canonical score and requires result token",async()=>{const r=await post("/api/interest",{profile,answers},"203.0.113.10"),body=await r.text();assert.equal(r.status,201,body);const result=JSON.parse(body);assert.equal(result.top,"creative");assert.ok(result.token);const without=await fetch(`${base}/api/interest?id=${result.id}`);assert.equal(without.status,403);const wrong=await fetch(`${base}/api/interest?id=${result.id}&token=wrong`);assert.equal(wrong.status,403);const valid=await fetch(`${base}/api/interest?id=${result.id}&token=${encodeURIComponent(result.token)}`);assert.equal(valid.status,200);const loaded=await valid.json();assert.equal(loaded.studentName,profile.studentName);assert.equal("phone" in loaded,false);assert.equal("parentName" in loaded,false)});

test("assessment rejects manipulation and malformed identifiers",async()=>{for(const payload of [answers.map((a,i)=>i? a:{...a,weights:{creative:99}}),answers.map((a,i)=>i? a:{...a,answerId:"bad"}),answers.map((a,i)=>i? a:{...a,questionId:"bad"}),answers.slice(0,-1)]){const r=await post("/api/interest",{profile:{...profile,phone:"081234567891"},answers:payload});assert.equal(r.status,400)}});

test("consultation validates topic and phone then stores a valid request",async()=>{const good=await post("/api/consultation",{...profile,phone:"081234567892",topic:"Program",message:"Mohon informasi."},"203.0.113.20");assert.equal(good.status,201,await good.text());const topic=await post("/api/consultation",{...profile,phone:"081234567893",topic:"Unknown",message:""});assert.equal(topic.status,400);const phone=await post("/api/consultation",{...profile,phone:"123",topic:"Program",message:""});assert.equal(phone.status,400)});

test("lead validates enums and stores legitimate submission",async()=>{const good=await post("/api/leads",{...profile,phone:"081234567894",interestLevel:"Sangat tertarik"},"203.0.113.30");assert.equal(good.status,201,await good.text());const invalid=await post("/api/leads",{...profile,phone:"081234567895",interestLevel:"Unknown"});assert.equal(invalid.status,400)});

test("public endpoint burst reaches threshold and resets only after window",async()=>{const ip="203.0.113.40";for(let i=0;i<10;i++){const r=await post("/api/consultation",{},ip);assert.equal(r.status,400)}const blocked=await post("/api/consultation",{},ip);assert.equal(blocked.status,429);assert.ok(Number(blocked.headers.get("retry-after"))>0)});

test("admin login has progressive brute-force protection and valid session flow",async()=>{const ip="203.0.113.50";for(let i=0;i<5;i++){const r=await post("/api/admin/login",{email:"admin@test.local",password:"wrong"},ip);assert.equal(r.status,401)}const blocked=await post("/api/admin/login",{email:"admin@test.local",password:"correct-test-password"},ip);assert.equal(blocked.status,429);const valid=await post("/api/admin/login",{email:"admin@test.local",password:"correct-test-password"},"203.0.113.51");assert.equal(valid.status,200,await valid.text());const cookie=(valid.headers.get("set-cookie")??"").split(";")[0];assert.match(cookie,/^ni_admin=/);const admin=await fetch(base+"/admin",{headers:{cookie}});assert.equal(admin.status,200);const logout=await fetch(base+"/api/admin/logout",{method:"POST",headers:{cookie},redirect:"manual"});assert.equal(logout.status,303)});

test("malformed admin login remains generic",async()=>{const r=await post("/api/admin/login",{email:"not-an-email",password:""});assert.equal(r.status,401);assert.deepEqual(await r.json(),{error:"Email atau kata sandi tidak sesuai."})});
