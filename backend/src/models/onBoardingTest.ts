import mongoose, { Schema, Document } from 'mongoose';

interface IOnboardingTest extends Document {
  userId: String;
  score: number;
  dateTaken: Date;
}

const onboardingTestSchema = new Schema<IOnboardingTest>({
  userId: { type: String,required: true },
  score: { type: Number, required: true },
  dateTaken: { type: Date, default: Date.now }
});

const OnboardingTest = mongoose.model<IOnboardingTest>('OnboardingTest', onboardingTestSchema);

export default OnboardingTest;
