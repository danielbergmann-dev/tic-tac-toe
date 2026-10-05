import {chooseMove} from './engine-removal.js?v=lock1';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:chooseMove(data.board,data.level,data.rights,data.locks)})}catch{self.postMessage({id:data.id,error:true})}};
