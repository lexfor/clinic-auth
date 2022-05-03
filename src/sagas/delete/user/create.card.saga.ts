import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { DeleteCredentialEvent } from './events';
import {
  DeleteCredentialsCommandUsecase
} from "../../../domain/auth/usecases/commands/delete-credentials.command.usecase";

export class DeleteCredentialSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(DeleteCredentialEvent),
      map(
        (event: DeleteCredentialEvent) =>
          new DeleteCredentialsCommandUsecase(event.actionID, event.credentialID),
      ),
    );
  }
}
