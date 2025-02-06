import React from "react";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Share } from "lucide-react";

interface ShareModalProps {
  score: number;
  total: number;
}

const ShareModal: React.FC<ShareModalProps> = ({ score, total }) => {
  const message = `I got ${score}/${total} in Lexica Quiz today! Try to beat my score! 🎉`;
  const quizURL = "http://localhost:5173/quiz"; // Replace with actual quiz URL
 
   
  const copyMessage = () => {
    navigator.clipboard.writeText(message);
    toast.success("Copied!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center m-2">
            <Share size={20} className="cursor-pointer text-gray-500 hover:text-gray-700" />
        </div>
</DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[650px] md:max-w-[620px] max-w-[400px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Share Your Score</DialogTitle>
          <DialogDescription>
            <div className="flex rounded-md border justify-between p-2 lg:p-5 md:p-4 mt-2">
              <span className="text-subtle-medium md:text-base-medium">
                {message}
              </span>
              <Copy onClick={copyMessage} className="cursor-pointer" />
            </div>
            <div className="flex items-center space-x-5 mt-5">
              {/* Facebook Share Button - Using react-share */}
              <FacebookShareButton url={quizURL} hashtag="#LexicaQuiz">
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              {/* Twitter Share Button */}
              <TwitterShareButton title={message} url={quizURL}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              {/* WhatsApp Share Button */}
              <WhatsappShareButton title={message} separator=" " url={quizURL}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

           {/* LinkedIn Share Button */}
           <LinkedinShareButton
                    url={quizURL}
                    title="Exciting Quiz!"
                    summary="Test your knowledge with this fun quiz!"
                    source={"Lexica"}
                    >
                    <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
