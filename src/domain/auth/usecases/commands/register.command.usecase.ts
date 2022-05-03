import { RegisterFormDto } from '../../dto/form/register.form.dto';

export class RegisterCommandUsecase {
  login: string;

  password: string;

  firstName: string;

  lastName: string;

  birthday: string;

  address: string;

  gender: string;

  constructor(form: RegisterFormDto) {
    this.login = form.login;
    this.password = form.password;
    this.firstName = form.firstName;
    this.lastName = form.lastName;
    this.birthday = form.birthday;
    this.address = form.address;
    this.gender = form.gender;
  }
}
