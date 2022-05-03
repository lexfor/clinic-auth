export class DeleteCredentialsCommandUsecase {
  actionID: string;

  credentialID: string;

  constructor(actionID, credentialID) {
    this.actionID = actionID;
    this.credentialID = credentialID;
  }
}
