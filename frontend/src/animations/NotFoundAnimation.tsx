
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFoundAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 max-w-lg bg-white shadow-lg rounded-lg">
    <DotLottieReact
      src="https://lottie.host/c30b5840-7223-48a7-8cba-365650bc920f/Cyg0g482tA.lottie"
      loop
      autoplay
    />
     <p className="font-semibold text-gray-600 mt-4">
          No word history found. Please start adding words to your history.
        </p>
      </div>
    </div>
  );
};
export default NotFoundAnimation;