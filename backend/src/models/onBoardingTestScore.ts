import mongoose, { Schema, Document } from 'mongoose';

interface IOnboardingTestScore extends Document {
  userId: String;
  score: number;
  dateTaken: Date;
}

const onboardingTestScoreSchema = new Schema<IOnboardingTestScore>({
  userId: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  dateTaken: { type: Date, default: Date.now }
});

const OnboardingTestScore = mongoose.model<IOnboardingTestScore>('OnboardingTestSchema', onboardingTestScoreSchema);

export default OnboardingTestScore;
