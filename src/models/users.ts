export class Users {
  public _id?: number;
  public f_name: string;
  public l_name: string;
  public email: string;
  public password?: string;
  public user_type: number;
  public mobile: string;
  public country: string;
  public language: string;

  constructor(
    _id: number,
    f_name: string,
    l_name: string,
    email: string,
    password: string,
    user_type: number,
    mobile: string,
    country: string,
    language: string
  ) {
    this._id = _id;
    this.f_name = f_name;
    this.l_name = l_name;
    this.email = email;
    this.password = password;
    this.user_type = user_type;
    this.mobile = mobile;
    this.country = country;
    this.language = language;
  }
}
