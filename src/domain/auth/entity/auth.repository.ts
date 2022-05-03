import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../intefaces/auth.repository.interface';
import { CredentialMapper } from '../mappers/credential.mapper';
import { ICredential } from '../intefaces/credential.interface';
import { CredentialEntity } from './credential.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: CredentialMapper,
  ) {}

  async createCredential(credentials: ICredential): Promise<CredentialEntity> {
    const sql = `INSERT INTO credentials (id, login, password, role) 
                 VALUES ($1, $2, $3, $4);`;
    await this.pool.query(sql, [
      credentials.id,
      credentials.login,
      credentials.password,
      credentials.role,
    ]);
    return this.mapper.toEntity(credentials);
  }

  async getCredential(login: string): Promise<CredentialEntity> {
    const sql = `SELECT * FROM credentials WHERE login = $1;`;
    const { rows } = await this.pool.query(sql, [login]);
    const [credentials] = rows;
    return this.mapper.toEntity(credentials);
  }

  async deleteCredential(id: string): Promise<void> {
    const sql = `DELETE FROM credentials WHERE id = $1;`;
    await this.pool.query(sql, [id]);
  }
}
