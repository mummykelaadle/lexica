import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <DotLottieReact
        src="https://lottie.host/5de3ed97-14ef-4de6-aa17-b8f0814dd47b/GvGd1N6A9P.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Spinner;
