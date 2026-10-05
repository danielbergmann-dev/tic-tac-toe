import {chooseMove} from './engine-removal.js';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:chooseMove(data.board,data.level,data.rights)})}catch{self.postMessage({id:data.id,error:true})}};
