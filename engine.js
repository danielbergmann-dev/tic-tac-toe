export const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export const pool=p=>p===1?[1,3,5,7,9]:[2,4,6,8];
export const winning=b=>LINES.filter(l=>l.every(i=>b[i]!==0)&&l.reduce((s,i)=>s+b[i],0)===15);
export function moves(b,p){return pool(p).filter(n=>!b.includes(n)).flatMap(n=>b.flatMap((v,i)=>v?[]:[{i,n}]));}
export function chooseMove(board,level='medium'){
 const b=[...board],all=moves(b,1);if(!all.length)return null;
 const wins=all.filter(m=>{b[m.i]=m.n;const w=winning(b).length;b[m.i]=0;return w});if(wins.length)return wins[Math.floor(Math.random()*wins.length)];
 if(level==='easy'&&Math.random()<.6)return all[Math.floor(Math.random()*all.length)];
 const limit=level==='hard'?5:level==='medium'?3:1;let nodes=0;const cap=level==='hard'?220000:70000;
 function search(p,depth,alpha,beta){nodes++;if(!b.includes(0))return 0;if(depth===0||nodes>cap)return 0;let best=-1000;const mm=moves(b,p);if(!mm.length)return -search(1-p,depth,-beta,-alpha);for(const m of mm){b[m.i]=m.n;const win=winning(b).length;const val=win?100+depth:-search(1-p,depth-1,-beta,-alpha);b[m.i]=0;if(val>best)best=val;alpha=Math.max(alpha,val);if(alpha>=beta||win)break}return best===-1000?0:best}
 // Evaluate every candidate equally; first filter any move that gives an immediate win away.
 const safe=all.filter(m=>{b[m.i]=m.n;const bad=moves(b,0).some(r=>{b[r.i]=r.n;const w=winning(b).length;b[r.i]=0;return w});b[m.i]=0;return !bad});
 const candidates=safe.length?safe:all;let best=-Infinity,choices=[];
 for(const m of candidates){nodes=0;b[m.i]=m.n;let score=-search(0,limit-1,-1000,1000);b[m.i]=0;if(score>best){best=score;choices=[m]}else if(score===best)choices.push(m)}
 return choices[Math.floor(Math.random()*choices.length)];
}
