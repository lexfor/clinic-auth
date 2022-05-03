import { CredentialEntity } from '../entity/credential.entity';
import { ICredential } from './credential.interface';

export interface IAuthRepository {
  createCredential: (credentials: ICredential) => Promise<CredentialEntity>;
  getCredential: (login: string) => Promise<CredentialEntity>;
  deleteCredential: (id: string) => Promise<void>;
}
