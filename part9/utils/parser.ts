interface Arguments {
  target: number;
  dailyExerciseHours: number[];
  calculatedTime: number;
  daysNumber: number;
}
const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  //getting values from the CLI, command npm run calc 2 1 0 2 4.5 0 3 1 0 4,
  //where the first argument is the target value
  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map((e) => Number(e));
  const daysNumber = dailyExerciseHours.length;
  const calculatedTime =
    dailyExerciseHours.reduce((accumulator, currentValue) => {
      //   console.log("dailyExerciseHours", dailyExerciseHours);
      //   console.log("args[0]& args[1]", args[0], args[1]);
      return accumulator + currentValue;
    }, 0) / daysNumber;
  if (!isNaN(target) && dailyExerciseHours.filter((e) => !isNaN(e))) {
    return {
      target: target,
      dailyExerciseHours: dailyExerciseHours,
      calculatedTime: calculatedTime,
      daysNumber: daysNumber,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
export default parseArguments;
