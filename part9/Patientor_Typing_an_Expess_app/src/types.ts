export interface Diagnoses {
  code: String;
  name: String;
  latin?: String;
}
export interface Patient {
  id: String;
  name: String;
  dateOfBirth: String;
  ssn: String;
  gender: String;
  occupation: String;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NonSsnPatient = Omit<Patient, "ssn">;
export type NonIdPatient = Omit<Patient, "id">;
