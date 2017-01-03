/*jshint esversion: 6*/
const colorCanvas = document.querySelector('#color-box');
const sliders = document.querySelectorAll('.color-controls input');
const color = document.querySelector('#hue');
const saturation = document.querySelector('#saturation');
const lightness = document.querySelector('#lightness');
const lineWidth = document.querySelector('#width');
const clear = document.querySelector('#clear');
const download = document.querySelector('#download');
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 800;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false; //this is a dummy variable
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${color.value}, ${saturation.value}%, ${lightness.value}%)`;
  ctx.lineWidth = lineWidth.value;
  ctx.beginPath(); //starts the line drawing
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //This is restructuring an array.
}

function changeColour(e) {
  let suffix = this.dataset.percent || '';
  if (e.target === color) {
    document.documentElement.style.setProperty(`--hue`, this.value);
  } else if (e.target === saturation) {
    document.documentElement.style.setProperty(`--saturation`, this.value + suffix);
  } else if (e.target === lightness) {
    document.documentElement.style.setProperty(`--lightness`, this.value + suffix);
  }
}

function changeWidth() {
  let suffix = this.dataset.sizing;
  document.documentElement.style.setProperty("--line-width", this.value + suffix);
}

function clearCanvas(e) {
  console.log(e);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas(link, filename) {
  link.href = canvas.toDataURL();
  link.download = filename;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

color.addEventListener('change', changeColour);
color.addEventListener('mousemove', changeColour);
saturation.addEventListener('change', changeColour);
saturation.addEventListener('mousemove', changeColour);
lightness.addEventListener('change', changeColour);
lightness.addEventListener('mousemove', changeColour);

lineWidth.addEventListener('click', changeWidth);
lineWidth.addEventListener('change', changeWidth);

clear.addEventListener('click', clearCanvas);

download.addEventListener('click', function() {
  downloadCanvas(this, "canvasMe.png");
});
