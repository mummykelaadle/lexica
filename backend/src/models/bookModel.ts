import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  ownerId: string
  title: string;
  pages: Schema.Types.ObjectId[];
  progress: number;  // This field tracks progress (0 to 100)
  currentPage: Schema.Types.ObjectId;  // Optionally track current page being read
  coverUrl: string;
}

const bookSchema = new Schema<IBook>({
  ownerId: { type: String, required: true },
  title: { type: String, required: true },
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
  progress: { type: Number, default: 0, min: 0, max: 100 },  // Percentage of progress
  currentPage: { type: Schema.Types.ObjectId, ref: 'Page' },  // Optionally track the current page
  coverUrl: { type: String }, // URL of the cover image, (at cloudinary)
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
