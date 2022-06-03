export class Employee {
  constructor(
    public identityNo: string,
    public fullname: string,
    public iban: string,
    public salary: number,
    public birthYear: number,
    public department: string,
    public fulltime: boolean,
    public photo: string){ }
};
