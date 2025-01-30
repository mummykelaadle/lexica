import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  pages: Schema.Types.ObjectId[];
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }]
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;


