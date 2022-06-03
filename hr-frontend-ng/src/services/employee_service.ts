import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../model/employee";
import {Observable} from "rxjs";

export class EmployeeStatusResponse {
  constructor(public status : string){}
}

@Injectable()
export class EmployeeService {
  private baseUrl = 'http://localhost:4001';
  constructor(private http : HttpClient){
    console.log('EmployeeService is created!');
  }

  findAllEmployees() : Observable<Array<Employee>>{
        return this.http
          .get<Array<Employee>>(
            this.baseUrl.concat("/employees"));
  }
  findEmployee(identityNo: string) : Observable<Employee> {
    return this.http
      .get<Employee>(
        this.baseUrl + "/employees/"+identityNo);
  }
  removeEmployee(identityNo: string) : Observable<Employee> {
    return this.http
      .delete<Employee>(
        this.baseUrl + "/employees/"+identityNo);
  }
  addEmployee(emp : Employee)
         : Observable<EmployeeStatusResponse> {
      return this.http
        .post<EmployeeStatusResponse>(
          this.baseUrl + "/employees" , emp);
  }
  updateEmployee(emp : Employee)
         : Observable<EmployeeStatusResponse> {
      return this.http
        .put<EmployeeStatusResponse>(
          this.baseUrl + "/employees" , emp);
  }
};
