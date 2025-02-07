import mongoose, { Schema, Document } from 'mongoose';

interface IOnboardingTest extends Document {
  userId: Schema.Types.ObjectId;
  score: number;
  dateTaken: Date;
}

const onboardingTestSchema = new Schema<IOnboardingTest>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  dateTaken: { type: Date, default: Date.now }
});

const OnboardingTest = mongoose.model<IOnboardingTest>('OnboardingTest', onboardingTestSchema);

export default OnboardingTest;
