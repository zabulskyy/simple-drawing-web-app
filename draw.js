window.onload = function () {

  document.ontouchmove = function (e) {
    e.preventDefault();
  }

  let canvas = document.getElementById('main');
  let canvastop = canvas.offsetTop

  let context = canvas.getContext("2d");

  let lastx;
  let lasty;

  context.strokeStyle = "#000000";
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  function clear() {
    context.fillStyle = "#ffffff";
    context.rect(0, 0, 300, 300);
    context.fill();
  }

  function dot(x, y) {
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(x, y, 1, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.closePath();
  }

  function line(fromx, fromy, tox, toy) {
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();
    context.closePath();
  }

  canvas.ontouchstart = function (event) {
    event.preventDefault();

    lastx = event.touches[0].clientX;
    lasty = event.touches[0].clientY - canvastop;

    dot(lastx, lasty);
  }

  canvas.ontouchmove = function (event) {
    event.preventDefault();

    let newx = event.touches[0].clientX;
    let newy = event.touches[0].clientY - canvastop;

    line(lastx, lasty, newx, newy);

    lastx = newx;
    lasty = newy;
  }


  let clearButton = document.getElementById('clear')
  clearButton.onclick = clear

  clear()
}

function getData() {
  const canvas = document.getElementById('main');
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, 300, 300);
  
  let pixels = imageData.data;
  let w = imageData.width;
  let h = imageData.height;
  let matrix = [...Array(6)].map(e => Array(6));

  let l = w * h;
  for (let i = 0; i < l; i++) {

    // get color of pixel
    let r = pixels[i * 4]; // Red
    let g = pixels[i * 4 + 1]; // Green
    let b = pixels[i * 4 + 2]; // Blue
    let a = pixels[i * 4 + 3]; // Alpha

    // get the position of pixel
    let y = parseInt(i / w, 10);
    let x = i - y * w;

    if (r != 255)
      matrix[x][y] = 1;
    else
      matrix[x][y] = 0;
  }
  return matrix
}

function printData(){
  console.log(getData())
}