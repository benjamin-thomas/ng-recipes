export class User {
  constructor(public email: string, id: string,
              // tslint:disable-next-line:variable-name
              private _token: string, private _tokenExpirationDate: Date) {
  }

  get validToken() {
    const now = new Date();
    const tokenExpired = !this._tokenExpirationDate || now > this._tokenExpirationDate;
    if (tokenExpired) {
      return null;
    }
    return this._token;
  }

  timeUntilExpirationMS(): number {
    const now = new Date();
    return this._tokenExpirationDate.getTime() - now.getTime();
  }
}
