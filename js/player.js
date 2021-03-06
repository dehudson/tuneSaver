var audioContext = null;
var noteFreq = null;
var masterGainNode;
var osc;
var notePlaying = false;
var currentOct = 4;
var recording = false;
var tuneStorage = window.localStorage;
var date;
var workingTune;
var lastPlayed;
var currentStep;
var lastTimeStamp;
var state = 0;
var menuOpen = false;
var tuneList = [];
var menuButton;
var menuOverlay;

function pressKey(event) {
    let currentNote = event.target.dataset["note"];
    if (recording) {
        if (lastPlayed == null) {
            lastPlayed = currentNote;
            lastTimeStamp = Date.now();
            currentStep = 0;
        } else {
            let newTimeStamp = Date.now();
            workingTune.steps[currentStep] = [lastPlayed, newTimeStamp - lastTimeStamp];
            lastTimeStamp = newTimeStamp;
            currentStep++;
            lastPlayed = currentNote;
        }
    }
    playNote(noteFreq[currentOct][currentNote]);
}

function releaseKey() {
    if (recording) {
        let newTimeStamp = Date.now();
        workingTune.steps[currentStep] = [lastPlayed, newTimeStamp - lastTimeStamp];
        lastTimeStamp = newTimeStamp;
        currentStep++;
        lastPlayed = "rest";
    }
    if (notePlaying){
        notePlaying = false;
        endNote();
    }
}

function playNote(freq) {
    if (audioContext == null){
        createAudioSynth();
        console.log("audio context created");
    }
    osc = audioContext.createOscillator();
    osc.connect(masterGainNode);
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    if (notePlaying == false){
        notePlaying = true;
    }
    osc.start();
}

function endNote() {
    osc.stop();
}

function changeOct() {
    currentOct++;
    if (currentOct > 8) {
        currentOct = 0;
    }
    document.getElementById("oct-selector").innerHTML = "OCT " + currentOct;
}

function createNoteTable() {
    noteFreq = [];
    for (i=0; i< 3*12+1; i++) {
      noteFreq[i] = [];
    }
    noteFreq[0]["C"] = 16.35;
    noteFreq[0]["C#"] = 17.32;
    noteFreq[0]["D"] = 18.35;
    noteFreq[0]["D#"] = 19.45;
    noteFreq[0]["E"] = 20.60;
    noteFreq[0]["F"] = 21.83;
    noteFreq[0]["F#"] = 23.12;
    noteFreq[0]["G"] = 24.5;
    noteFreq[0]["G#"] = 25.96;
    noteFreq[0]["A"] = 27.50;
    noteFreq[0]["A#"] = 29.14;
    noteFreq[0]["B"] = 30.87;
    noteFreq[1]["C"] = 32.70;
    noteFreq[1]["C#"] = 34.65;
    noteFreq[1]["D"] = 36.71;
    noteFreq[1]["D#"] = 38.89;
    noteFreq[1]["E"] = 41.20;
    noteFreq[1]["F"] = 43.65;
    noteFreq[1]["F#"] = 46.25;
    noteFreq[1]["G"] = 49.00;
    noteFreq[1]["G#"] = 51.91;
    noteFreq[1]["A"] = 55.00;
    noteFreq[1]["A#"] = 58.27;
    noteFreq[1]["B"] = 61.74;
    noteFreq[2]["C"] = 65.41;
    noteFreq[2]["C#"] = 69.30;
    noteFreq[2]["D"] = 73.42;
    noteFreq[2]["D#"] = 77.78;
    noteFreq[2]["E"] = 82.41;
    noteFreq[2]["F"] = 87.31;
    noteFreq[2]["F#"] = 92.50;
    noteFreq[2]["G"] = 98.00;
    noteFreq[2]["G#"] = 103.83;
    noteFreq[2]["A"] = 110.00;
    noteFreq[2]["A#"] = 116.54;
    noteFreq[2]["B"] = 123.47;
    noteFreq[3]["C"] = 130.81;
    noteFreq[3]["C#"] = 138.59;
    noteFreq[3]["D"] = 146.83;
    noteFreq[3]["D#"] = 155.56;
    noteFreq[3]["E"] = 164.81;
    noteFreq[3]["F"] = 174.61;
    noteFreq[3]["F#"] = 185.00;
    noteFreq[3]["G"] = 196.00;
    noteFreq[3]["G#"] = 207.65;
    noteFreq[3]["A"] = 220.00;
    noteFreq[3]["A#"] = 233.08;
    noteFreq[3]["B"] = 246.94;
    noteFreq[4]["C"] = 261.63;
    noteFreq[4]["C#"] = 277.18;
    noteFreq[4]["D"] = 293.66;
    noteFreq[4]["D#"] = 311.13;
    noteFreq[4]["E"] = 329.63;
    noteFreq[4]["F"] = 349.23;
    noteFreq[4]["F#"] = 369.99;
    noteFreq[4]["G"] = 392.00;
    noteFreq[4]["G#"] = 415.30;
    noteFreq[4]["A"] = 440.00;
    noteFreq[4]["A#"] = 466.16;
    noteFreq[4]["B"] = 493.88;
    noteFreq[5]["C"] = 523.25;
    noteFreq[5]["C#"] = 554.37;
    noteFreq[5]["D"] = 587.33;
    noteFreq[5]["D#"] = 622.25;
    noteFreq[5]["E"] = 659.25;
    noteFreq[5]["F"] = 698.46;
    noteFreq[5]["F#"] = 739.99;
    noteFreq[5]["G"] = 783.99;
    noteFreq[5]["G#"] = 830.61;
    noteFreq[5]["A"] = 880.00;
    noteFreq[5]["A#"] = 932.33;
    noteFreq[5]["B"] = 987.77;
    noteFreq[6]["C"] = 1046.50;
    noteFreq[6]["C#"] = 1108.73;
    noteFreq[6]["D"] = 1174.66;
    noteFreq[6]["D#"] = 1244.51;
    noteFreq[6]["E"] = 1318.51;
    noteFreq[6]["F"] = 1396.91;
    noteFreq[6]["F#"] = 1479.98;
    noteFreq[6]["G"] = 1567.98;
    noteFreq[6]["G#"] = 1661.22;
    noteFreq[6]["A"] = 1760.00;
    noteFreq[6]["A#"] = 1864.66;
    noteFreq[6]["B"] = 1975.53;
    noteFreq[7]["C"] = 2093.00;
    noteFreq[7]["C#"] = 2217.46;
    noteFreq[7]["D"] = 2349.32;
    noteFreq[7]["D#"] = 2489.02;
    noteFreq[7]["E"] = 2637.02;
    noteFreq[7]["F"] = 2793.83;
    noteFreq[7]["F#"] = 2959.96;
    noteFreq[7]["G"] = 3135.96;
    noteFreq[7]["G#"] = 3322.44;
    noteFreq[7]["A"] = 3520.00;
    noteFreq[7]["A#"] = 3729.31;
    noteFreq[7]["B"] = 3951.07;
    noteFreq[8]["C"] = 4186.01;
    noteFreq[8]["C#"] = 4434.92;
    noteFreq[8]["D"] = 4698.63;
    noteFreq[8]["D#"] = 4978.03;
    noteFreq[8]["E"] = 5274.04;
    noteFreq[8]["F"] = 5587.65;
    noteFreq[8]["F#"] = 5919.91;
    noteFreq[8]["G"] = 6271.93;
    noteFreq[8]["G#"] = 6644.88;
    noteFreq[8]["A"] = 7040.00;
    noteFreq[8]["A#"] = 7458.62;
    noteFreq[8]["B"] = 7902.13;
    console.log("note table created");
    return noteFreq;
}

function createAudioSynth() {
    audioContext = new (window.AudioContext || window.webkitAudioContext);
    masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = 0.5;
}

function record() {
    if (recording == false) {
        recording = true;
        date = new Date();
        initializeTune();
        document.getElementById("rec-button").innerHTML = "STOP";
    } else {
        recording = false;
        lastPlayed = null;
        saveTune(workingTune);
        workingTune = null;
        document.getElementById("rec-button").innerHTML = "REC";
        currentStep = 0;
    }
}

function playback() {
    for (i = 0; workingTune.steps[i] != null; i++) {
        if (i > 0) {
            if (workingTune.steps[i][0] == "rest") {
                hold(workingTune.steps[i][1]);
            } else {
                playNote(noteFreq[currentOct][workingTune.steps[i][0]]);
                hold(workingTune.steps[i][1]);
                endNote();
            }
        } else {
            console.log("Step 1");
            playNote(noteFreq[currentOct][workingTune.steps[i][0]]);
            hold(workingTune.steps[i][1]);
            endNote();
        }
    }
}

function openMenu() {
    if (!menuOpen) {
        populateMenu();
        menuOverlay.style.display = "block";
        menuOpen = true;
    } else {
        closeMenu();
    }
}

function closeMenu() {
    if (menuOpen) {
        clearMenu();
        menuOverlay.style.display = "none";
        menuOpen = false;
    }
}

function populateMenu() {
    menuOverlay.appendChild(createNewTuneMenuItem());

    console.log (tuneList);

    for (i in tuneList) {
        menuOverlay.appendChild(createMenuItem(tuneList[i]));
    }
}

function clearMenu() {
    while (menuOverlay.firstChild) {
        menuOverlay.removeChild(menuOverlay.firstChild);
    }
}

function createMenuItem(tune) {
    let newItem = document.createElement("div");
    newItem.setAttribute("class", "col-2 menu-item-container");
    newItem.dataset.title = tune.title;
    newItem.addEventListener("click", function() { loadTune(newItem.dataset.title); }, false);
    let newElement = document.createElement("p");
    newElement.setAttribute("class", "menu-item");
    newElement.innerHTML = tune.title;
    newItem.appendChild(newElement);

    return newItem;
}

function createNewTuneMenuItem() {
    let newItem = document.createElement("div");
    newItem.setAttribute("class", "col-2 menu-item-container");
    newItem.setAttribute("id", "new-tune");
    newItem.dataset.title = "new tune";
    newItem.addEventListener("click", function() { loadTune(newItem.dataset.title); }, false);
    let childElement = document.createElement("p");
    childElement.innerHTML = "New tune";
    childElement.setAttribute("class", "menu-item");
    newItem.appendChild(childElement);

    return newItem;
}

function switchState() {
    if (state == 0) {
        state = 1;
        let parent = document.getElementById("rec-button").parentNode;
        parent.removeChild(document.getElementById("rec-button"));
        let newButton = document.createElement("button");
        newButton.setAttribute('id', "play-button");
        newButton.innerHTML = "PLAY";
        newButton.addEventListener("click", playback, false);
        parent.appendChild(newButton);
        loadTune();
    } else {
        state = 0;
        let parent = document.getElementById("play-button").parentNode;
        parent.removeChild(document.getElementById("play-button"));
        let newButton = document.createElement("button");
        newButton.setAttribute('id', "rec-button");
        newButton.innerHTML = "REC";
        newButton.addEventListener("click", record, false);
        parent.appendChild(newButton);
        workingTune = null;
    }
}

function hold(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function loadTune(title) {
    console.log(title);
    if (title == "new tune") {
        initializeTune();
        if (state == 1) {
            switchState();
        }
        menuButton.innerHTML = "New tune";
    } else {
        for (i in tuneList) {
            if (tuneList[i]["title"] == title) {
                workingTune = tuneList[i];
                currentOct = workingTune.octave;
                document.getElementById("oct-selector").innerHTML = "OCT " + currentOct;
                menuButton.innerHTML = title;

                if (state == 0) {
                    switchState();
                }
            }
        }
    }
    console.log("Attempting to close menu");
    closeMenu();
}

function saveTune(tune) {
    tuneStorage.setItem(tune["title"], JSON.stringify(tune));
    tuneList.push(tune);
}

function populateTuneList() {
    let storageSize = tuneStorage.length;
    if (storageSize != 0) {
        for (i = 0; i < storageSize; i++) {
            let tune = JSON.parse(tuneStorage.getItem(tuneStorage.key(i)));
            tuneList.push(tune);
        }
    }
}

function initializeTune() {
    workingTune = {
        "title" : date.toDateString() + " " + date.toTimeString().substring(0, 8),
        "octave" : currentOct,
        "steps" : {

        }
    }
}

function setup() {
    document.getElementById("C").addEventListener("mousedown", pressKey, false);
    document.getElementById("C").addEventListener("touchstart", pressKey, false);
    document.getElementById("C").dataset["note"] = "C";
    document.getElementById("C#").addEventListener("mousedown", pressKey, false);
    document.getElementById("C#").addEventListener("touchstart", pressKey, false);
    document.getElementById("C#").dataset["note"] = "C#";
    document.getElementById("D").addEventListener("mousedown", pressKey, false);
    document.getElementById("D").addEventListener("touchstart", pressKey, false);
    document.getElementById("D").dataset["note"] = "D";
    document.getElementById("D#").addEventListener("mousedown", pressKey, false);
    document.getElementById("D#").addEventListener("touchstart", pressKey, false);
    document.getElementById("D#").dataset["note"] = "D#";
    document.getElementById("E").addEventListener("mousedown", pressKey, false);
    document.getElementById("E").addEventListener("touchstart", pressKey, false);
    document.getElementById("E").dataset["note"] = "E";
    document.getElementById("F").addEventListener("mousedown", pressKey, false);
    document.getElementById("F").addEventListener("touchstart", pressKey, false);
    document.getElementById("F").dataset["note"] = "F";
    document.getElementById("F#").addEventListener("mousedown", pressKey, false);
    document.getElementById("F#").addEventListener("touchstart", pressKey, false);
    document.getElementById("F#").dataset["note"] = "F#";
    document.getElementById("G").addEventListener("mousedown", pressKey, false);
    document.getElementById("G").addEventListener("touchstart", pressKey, false);
    document.getElementById("G").dataset["note"] = "G";
    document.getElementById("G#").addEventListener("mousedown", pressKey, false);
    document.getElementById("G#").addEventListener("touchstart", pressKey, false);
    document.getElementById("G#").dataset["note"] = "G#";
    document.getElementById("A").addEventListener("mousedown", pressKey, false);
    document.getElementById("A").addEventListener("touchstart", pressKey, false);
    document.getElementById("A").dataset["note"] = "A";
    document.getElementById("A#").addEventListener("mousedown", pressKey, false);
    document.getElementById("A#").addEventListener("touchstart", pressKey, false);
    document.getElementById("A#").dataset["note"] = "A#";
    document.getElementById("B").addEventListener("mousedown", pressKey, false);
    document.getElementById("B").addEventListener("touchstart", pressKey, false);
    document.getElementById("B").dataset["note"] = "B";

    document.addEventListener("mouseup", releaseKey, false);
    document.addEventListener("touchend", releaseKey, false);

    document.getElementById("oct-selector").addEventListener("click", changeOct, false);
    document.getElementById("rec-button").addEventListener("click", record, false);
    menuButton = document.getElementById("menu-button");
    menuButton.addEventListener("click", openMenu, false);
    menuOverlay = document.getElementById("menu-overlay");

    noteFreq = createNoteTable();
    populateTuneList();

    ScreenOrientation.lock(portait);
}
tuneStorage.clear();
setup();