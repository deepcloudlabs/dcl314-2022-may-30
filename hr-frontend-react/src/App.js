import React, {Component} from 'react';
import './App.css';
import {Employee} from "./model/employee";

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            totalSalary: NaN,
            averageSalary: NaN,
            employee: new Employee()
        }
        this.findAll = this.findAll.bind(this);
        this.findEmployee = this.findEmployee.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.getJson = this.getJson.bind(this);
        this.readPhoto = this.readPhoto.bind(this);
    }

    getJson() {
        return JSON.stringify(this.state.employee);
    }

    addEmployee() {
        fetch('http://localhost:4001/employees',
            {
                method: 'post', body: this.getJson(), headers: {
                    "Accept": "application/json", "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => this.findAll());
    }

    updateEmployee() {
        fetch('http://localhost:4001/employees', {
            method: 'put', body: this.getJson(), headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => this.findAll());
    }

    removeEmployee() {
        fetch('http://localhost:4001/employees/' + this.state.employee.identityNo, {method: 'delete'})
            .then(emp => emp.json())
            .then(emp => {
                this.setState({employee: emp});
                this.findAll();
            });
    }

    removeRow(emp) {
        fetch('http://localhost:4001/employees/' + emp.identityNo, {method: 'delete'})
            .then(e => e.json())
            .then(e => {
                this.setState({employee: e})
                this.findAll();
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let emp = this.state.employee;
        emp[name] = value;
        this.setState({
            employee: emp
        });
    }

    findEmployee() {
        fetch('http://localhost:4001/employees/' + this.state.employee.identityNo)
            .then(emp => emp.json())
            .then(emp => this.setState({employee: emp}))
    }

    findAll() {
        fetch('http://localhost:4001/employees')
            .then(employees => employees.json())
            .then(employees => {
                let totalSalary = employees.reduce((sum, emp) => sum + Number(emp.salary), 0);
                let averageSalary = totalSalary / employees.length;
                this.setState({employees: employees, totalSalary: totalSalary, averageSalary: averageSalary});
            });
    }

    readPhoto(files) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.state.employee.photo = e.target.result;
            this.setState({employee: this.state.employee});
        };
        reader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <div>
                <p></p>
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="panel-title">Employee Panel</h3>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label htmlFor="identityNo">Identity No</label>
                                <input type="text" id="identityNo"
                                       onChange={this.handleChange}
                                       name="identityNo"
                                       value={this.state.employee.identityNo}
                                       className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullName">Fullname</label>
                                <input type="text" id="fullName"
                                       value={this.state.employee.fullname}
                                       name="fullname"
                                       onChange={this.handleChange}
                                       className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor=" salary">Salary</label>
                                <input type="text" id="salary"
                                       name="salary"
                                       onChange={this.handleChange}
                                       value={this.state.employee.salary}
                                       className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthYear">Birth Year</label>
                                <input type=" text" id="birthYear"
                                       name="birthYear"
                                       onChange={this.handleChange}
                                       value={this.state.employee.birthYear}
                                       className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="iban">IBAN</label>
                                <input type="text" id="iban"
                                       name="iban"
                                       onChange={this.handleChange}
                                       value={this.state.employee.iban}
                                       className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <select id="department"
                                        onChange={this.handleChange}
                                        name="department"
                                        value={this.state.employee.department}
                                        className="form-control">
                                    <option>IT</option>
                                    <option>Finance</option>
                                    <option>Sales</option>
                                    <option>HR</option>
                                </select>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="photo">Photo</label>
                                <img id="photoImage"
                                     alt={''}
                                     src={this.state.employee.photo}
                                     className="photo"></img>
                                <label className="btn btn-info btn-file">
                                    <input type="file"
                                           id="photo"
                                           onChange={(e) => this.readPhoto(e.target.files)}
                                           className="hide"></input>
                                    <span>Browse</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <button onClick={this.addEmployee}
                                        className="btn btn-info">Add
                                </button>
                                <button onClick={this.updateEmployee}
                                        className="btn btn-warning">Update
                                </button>
                                <button onClick={this.removeEmployee}
                                        className="btn btn-danger">Remove
                                </button>
                                <button onClick={this.findEmployee}
                                        className="btn btn-success">Find
                                </button>
                                <button onClick={this.findAll}
                                        className="btn btn-success">Find All
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="panel-title">Employees</h3>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table table-responsive">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Photo</th>
                                    <th>Identity No</th>
                                    <th>Full name</th>
                                    <th>Salary</th>
                                    <th>Iban</th>
                                    <th>Department</th>
                                    <th>Birth Year</th>
                                    <th>Operations</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.employees.map(
                                    (emp, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><img src={emp.photo}
                                                     alt={''}
                                                     className="circularphoto"></img></td>
                                            <td>{emp.identityNo}</td>
                                            <td>{emp.fullname}</td>
                                            <td>{emp.salary}</td>
                                            <td>{emp.iban}</td>
                                            <td>{emp.department}</td>
                                            <td>{emp.birthYear}</td>
                                            <td>
                                                <button onClick={() => this.removeRow(emp)}
                                                        className="btn btn-danger">Delete
                                                </button>
                                            </td>
                                        </tr>
                                )}
                                <tr>
                                    <td colSpan={3}></td>
                                    <td>Total Salary:</td>
                                    <td colSpan={5}>{this.state.totalSalary.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}></td>
                                    <td>Average Salary:</td>
                                    <td colSpan={5}>{this.state.averageSalary.toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;