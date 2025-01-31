import mongoose from "mongoose";

const wordHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
        unique:true,    
    },
    wordEntries: [
        {
          wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
          addedAt: { type: Date, required: true },
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
});

const WordHistory = mongoose.model("WordHistory", wordHistorySchema);

export default WordHistory;