import {chooseMove} from './engine.js';self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:chooseMove(data.board,data.level)})}catch{self.postMessage({id:data.id,error:true})}};
