import parseArguments from "./utils/parser";

interface Result {
  daysNumber: number;
  trainingDaysNumber: number;
  originalTargetValue: number;
  calculatedAverageTime: number;
  isTargetWasReached: Boolean;
  rating: 1 | 2 | 3;
  ratingExplanation: String;
}

const calculateExercises = (): Result => {
  const { target, dailyExerciseHours, calculatedTime, daysNumber } =
    parseArguments(process.argv);
  return {
    daysNumber: daysNumber,
    trainingDaysNumber: dailyExerciseHours.filter((h) => h > 0).length,
    originalTargetValue: target,
    calculatedAverageTime: calculatedTime,
    isTargetWasReached: calculatedTime >= target,
    rating: calculatedTime > target * 1.2 ? 3 : calculatedTime < target ? 1 : 2,
    ratingExplanation: "1-not too bed, 2 - good, 3 excellent (>20% exceeds) ",
  };
};

console.dir(calculateExercises());
