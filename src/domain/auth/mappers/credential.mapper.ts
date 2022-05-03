import { ICredential } from '../intefaces/credential.interface';
import { CredentialEntity } from '../entity/credential.entity';

export class CredentialMapper {
  toEntity(credentials: ICredential): CredentialEntity {
    return new CredentialEntity(
      credentials.id,
      credentials.login,
      credentials.password,
      credentials.role,
      );
  }

  toRow(credentials: CredentialEntity): ICredential {
    return {
      id: credentials.getID,
      login: credentials.getLogin,
      password: credentials.getPassword,
      role: credentials.getRole,
    };
  }
}
