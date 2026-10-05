export const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export const pool=p=>p===1?[1,3,5,7,9]:[2,4,6,8];
export const winning=b=>LINES.filter(l=>l.every(i=>b[i]!==0)&&l.reduce((s,i)=>s+b[i],0)===15);
export function moves(b,p,rights=[false,false],locks=[null,null]){
 const placements=pool(p).filter(n=>!b.includes(n)&&n!==locks[p]).flatMap(n=>b.flatMap((v,i)=>v?[]:[{i,n}]));
 return rights[p]?placements.concat(b.flatMap((n,i)=>n&&n%2!==p?[{i,n:0,remove:true}]:[])):placements;
}
// A forced pass consumes the blocked player's next turn and releases the number.
export function nextPlayer(b,p,rights,locks=[null,null]){
 let next=1-p;
 for(let pass=0;pass<3;pass++){
  if(moves(b,next,rights,locks).length)return next;
  locks[next]=null;next=1-next;
 }
 return next;
}
export function play(b,p,m,rights,locks){
 const removed=b[m.i];b[m.i]=m.n;locks[p]=null;
 if(m.remove){rights[p]=false;locks[1-p]=removed;}
 return winning(b).length||!b.includes(0)?1-p:nextPlayer(b,p,rights,locks);
}
export function chooseMove(board,level='medium',rights=[false,false],locks=[null,null]){
 const b=[...board],r=[...rights],l=[...locks],all=moves(b,1,r,l);if(!all.length||winning(b).length||!b.includes(0))return null;
 function withMove(m,p,fn){const old=b[m.i],savedR=[...r],savedL=[...l];const next=play(b,p,m,r,l);try{return fn(next)}finally{b[m.i]=old;r.splice(0,2,...savedR);l.splice(0,2,...savedL)}}
 const wins=all.filter(m=>withMove(m,1,()=>winning(b).length));if(wins.length)return wins[Math.floor(Math.random()*wins.length)];
 if(level==='easy'&&Math.random()<.6)return all[Math.floor(Math.random()*all.length)];
 const limit=level==='hard'?5:level==='medium'?3:1;let nodes=0;const cap=level==='hard'?25000:8000;
 function search(p,depth,alpha,beta){
  if(!b.includes(0)||depth===0||++nodes>cap)return 0;
  const mm=moves(b,p,r,l);if(!mm.length)return 0;
  let best=p===1?-1000:1000;
  for(const m of mm){const score=withMove(m,p,next=>winning(b).length?(p===1?100+depth:-100-depth):search(next,depth-1,alpha,beta));
   if(p===1){best=Math.max(best,score);alpha=Math.max(alpha,best)}else{best=Math.min(best,score);beta=Math.min(beta,best)}
   if(alpha>=beta)break;
  }return best;
 }
 const safe=all.filter(m=>withMove(m,1,next=>next===1||!moves(b,0,r,l).some(reply=>withMove(reply,0,()=>winning(b).length))));
 let best=-Infinity,choices=[];
 for(const m of safe.length?safe:all){nodes=0;const score=withMove(m,1,next=>search(next,limit-1,-1000,1000));if(score>best){best=score;choices=[m]}else if(score===best)choices.push(m)}
 return choices[Math.floor(Math.random()*choices.length)];
}
