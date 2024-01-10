"use strict";
let capture;
let chars = "  ▂▄▆█";
let fontSize = 30;

function setup() {
  createCanvas(1200, 800);
  capture = createCapture(VIDEO);
  capture.hide();
  capture.size(1200, 800);
  textFont("Monospaced", fontSize);
  textAlign(LEFT, TOP);
}

function draw() {
  let mainColor = '#000000';
  let bgColor = '#ffffff';
  background(bgColor);
  fill(mainColor);

  if (capture.width > 0) {
    let img = capture.get(0, 0, capture.width, capture.height);
    img.loadPixels();

    const step = 15;
    for (let y = step; y < img.height; y += step) {
      for (let x = step; x < img.width; x += step) {
        const darkness = getPixelDarknessAtPosition(img, x, y);
        let sX = x * width / img.width;
        let sY = y * height / img.height;
        let charIndex = Math.floor(darkness * (chars.length - 1));
        let displayChar = chars.charAt(charIndex);
        textSize(fontSize * darkness);
        text(displayChar, sX, sY);
      }
    }
  }
}

function getPixelDarknessAtPosition(img, x, y) {
  const mirroring = true;
  let i = y * img.width + (mirroring ? (img.width - x - 1) : x);
  return (255 - img.pixels[i * 4]) / 255;
}
