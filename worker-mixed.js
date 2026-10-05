import {chooseMove} from './engine-mixed.js';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:chooseMove(data.board,data.level,data.rights,data.locks,data.hands)})}catch{self.postMessage({id:data.id,error:true})}};
