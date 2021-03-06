var c = document.getElementById("gc");
var cc = c.getContext("2d", { alpha: false });

var running = true;
var steps_per_frame = 100;
var seconds_until_reset = 240;
var ants = [];
var max_ants = 2;
var wraparound = false;
var timer = 0;
var div = 4;
var pixel = cc.createImageData(1, 1);
var d = pixel.data;
var text = { text: "langton", color: "white" };

window.onresize = e => {
  resizeCanvas();
  init();
};
window.onload = e => {
  document.title = text.text;
  resizeCanvas();
  init();
  loop();
};

function init() {
  ants = [];
  for (let i = 0; i < max_ants; i++) {
    ants.push(new Ant());
  }

  cc.lineWidth = 1;

  cc.font = `${c.height / 7}px Courier`;
  cc.fillStyle = text.color;
  cc.textAlign = "center";
  cc.fillText(text.text, c.width / 2, c.height / 2);
}

function resizeCanvas() {
  c.width = window.innerWidth / div;
  c.height = window.innerHeight / div;
  cc.clearRect(0, 0, c.width, c.height);
}

function loop() {
  if (running) {
    window.requestAnimationFrame(loop);
  }
  //get image data from pixel position of canvas
  //check current pixel

  for (var i = 0; i < steps_per_frame; i++) {
    updateAnts();
  }
}

setInterval(() => {
  timer++;
  if (timer >= seconds_until_reset) {
    timer = 0;
    resizeCanvas();
    init();
  }
}, 1000);

function updateAnts() {
  for (let ant of ants) {
    if (wraparound) {
      if (ant.x < 0) ant.x = c.width - 1;
      if (ant.y < 0) ant.y = c.height - 1;
      ant.x %= c.width;
      ant.y %= c.height;
    } else {
      ant.x %= c.width;
      ant.y %= c.height;
    }

    var pix = cc.getImageData(ant.x, ant.y, 1, 1);
    let lightness = (pix.data[0] + pix.data[1] + pix.data[2]) / 3;

    if (lightness <= 0) {
      //black pixel
      ant.turn(1);

      cc.fillStyle = "white";
      cc.fillRect(ant.x, ant.y, 1, 1);
    } else if (lightness <= 160) {
      //black pixel
      ant.turn(-1);

      cc.fillStyle = "black";
      cc.fillRect(ant.x, ant.y, 1, 1);
    } else if (lightness <= 230) {
      //black pixel
      ant.turn(1);

      cc.fillStyle = "orange";
      cc.fillRect(ant.x, ant.y, 1, 1);
    } else {
      //black pixel
      ant.turn(1);

      cc.fillStyle = "lightgray";
      cc.fillRect(ant.x, ant.y, 1, 1);
    }
    ant.move();
  }
}
