export class User {
  constructor(public email: string, id: string,
              // tslint:disable-next-line:variable-name
              private _token: string, private _tokenExpirationDate: Date) {
  }

  get token() {
    const now = new Date();
    const tokenExpired = !this._tokenExpirationDate || now > this._tokenExpirationDate;
    if (tokenExpired) {
      return null;
    }
    return this._token;
  }

}
