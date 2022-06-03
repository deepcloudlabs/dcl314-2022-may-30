export class GameStatistics {
    constructor() {
        this.wins = ko.observable(0);
        this.loses = ko.observable(0);
        this.total = ko.computed(() => {
            return this.wins() + this.loses()
        });
    }

    playerWins = () => {
        this.wins(this.wins()+1);
    }
    playerLoses = () => {
        this.loses(this.loses()+1);
    }
}