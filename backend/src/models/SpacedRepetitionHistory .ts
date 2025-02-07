// models/spacedRepetitionHistory.ts
import mongoose, { Schema, Document } from "mongoose";

interface ISpacedRepetitionHistory extends Document {
  userId: string;
  wordId: mongoose.Schema.Types.ObjectId;
  mistakeCount: number;
  lastTestedAt: Date;
}

const spacedRepetitionHistorySchema = new Schema<ISpacedRepetitionHistory>({
  userId: { type: String, required: true, index: true },
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
  mistakeCount: { type: Number, default: 1 },
  lastTestedAt: { type: Date, default: Date.now },
});

const SpacedRepetitionHistory = mongoose.model<ISpacedRepetitionHistory>("SpacedRepetitionHistory", spacedRepetitionHistorySchema);

export default SpacedRepetitionHistory;
