let circulos = [];

function setup() {
  let canvass = createCanvas(800, 600);
  canvass.parent("contenedor-canvas");
  cargarBodies();
}

function cargarBodies() {
  circulos = [];
  for (let i = 0; i < 40; i++) {
    circulos.push(
      new Circulo(random(25, width - 25), random(25, height - 25), 50)
    );
  }
}

function mouseReleased() {
  cargarBodies();
}

function draw() {
  background("turquoise");
  fill(0, 180, 180, 128);
  stroke("white");
  for (const circulo of circulos) {
    circulo.draw();
  }
  forceManyCircles(circulos);
  for (const circulo of circulos) {
    circulo.x = constrain(circulo.x, circulo.r, width - circulo.r);
    circulo.y = constrain(circulo.y, circulo.r, height - circulo.r);
  }
}

class Circulo {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  draw() {
    circle(this.x, this.y, this.r * 2);
  }

  distanceCenter(circulo) {
    return distanceEuclidean(this, circulo);
  }
}