export const scoreKeys=["creative","video","photo","technology","coding","business"] as const;
export type ScoreKey=(typeof scoreKeys)[number];
export type WeightedAnswer={id:string;weights:Partial<Record<ScoreKey,number>>};
export function computeScores(answers:WeightedAnswer[]){const raw:Record<ScoreKey,number>={creative:0,video:0,photo:0,technology:0,coding:0,business:0};for(const answer of answers){for(const key of scoreKeys){const value=answer.weights?.[key];if(typeof value==="number")raw[key]+=Math.max(0,Math.min(3,value))}}const scores=Object.fromEntries(scoreKeys.map(key=>[key,Math.round(raw[key]/30*100)])) as Record<ScoreKey,number>;const ranking=scoreKeys.slice().sort((a,b)=>scores[b]-scores[a]);return {scores,top:ranking[0],second:ranking[1]}}
