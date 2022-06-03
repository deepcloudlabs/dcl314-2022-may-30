$(document).ready(()=>{
    let app = new Vue({
        el: '#app',
        data: {
            identityNo: "",
            fullname: "test user",
            salary: 2000,
            iban: "TR",
            birthYear: 1973,
            department: "IT",
            photo: AppConfig.NO_IMAGE,
            fulltime: true,
            employees: []
        },
        computed: {
            totalSalary : function(){
                return this.employees
                    .reduce( (sum,emp) => sum + emp.salary , 0 );
            },
            averageSalary : function(){
                return this.totalSalary / this.employees.length;
            }
        },
        created: function () {
        },
        methods: {
            findAll(){
                $.ajax({
                    method: "GET",
                    url: AppConfig.URL+"/employees",
                    cache: false,
                    success: (employees) => {
                        // this.employees(employees);
                        this.employees= employees;
                    }
                });
            } ,
            findByIdentity : function(){
                $.ajax({
                    method: "GET",
                    url: AppConfig.URL+"/employees/"+this.identityNo,
                    cache: false,
                    success: (employee) => {
                        for (let prop in employee){
                            this[prop] = employee[prop];
                        }
                    }
                });
            },
            removeEmployee : function(){
                $.ajax({
                    method: "DELETE",
                    url: AppConfig.URL+"/employees/"+this.identityNo,
                    success: (employee) => {
                        for (let prop in employee){
                            this[prop] = employee[prop];
                        }
                    }
                });
            },
            copyEmployee : function(emp) {
                for (let prop in emp){
                    if (this.hasOwnProperty(prop))
                    this[prop] = emp[prop];
                }
            },
            removeRow : function(emp,index){
                $.ajax({
                    method: "DELETE",
                    url: AppConfig.URL+"/employees/"+emp.identityNo,
                    success: (employee) => {
                        this.employees.splice(index,1);
                        for (let prop in employee){
                            if (this.hasOwnProperty(prop))
                            this[prop] = employee[prop];
                        }
                    }
                });
            },
            convertDataToJson : function(){
              return JSON.stringify({
                  identityNo: this.identityNo,
                  fullname: this.fullname,
                  salary: this.salary,
                  iban: this.iban,
                  birthYear: this.birthYear,
                  department: this.department,
                  photo: this.photo,
                  fulltime: this.fulltime
              })
            },
            addEmployee : function () {
                $.ajax({
                    method: "POST",
                    url: AppConfig.URL+"/employees",
                    contentType: "application/json",
                    data : this.convertDataToJson(),
                    success: (status) => {
                        console.log(status);
                        this.findAll();
                    }
                });
            },
            updateEmployee : function () {
                $.ajax({
                    method: "PUT",
                    url: AppConfig.URL+"/employees",
                    contentType: "application/json",
                    data : this.convertDataToJson(),
                    success: (status) => {
                        console.log(status);
                        this.findAll();
                    }
                });
            },
            processFile(e){
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.photo = e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        }
    });
});
