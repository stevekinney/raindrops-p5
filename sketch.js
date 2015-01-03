var width, height, droplets;

function setup() {
  width = 640;
  height = 480;
  droplets = [new Droplet()];
  createCanvas(width, height);
  noStroke();
}

function draw() {
  background(255);
  fill(95, 160, 191, 50);
  if (droplets.length < 12) {
    droplets.push(new Droplet());
  }
  droplets.forEach(function (droplet) {
    droplet.moveDown().draw();
  });
}

function Droplet(options) {
  options = options || {};
  
  this.height = options.height || 0;
  this.width = options.width || 0;
  
  this.maxHeight = options.maxHeight || 50;
  this.maxWidth = options.maxWidth || 50;
  
  this.noise = new p5.Oscillator(this.x);
  
  this.setOrigin();
  this.makeNoise();
}

Droplet.prototype.draw = function () {
  this.adjustSize();
  ellipse(this.x, this.y, this.width, this.height);
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
  if (this.width === 0) { this.setOrigin(); }
  return this;
};

Droplet.prototype.setOrigin = function () {
  this.makeNoise();
  this.x = getRandomNumber(this.maxWidth, width - this.maxWidth);
  this.y = getRandomNumber(0, height / 2);
  return this;
};

Droplet.prototype.makeNoise = function () {
  this.noise.start();
  setTimeout(function () {
    this.stopNoise();
  }.bind(this), 100);
};

Droplet.prototype.stopNoise = function () {
  this.noise.f = this.x + 440;
  this.noise.stop();
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}