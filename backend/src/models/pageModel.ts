import mongoose, { Schema, Document } from 'mongoose';

interface IPage extends Document {
  pageNumber: number;
  words: Schema.Types.ObjectId[];
}

const pageSchema = new Schema<IPage>({
  pageNumber: { type: Number, required: true },
  words: [{ type: Schema.Types.ObjectId, ref: 'Word' }]
});

const Page = mongoose.model<IPage>('Page', pageSchema);

export default Page;


