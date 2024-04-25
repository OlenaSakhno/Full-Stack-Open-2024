import express from "express";
import bodyParser from "body-parser";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(bodyParser.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight))
    return res.status(400).send({ error: "malformatted parameters" });
  const result = calculateBmi(height, weight);
  return res.status(200).send({ result });
});

app.post("/exercises", (req, res) => {
  const target: number = Number(req.body.target);
  const daily_exercises: number[] = req.body.daily_exercises.map(
    (e: number | string) => Number(e)
  );

  if (!target || !daily_exercises.length)
    return res.status(400).send({ error: "PARAMETER MISSING" });
  if (isNaN(target) || daily_exercises.filter((e: number) => isNaN(e)).length)
    return res.status(400).send({ error: "malformatted parameters" });
  const result = calculateExercises(target, daily_exercises);
  return res.status(200).send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
