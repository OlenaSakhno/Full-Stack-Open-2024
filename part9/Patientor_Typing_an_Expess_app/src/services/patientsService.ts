import patientListData from "../../data/patients";
import { NonSsnPatient } from "../types";

const getPatients = (): NonSsnPatient[] => {
  return patientListData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
};
