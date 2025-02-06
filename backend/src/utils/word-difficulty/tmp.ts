import { calculateWordDifficulty } from "./getWordDifficulty";

calculateWordDifficulty('apple').then((score:number)=>{
    console.log(score);
})

