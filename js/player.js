var audioContext = null;
var noteFreq = null;
var oscList = [];
var masterGainNode;
var osc;
var notePlaying = false;
var currentOct = 1;

function pressKey(event) {
    if (audioContext == null){
        createAudioSynth();
        console.log("audio context created");
    }
    if (notePlaying == false){
        notePlaying = true;
    }
    osc = audioContext.createOscillator();
    osc.connect(masterGainNode);
    osc.type = 'sawtooth';
    playNote(noteFreq[currentOct][event.target.dataset["note"]]);
}

function releaseKey() {
    if (notePlaying == true){
        notePlaying = false;
        // endNote();
        console.log("released note");
    }
}

function playNote(freq) {
    console.log("trying to play " + freq);
    osc.frequency.value = freq;
    osc.start();
}

function endNote() {
    osc.stop();
}

function createNoteTable() {
    noteFreq = [];
    for (i=0; i< 13; i++) {
      noteFreq[i] = [];
    }
    noteFreq[0]["C"] = 32.703195662574829;
    noteFreq[0]["C#"] = 34.647828872109012;
    noteFreq[0]["D"] = 36.708095989675945;
    noteFreq[0]["D#"] = 38.890872965260113;
    noteFreq[0]["E"] = 41.203444614108741;
    noteFreq[0]["F"] = 43.653528929125485;
    noteFreq[0]["F#"] = 46.249302838954299;
    noteFreq[0]["G"] = 48.999429497718661;
    noteFreq[0]["G#"] = 51.913087197493142;
    noteFreq[0]["A"] = 55.000000000000000;
    noteFreq[0]["A#"] = 58.270470189761239;
    noteFreq[0]["B"] = 61.735412657015513;
    noteFreq[1]["C"] = 32.703195662574829*2;
    noteFreq[1]["C#"] = 34.647828872109012*2;
    noteFreq[1]["D"] = 36.708095989675945*2;
    noteFreq[1]["D#"] = 38.890872965260113*2;
    noteFreq[1]["E"] = 41.203444614108741*2;
    noteFreq[1]["F"] = 43.653528929125485*2;
    noteFreq[1]["F#"] = 46.249302838954299*2;
    noteFreq[1]["G"] = 48.999429497718661*2;
    noteFreq[1]["G#"] = 51.913087197493142*2;
    noteFreq[1]["A"] = 55.000000000000000*2;
    noteFreq[1]["A#"] = 58.270470189761239*2;
    noteFreq[1]["B"] = 61.735412657015513*2;
    console.log("note table created");
    return noteFreq;
}

function createAudioSynth() {
    audioContext = new (window.AudioContext || window.webkitAudioContext);
    masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = 1;

}

function setup() {
    document.getElementById("C").addEventListener("mousedown", pressKey, false);
    document.getElementById("C").dataset["note"] = "C";
    document.getElementById("C#").addEventListener("mousedown", pressKey, false);
    document.getElementById("C#").dataset["note"] = "C#";
    document.getElementById("D").addEventListener("mousedown", pressKey, false);
    document.getElementById("D").dataset["note"] = "D";
    document.getElementById("D#").addEventListener("mousedown", pressKey, false);
    document.getElementById("D#").dataset["note"] = "D#";
    document.getElementById("E").addEventListener("mousedown", pressKey, false);
    document.getElementById("E").dataset["note"] = "E";
    document.getElementById("F").addEventListener("mousedown", pressKey, false);
    document.getElementById("F").dataset["note"] = "F";
    document.getElementById("F#").addEventListener("mousedown", pressKey, false);
    document.getElementById("F#").dataset["note"] = "F#";
    document.getElementById("G").addEventListener("mousedown", pressKey, false);
    document.getElementById("G").dataset["note"] = "G";
    document.getElementById("G#").addEventListener("mousedown", pressKey, false);
    document.getElementById("G#").dataset["note"] = "G#";
    document.getElementById("A").addEventListener("mousedown", pressKey, false);
    document.getElementById("A").dataset["note"] = "A";
    document.getElementById("A#").addEventListener("mousedown", pressKey, false);
    document.getElementById("A#").dataset["note"] = "A#";
    document.getElementById("B").addEventListener("mousedown", pressKey, false);
    document.getElementById("B").dataset["note"] = "B";
    document.addEventListener("mouseup", releaseKey, false);
    noteFreq = createNoteTable();
}

setup();

console.log("script loaded");
// console.log(noteFreq);