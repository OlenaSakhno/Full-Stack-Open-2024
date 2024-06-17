import patientListData from "../../data/patients";
import { NonSsnPatient, NonIdPatient, Patient } from "../types";
import { v4 as uuid } from "uuid";

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

const addPatient = (newPatient: NonIdPatient) => {
  const id = uuid();
  const addNewPatient = { id, ...newPatient };
  patientListData.push(addNewPatient);
  return addNewPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientListData.find((d) => d.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  findById,
};
