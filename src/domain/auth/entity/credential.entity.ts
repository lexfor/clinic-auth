import { ApiProperty } from '@nestjs/swagger';

export class CredentialEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly login: string;
  @ApiProperty()
  private readonly password: string;
  @ApiProperty()
  private readonly role: string;

  constructor(id, login, password, role) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.role = role;
  }

  get getID(): string {
    return this.id;
  }

  get getLogin(): string {
    return this.login;
  }

  get getPassword(): string {
    return this.password;
  }

  get getRole(): string {
    return this.role;
  }
}
