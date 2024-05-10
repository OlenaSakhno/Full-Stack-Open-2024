import express from "express";
import patients from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patients.getPatients());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
