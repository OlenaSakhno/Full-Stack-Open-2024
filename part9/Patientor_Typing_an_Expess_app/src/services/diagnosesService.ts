import diagnosesData from "../../data/diagnoses";
import { Diagnoses } from "../types";

const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses,
};
