import {MastermindViewModel} from "./mastermind.js";

let mastermindViewModel = new MastermindViewModel();
window.onload = () => {
    ko.applyBindings(mastermindViewModel);
}
