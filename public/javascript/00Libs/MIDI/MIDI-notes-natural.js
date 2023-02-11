const DO = 0;
const DO_ = 1;
const RE = 2;
const RE_ = 3;
const MI = 4;
const FA = 5;
const FA_ = 6;
const SOL = 7;
const SOL_ = 8;
const LA = 9;
const LA_ = 10;
const SI = 11;

let audioContext = new AudioContext();
Soundfont.instrument(audioContext, "fx_3_crystal").then((nI) => {
  instrument = nI;
  paraElisa();
});

function paraElisa() {
  let moment = 0;
  let octava = 5;
  let vel = 0.7;
  let p1 = [
    { note: byteNote(MI, octava + 1), duration: 500 * vel },
    { note: byteNote(RE_, octava + 1), duration: 500 * vel },
    { note: byteNote(MI, octava + 1), duration: 500 * vel },
    { note: byteNote(RE_, octava + 1), duration: 500 * vel },
    { note: byteNote(MI, octava + 1), duration: 500 * vel },
    { note: byteNote(SI, octava), duration: 500 * vel },
    { note: byteNote(RE, octava + 1), duration: 500 * vel },
    { note: byteNote(DO, octava + 1), duration: 500 * vel },
    { note: byteNote(LA, octava), duration: 1000 * vel },
    { note: byteNote(DO, octava), duration: 500 * vel },
    { note: byteNote(FA, octava), duration: 500 * vel },
    { note: byteNote(LA, octava), duration: 500 * vel },
    { note: byteNote(SI, octava), duration: 1000 * vel },
    { note: byteNote(MI, octava), duration: 500 * vel },
    { note: byteNote(FA_, octava), duration: 500 * vel },
    { note: byteNote(SI, octava), duration: 500 * vel },
  ];
  for (let i = 1; i <= 4; i++) {
    for (let j = 0; j < p1.length; j++) {
      const instruction = p1[j];
      setTimeout(() => {
        instrument.play(instruction.note).stop(audioContext.currentTime + 1);
      }, moment);
      moment += instruction.duration;
    }
    setTimeout(() => {
      instrument
        .play(i == 4 ? byteNote(LA, octava) : byteNote(DO, octava + 1))
        .stop(audioContext.currentTime + 1);
    }, moment);
    moment += 1000 * vel;
  }
  let p2 = [
    { note: byteNote(SI, octava + 1), duration: 500 * vel },
    { note: byteNote(DO, octava + 1), duration: 500 * vel },
    { note: byteNote(RE, octava + 1), duration: 500 * vel },
    { note: byteNote(MI, octava + 1), duration: 1000 * vel },
    { note: byteNote(SOL, octava + 1), duration: 500 * vel },
    { note: byteNote(FA, octava), duration: 500 * vel },
    { note: byteNote(MI, octava + 1), duration: 500 * vel },
    { note: byteNote(RE, octava + 1), duration: 1000 * vel },
    { note: byteNote(FA, octava), duration: 500 * vel },
    { note: byteNote(MI, octava), duration: 500 * vel },
    { note: byteNote(RE, octava), duration: 500 * vel },
    { note: byteNote(DO, octava), duration: 500 * vel },
  ];
  for (let j = 0; j < p2.length; j++) {
    const instruction = p2[j];
    setTimeout(() => {
      instrument.play(instruction.note).stop(audioContext.currentTime + 1);
    }, moment);
    moment += instruction.duration;
  }
  for (let i = 1; i < 2; i++) {
    for (let j = 0; j < p1.length; j++) {
      const instruction = p1[j];
      setTimeout(() => {
        instrument.play(instruction.note).stop(audioContext.currentTime + 1);
      }, moment);
      moment += instruction.duration;
    }
    setTimeout(() => {
      instrument
        .play(byteNote(DO, octava + 1))
        .stop(audioContext.currentTime + 1);
    }, moment);
    moment += 1000 * vel;
  }
}

function byteNote(note, octava = 5) {
  let col = 0;
  switch (typeof note == "string" ? note.toUpperCase() : note) {
    case "C":
    case "DO":
    case DO:
      col = 0;
      break;
    case "C#":
    case "DO#":
    case DO_:
      col = 1;
      break;
    case "D":
    case "RE":
    case RE:
      col = 2;
      break;
    case "D#":
    case "RE#":
    case RE_:
      col = 3;
      break;
    case "E":
    case "MI":
    case MI:
      col = 4;
      break;
    case "F":
    case "FA":
    case FA:
      col = 5;
      break;
    case "F#":
    case "FA#":
    case FA_:
      col = 6;
      break;
    case "G":
    case "SOL":
    case SOL:
      col = 7;
      break;
    case "G#":
    case "SOL#":
    case SOL_:
      col = 7;
      break;
    case "A":
    case "LA":
    case LA:
      col = 9;
      break;
    case "A#":
    case "LA#":
    case LA_:
      col = 10;
      break;
    case "B":
    case "SI":
    case SI:
      col = 11;
      break;
  }
  return 12 * octava + note;
}
