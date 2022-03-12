export class Trans {
  public _id: number;
  public mobile: string;
  public operator: string;
  public country: string;
  public plan_name: string;
  public plan_value: string;
  public Internet_details: string;
  public talk_value: string;
  public validity: string;
  public plan_details: string;
  public plan_id: string;
  public status: string;
  public requestBy: string;
  public processedBy: string;
  public requestOn: string;
  public processOn: string;

  constructor(
    _id: number,
    mobile: string,
    operator: string,
    country: string,
    plan_name: string,
    plan_value: string,
    Internet_details: string,
    talk_value: string,
    validity: string,
    plan_details: string,
    plan_id: string,
    status: string,
    requestBy: string,
    processedBy: string,
    requestOn: string,
    processOn: string
  ) {
    this._id = _id;
    this.mobile = mobile;
    this.operator = operator;
    this.country = country;
    this.plan_name = plan_name;
    this.plan_value = plan_value;
    this.Internet_details = Internet_details;
    this.talk_value = talk_value;
    this.validity = validity;
    this.plan_details = plan_details;
    this.plan_id = plan_id;
    this.status= status;
    this.requestBy = requestBy;
    this.processedBy = processedBy;
    this.requestOn = requestOn;
    this.processOn = processOn;
  }
}
