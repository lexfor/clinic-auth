import { RegisterDoctorFormDto } from "../../dto/form/register-doctor.form.dto";

export class RegisterDoctorCommandUsecase {
  login: string;

  password: string;

  firstName: string;

  lastName: string;

  birthday: string;

  address: string;

  gender: string;

  cabinet: string;

  position: string;

  specializationID: string;

  constructor(form: RegisterDoctorFormDto) {
    this.login = form.login;
    this.password = form.password;
    this.firstName = form.firstName;
    this.lastName = form.lastName;
    this.birthday = form.birthday;
    this.address = form.address;
    this.gender = form.gender;
    this.cabinet = form.cabinet;
    this.position = form.position;
    this.specializationID = form.specializationID;
  }
}
