import mongoose, { Schema, Document } from 'mongoose';

interface IWord extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  word: string;
  meanings: string[];
  synonyms: string[];
  antonyms: string[];
  exampleSentences: string[];
  difficulty: number;
}

const wordSchema = new Schema<IWord>({
  word: { type: String, required: true, unique: true },
  meanings: { type: [String], required: true },
  synonyms: { type: [String], default: [] },
  antonyms: { type: [String], default: [] },
  exampleSentences: { type: [String], default: [] },
  difficulty: { type: Number, required: true, min: 0, max: 1 }
});

const Word = mongoose.model<IWord>('Word', wordSchema);

export default Word;

