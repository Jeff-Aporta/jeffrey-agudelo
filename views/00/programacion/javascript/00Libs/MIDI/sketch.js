let select = document.getElementById("selectInst");

let audioContext = new AudioContext();

function setup() {
  console.log("a")
  Soundfont.instrument(audioContext, random(MIDI_instruments))
    .then((nI) => {instrument = nI})

}

function dibujar() {
  createCanvas(700, 400);
  background(0)
  fill(255)
  textSize(40)
  textAlign(CENTER, CENTER)
  text(`Tocame con el mouse
    y presiona teclas para escuchar
    su sonido`, width / 2, height / 2)
}

let instrument;

function draw() {
  if (instrument) {
    dibujar()
  }
}


function keyPressed() {
  if (!instrument) {
    return
  }
  let nota = keyCode
  instrument.play(nota).stop(audioContext.currentTime + 0.5);

}