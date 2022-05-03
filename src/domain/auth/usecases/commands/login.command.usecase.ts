import { LoginFormDto } from "../../dto/form/login.form.dto";

export class LoginCommandUsecase {
  login: string;

  password: string;

  constructor(form: LoginFormDto) {
    this.login = form.login;
    this.password = form.password;
  }
}
