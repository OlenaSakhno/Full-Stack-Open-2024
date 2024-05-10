import express from "express";
import diagnoses from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnoses.getDiagnoses());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
