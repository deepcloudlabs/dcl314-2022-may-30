let emptyElement = (element) => {
    let node = element;
    while (element.hasChildNodes()) {
        if (node.hasChildNodes()) {
            node = node.lastChild;
        } else {
            node = node.parentNode;
            node.removeChild(node.lastChild);
        }
    }
};

let masterMindViewModel = new MastermindViewModel();
window.onload = () => {
    let playButton = document.querySelector("#play")
    let guessInputText = document.querySelector("#guess")
    let tries = document.querySelector("#tries")
    let gameLevel = document.querySelector("#gameLevel")
    let counter = document.querySelector("#counter")
    let moves = document.querySelector("#moves")
    let wins = document.querySelector("#wins")
    let loses = document.querySelector("#loses")
    let updateProgressBar = () => {
        counter.innerHTML = masterMindViewModel.counter;
        counter.setAttribute("style", "width: " + (10 * masterMindViewModel.counter) / 6 + "%;");
        let clazz = "progress-bar progress-bar-success";
        if (masterMindViewModel.counter < 20) {
            clazz = "progress-bar progress-bar-danger";
        } else if (masterMindViewModel.counter < 40) {
            clazz = "progress-bar progress-bar-warning";
        }
        counter.setAttribute("class", clazz);
    }
    let updateView = () => {
        tries.innerHTML = masterMindViewModel.tries;
        wins.innerHTML = masterMindViewModel.statistics.wins;
        loses.innerHTML = masterMindViewModel.statistics.loses;
        gameLevel.innerHTML = masterMindViewModel.gameLevel
        if (masterMindViewModel.moves.length === 0) {
            emptyElement(moves)
        } else {
            let length = masterMindViewModel.moves.length;
            let lastMove = masterMindViewModel.moves[length - 1];
            let row = moves.insertRow()
            let cellNo = row.insertCell(0);
            cellNo.appendChild(document.createTextNode(length.toString()));
            let cellGuess = row.insertCell(1);
            cellGuess.appendChild(document.createTextNode(lastMove.guess.toString()));
            let cellMessage = row.insertCell(2);
            cellMessage.appendChild(document.createTextNode(lastMove.message.toString()));
        }
    }
    setInterval(() => {
        let status = masterMindViewModel.countDown();
        updateProgressBar();
        if (status === "loses")
            updateView();
    }, 1000)
    playButton.addEventListener('click', function (e) {
        masterMindViewModel.play(guessInputText.value)
        updateView();
    }, false)
}