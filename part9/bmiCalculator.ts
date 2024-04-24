type Result = { height: number; weight: number; bmi: number };
const calculateBmi = (height: number, weight: number): Result => {
  return {
    height,
    weight,
    bmi: weight / (height * height),
  };
};

export default calculateBmi;
