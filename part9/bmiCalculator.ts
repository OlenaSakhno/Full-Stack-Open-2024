type Result = number | string;
const calculateBmi = (height: number, weight: number): Result => {
  return weight / (height*height);
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(`result: ${calculateBmi(height, weight)}`);
