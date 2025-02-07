import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import axios from "axios";

import guruji from "../assets/guruji.jpg";
import jethalal from "../assets/jethalal.jpg";
import rajat from "../assets/rajat.jpg";
import shakes from "../assets/shakes.jpg";
import shashi from "../assets/shashi.jpg";
import uday from "../assets/uday.png";
import shree from "../assets/shree.jpg";

const levelImages: { [key: string]: string } = {
  "0": rajat,
  "5": uday,
  "10": shree,
  "15": guruji,
  "20": jethalal,
  "25": shakes,
  "30": shashi,
};

const LevelBar = () => {
  const [wordCount, setWordCount] = useState<number>(0);

  interface Level {
    name: string;
    threshold: number;
  }

  const [currentLevel, setCurrentLevel] = useState<Level>({ name: "", threshold: 0 });
  const [nextLevel, setNextLevel] = useState<Level>({ name: "", threshold: 0 });
  const [progress, setProgress] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/user/level", {
          withCredentials: true,
        });
  
        if (res.data.wordCount !== undefined) {
          setWordCount(res.data.wordCount);
          setCurrentLevel(res.data.currentLevel);
          setNextLevel(res.data.nextLevel);
          setProgress(res.data.progress);
        } else {
          console.warn("No word history found. Using default values.");
          setWordCount(0);
          setCurrentLevel({ name: "NewBie", threshold: 0 });
          setNextLevel({ name: "Next Level", threshold: 5 });
          setProgress(0);
        }
      } catch (error) {
        console.error("Error fetching level data:", error);
        setWordCount(0);
        setCurrentLevel({ name: "NewBie", threshold: 0 });
        setNextLevel({ name: "Next Level", threshold: 5 });
        setProgress(0);
      }
    };
  
    fetchLevelData();
  }, []);
  
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
      {showConfetti && <Confetti />}
      <h2 className="text-xl font-bold flex items-center">
        <img
          src={levelImages[String(currentLevel.threshold)] || ""}
          alt={currentLevel.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500 shadow-md"
        />
        <span className="ml-3">{currentLevel.name}</span>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Words Learned: <strong>{wordCount}</strong>
      </p>
      <div className="w-full bg-gray-300 h-4 rounded-full mt-3">
        <div
          className="bg-blue-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs mt-2 text-gray-600 dark:text-gray-300">
      {nextLevel.threshold > wordCount
  ? `Next Level: ${nextLevel.name} (${wordCount}/${nextLevel.threshold})`
  : nextLevel.name 
    ? "You have reached the highest level!" 
    : "Start learning to reach new levels!"}

      </p>
    </div>
  );
};

export default LevelBar;
