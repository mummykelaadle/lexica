interface IWordPromise {
  word: string;
  meanings: Promise<string>[];
  synonyms: Promise<string>[];
  antonyms: Promise<string>[];
  exampleSentences: Promise<string>[];
  difficulty: Promise<number>;
}

export default IWordPromise;

