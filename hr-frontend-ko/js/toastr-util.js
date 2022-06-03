var showMessage = function (level, message) {
    toastr[level](message);
}

var showErrorMessage = function (message) {
    toastr.error(message);
}

var showWarningMessage = function (message) {
    toastr.warning(message);
}

var showSuccessMessage = function (message) {
    toastr.success(message);
}

var showInfoMessage = function (message) {
    toastr.info(message);
}

var initializeToastr = function (opts) {
    for (let o in opts) {
        toastr.options[o] = opts[o];
    }
}