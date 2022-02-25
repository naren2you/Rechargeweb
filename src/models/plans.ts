export class Plan {
  public _id: number;
  public operator: string;
  public plan_name: string;
  public plan_value: string;
  public Internet_details: string;
  public talk_value: string;
  public validity: string;
  public plan_details: string;
  public othe_details: string;

  constructor(
    _id: number,
    operator: string,
    plan_name: string,
    plan_value: string,
    Internet_details: string,
    talk_value: string,
    validity: string,
    plan_details: string,
    othe_details: string
  ) {
    this._id = _id;
    this.operator = operator;
    this.plan_name = plan_name;
    this.plan_value = plan_value;
    this.Internet_details = Internet_details;
    this.talk_value = talk_value;
    this.validity = validity;
    this.plan_details = plan_details;
    this.othe_details = othe_details;
  }
}
