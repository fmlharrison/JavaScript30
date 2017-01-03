/*jshint esversion: 6*/
const colorCanvas = document.querySelector('#color-box');
const sliders = document.querySelectorAll('.color-controls input');
const color = document.querySelector('#hue');
const saturation = document.querySelector('#saturation');
const lightness = document.querySelector('#lightness');
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 25;

let isDrawing = false; //this is a dummy variable
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${color.value}, ${saturation.value}%, ${lightness.value}%)`;
  ctx.beginPath(); //starts the line drawing
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //This is restructuring an array.

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

function changeColour(e) {
  console.log(e.target);
  const suffix = this.dataset.percent || '';
  if (e.target === color) {
    document.documentElement.style.setProperty(`--hue`, this.value);
  } else if (e.target === saturation) {
    document.documentElement.style.setProperty(`--saturation`, this.value + suffix);
  } else if (e.target === lightness) {
    document.documentElement.style.setProperty(`--lightness`, this.value + suffix);
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

color.addEventListener('change', changeColour);
saturation.addEventListener('change', changeColour);
lightness.addEventListener('change', changeColour);

// sliders.forEach(slider => slider.addEventListener('change', changeColour));
