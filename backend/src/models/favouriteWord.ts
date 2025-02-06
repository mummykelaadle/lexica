import mongoose from "mongoose";

const FavouriteWordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  wordEntries: [
    {
      wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});


const FavouriteWord =  mongoose.model("FavouriteWord", FavouriteWordSchema);
export default FavouriteWord