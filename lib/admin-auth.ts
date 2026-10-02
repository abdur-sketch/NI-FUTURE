import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE="ni_admin";
function secret(){const value=process.env.ADMIN_SESSION_SECRET;if(!value)throw new Error("ADMIN_SESSION_SECRET is not configured");return value}
function sign(payload:string){return createHmac("sha256",secret()).update(payload).digest("base64url")}
function equal(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
export function credentialsMatch(email:string,password:string){const expectedEmail=process.env.ADMIN_EMAIL??"",expectedPassword=process.env.ADMIN_PASSWORD??"";return Boolean(expectedEmail&&expectedPassword)&&equal(email.toLowerCase(),expectedEmail.toLowerCase())&&equal(password,expectedPassword)}
export async function createAdminSession(email:string){const payload=Buffer.from(JSON.stringify({email,exp:Date.now()+1000*60*60*12})).toString("base64url");const jar=await cookies();jar.set(COOKIE,`${payload}.${sign(payload)}`,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:60*60*12})}
export async function clearAdminSession(){const jar=await cookies();jar.delete(COOKIE)}
export async function getAdminSession(){if(process.env.NODE_ENV==="development"&&!process.env.ADMIN_PASSWORD)return {email:"admin@local"};const raw=(await cookies()).get(COOKIE)?.value;if(!raw)return null;const [payload,signature]=raw.split(".");if(!payload||!signature||!equal(signature,sign(payload)))return null;try{const data=JSON.parse(Buffer.from(payload,"base64url").toString());return data.exp>Date.now()&&data.email===process.env.ADMIN_EMAIL?{email:data.email}:null}catch{return null}}
