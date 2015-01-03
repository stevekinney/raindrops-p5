var width, height, droplets;

function setup() {
  width = 640;
  height = 480;
  createCanvas(width, height);
  droplets = [new Droplet()];
  noStroke();
}

function draw() {
  background(255);
  if (droplets.length < 12) {
    droplets.push(new Droplet({immortal: true}));
  }
  droplets.forEach(function (droplet) {
    droplet.moveDown().draw();
  });
}

function mouseClicked() {
  droplets.push(new Droplet({
    x: mouseX,
    y: mouseY,
    color: color(237, 59, 59, 180)
  }));
}

function Droplet(options) {
  options = options || {};

  this.immortal = options.immortal || false;

  this.height = options.height || 0;
  this.width = options.width || 0;

  this.color = options.color || color(118, 199, 237, 50);

  this.maxHeight = options.maxHeight || 50;
  this.maxWidth = options.maxWidth || 50;

  this.noise = new p5.Oscillator('sine');

  this.resurrect(options.x, options.y);
}

Droplet.prototype.draw = function () {
  this.adjustSize();
  fill(this.color);
  ellipse(this.x, this.y, this.width, this.height);
  return this;
};

Droplet.prototype.setOrigin = function (x, y) {
  this.x = x || getRandomNumber(this.maxWidth, width - this.maxWidth);
  this.y = y || getRandomNumber(0, height / 2);
  return this;
};

Droplet.prototype.adjustSize = function () {
  (this.y < height - this.maxHeight) ? this.biggerize() : this.smallerize();
  return this;
};

Droplet.prototype.moveDown = function () {
  this.y++;
  return this;
};

Droplet.prototype.biggerize = function () {
  if (this.height < this.maxHeight) { this.height++ }
  if (this.width < this.maxWidth) { this.width++ }
  return this;
};

Droplet.prototype.smallerize = function () {
  this.height--;
  this.width--;
  if (this.width === 0) {
    this.kill();
  }
  return this;
};

Droplet.prototype.makeNoise = function () {
  var env = new p5.Env(0.1, 0.9, 0.5, 0, 0.1, 0.1, 1);

  this.noise.f = this.x + 440;
  this.noise.amp(env);
  this.noise.start();

  env.play();

  return this;
};

Droplet.prototype.kill = function () {
  if (this.immortal) { this.resurrect(); }
  return this;
};

Droplet.prototype.resurrect = function (x, y) {
  this.setOrigin(x, y);
  if (!this.immortal) { this.makeNoise(); }
  return this;
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}