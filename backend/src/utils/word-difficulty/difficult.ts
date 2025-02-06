import { create } from 'difficulty';
import { Difficulty } from 'difficulty';
class Difficult {
    private ready: boolean;
    private difficult : Difficulty|null;

    constructor() {
      this.ready = false;
      this.difficult = null;
    }
  
    async init(): Promise<void> {
      //setup
      this.difficult=await create({
        levelsThreshold: [30000, 15000, 5000, 1000,1]
    });
      this.ready = true;
    }
  
    getDifficulty(word: string): number {
      if (!this.ready || !this.difficult) {
        throw new Error("Difficult class is not ready yet.");
      }
      // logic for difficulty score
      return this.difficult.getLevel(word);
    }
  }
  
  // Singleton instance (lazily initialized)
  let instance: Difficult | null = null;
  
  export async function getDifficultInstance(): Promise<Difficult> {
    if (!instance) {
      instance = new Difficult();
      await instance.init();
    }
    return instance;
  }
  