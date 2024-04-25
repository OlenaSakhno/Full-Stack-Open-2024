interface Result {
  daysNumber: number;
  trainingDaysNumber: number;
  originalTargetValue: number;
  calculatedAverageTime: number;
  isTargetWasReached: boolean;
  rating: 1 | 2 | 3;
  ratingExplanation: string;
}

const calculateExercises = (
  targetStr: number | string,
  dailyExerciseHoursStr: number[] | string[]
): Result => {
  const target = Number(targetStr);
  const daysNumber = dailyExerciseHoursStr.length;
  const dailyExerciseHours = dailyExerciseHoursStr.map((e) => Number(e));
  const calculatedTime =
    dailyExerciseHours.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0) / daysNumber;
  if (isNaN(target) && dailyExerciseHours.filter((e) => isNaN(e)))
    throw new Error("Provided values were not numbers!");
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

export default calculateExercises;
