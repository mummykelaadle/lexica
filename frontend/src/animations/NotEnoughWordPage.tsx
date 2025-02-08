import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotEnoughWordsPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <DotLottieReact
          src="https://lottie.host/b8688722-2350-4101-9cc1-361ca10f953a/1luemYkv8H.lottie"
          loop
          autoplay
        />
        <p className="font-semibold text-primary dark:text-gray-300 mt-4">
          Not enough word history to generate a quiz. Add more words and try again.
        </p>
      </div>
    </div>
  );
};

export default NotEnoughWordsPage;
