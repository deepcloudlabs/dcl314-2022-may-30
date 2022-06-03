class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        })
        this.totalSalary = ko.computed(() => {
            return this.employees().map(emp => emp.salary).reduce((x, y) => x + y, 0);
        })
        this.averageSalary = ko.computed(() => {
            if (this.employees().length === 0) return "N/A";
            return this.totalSalary() / this.employees().length;
        })
        const ws_client = io("ws://localhost:8100");
        ws_client.on("connect", () => {
            showInfoMessage("connected to the server.");
            ws_client.on("hr-events", event => {
                this.findAll();
            })
        });
    }
    insertFile(e, data) {
        e.preventDefault();
        var files = e.target.files || e.originalEvent.dataTransfer.files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.fileData().dataUrl(event.target.result);
        };
    };

    dragover(e) {
        e.preventDefault();
    };
    hireEmployee = () => {
        this.employee.photo(toRawImage(this.fileData().dataUrl()));
        fetch(`${AppConfig.BASE_URL}/employees`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: ko.toJSON(this.employee)
            }).then(res => res.json())
            .then(res => showInfoMessage("Employee is hired! "+JSON.stringify(res)));
    }
    updateEmployee = () => {
        this.employee.photo(toRawImage(this.fileData().dataUrl()));
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: ko.toJSON(this.employee)
            }).then(res => res.json())
            .then(res => showInfoMessage("Employee is updated! "+JSON.stringify(res)));
    }
    fireEmployee = () => {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                }
            }).then(res => res.json())
            .then(res => showInfoMessage("Employee is fired! "+JSON.stringify(res)));
    }
    findEmployeeByIdentity = () => {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            }).then(res => res.json())
            .then(emp => {
                this.employee.update(emp);
                this.fileData().dataUrl(toSrcImage(emp.photo));
            }
        );
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
    initializeToastr({
        timeOut: 3000,
        closeDuration: 500,
        closeEasing: 'swing',
        progressBar: true,
        preventDuplicates: true,
        closeButton: true,
        positionClass: 'toast-top-center'

    });
    ko.applyBindings(hrViewModel);
}