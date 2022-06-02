class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([])
        this.totalSalary = ko.computed(() => {
            return this.employees().map(emp => emp.salary).reduce((x, y) => x + y, 0);
        })
        this.averageSalary = ko.computed(() => {
            if (this.employees().length === 0) return "N/A";
            return this.totalSalary() / this.employees().length;
        })
    }

    hireEmployee = () => {
        fetch(`${AppConfig.BASE_URL}/employees`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: ko.toJSON(this.employee)
            }).then(res => res.json())
            .then(res => alert(JSON.stringify(res)));
    }
    updateEmployee = () => {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: ko.toJSON(this.employee)
            }).then(res => res.json())
            .then(res => alert(JSON.stringify(res)));
    }
    fireEmployee = () => {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                }
            }).then(res => res.json())
            .then(res => alert(JSON.stringify(res)));
    }
    findEmployeeByIdentity = () => {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            }).then(res => res.json())
            .then(emp => this.employee.update(emp));
    }
    findAll = () => {
        fetch(`${AppConfig.BASE_URL}/employees`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            }).then(res => res.json())
            .then(employees => this.employees(employees));
    }
}

const hrViewModel = new HrViewModel();
window.onload = () => {
    ko.applyBindings(hrViewModel);
}