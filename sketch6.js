let pixelateRadius = 50; // Radius for pixelation effect
let fadeAmount = 10; // Fade rate of pixelation
let pixelateAreas = []; // Array to store pixelation areas

let img1, img2, img3; // Three images to be dragged
let imgX1, imgY1, imgX2, imgY2, imgX3, imgY3; // Position of each image
let imgWidth1 = 500, imgHeight1 = 400; // Dimensions for the first image
let imgWidth2 = 500, imgHeight2 = 500; // Dimensions for the second image
let imgWidth3 = 500, imgHeight3 = 400; // Dimensions for the third image
let dragging1 = false, dragging2 = false, dragging3 = false; // Dragging state for each image
let offsetX1, offsetY1, offsetX2, offsetY2, offsetX3, offsetY3; // Offset for dragging

let music; // Background music

function preload() {
  // Preload the images and music
  img1 = loadImage('information.png'); // Replace with your first image path
  img2 = loadImage('information2.png'); // Replace with your second image path
  img3 = loadImage('information3.png'); // Replace with your third image path
  music = loadSound('music.mp3'); // Load background music
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('room2'); // Attach the canvas to an HTML element with id 'room2'

  // Set initial positions of the images
  imgX1 = width / 2 - imgWidth1 / 2 - 300; // First image slightly to the left
  imgY1 = height / 2 - imgHeight1 / 2;

  imgX2 = width / 2 - imgWidth2 / 2 + 100; // Second image slightly to the right
  imgY2 = height / 2 - imgHeight2 / 2;

  imgX3 = width / 2 - imgWidth3 / 2 + 300; // Third image further to the right
  imgY3 = height / 2 - imgHeight3 / 2 + 200; // Below the other two

  // Start the background music
  music.loop(); // Play music in a loop
}

function draw() {
  clear(); // Clear canvas each frame to show background

  // Apply blend mode for special effect
  blendMode(MULTIPLY);

  // Loop through pixelate areas and apply pixelation effect
  for (let i = pixelateAreas.length - 1; i >= 0; i--) {
    let area = pixelateAreas[i];
    applyPixelate(area.x, area.y, area.radius);

    // Reduce the radius to fade the pixelation effect over time
    area.radius -= fadeAmount;
    if (area.radius <= 0) {
      pixelateAreas.splice(i, 1); // Remove the area when the radius reaches zero
    }
  }

  // Draw the draggable images
  image(img1, imgX1, imgY1, imgWidth1, imgHeight1); // First image
  image(img2, imgX2, imgY2, imgWidth2, imgHeight2); // Second image
  image(img3, imgX3, imgY3, imgWidth3, imgHeight3); // Third image
}

// Function to apply pixelation at a specific area
function applyPixelate(x, y, radius) {
  let step = max(1, radius / 10); // Adjust pixelation intensity
  noStroke();
  fill('#E5D11C'); // Yellow color for pixelation effect

  // Create the pixelated area using small squares
  for (let i = -radius; i < radius; i += step) {
    for (let j = -radius; j < radius; j += step) {
      let px = x + i;
      let py = y + j;
      if (dist(px, py, x, y) < radius) {
        rect(px, py, step, step); // Draw small squares for pixelation
      }
    }
  }
}

// Add a pixelation area where the mouse moves
function mouseMoved() {
  if (!dragging1 && !dragging2 && !dragging3) { // Only add pixelation if not dragging any image
    pixelateAreas.push({ x: mouseX, y: mouseY, radius: pixelateRadius });
  }
}

// Detect mouse press to start dragging the images
function mousePressed() {
  if (mouseX > imgX1 && mouseX < imgX1 + imgWidth1 && mouseY > imgY1 && mouseY < imgY1 + imgHeight1) {
    dragging1 = true;
    offsetX1 = mouseX - imgX1;
    offsetY1 = mouseY - imgY1;
  } else if (mouseX > imgX2 && mouseX < imgX2 + imgWidth2 && mouseY > imgY2 && mouseY < imgY2 + imgHeight2) {
    dragging2 = true;
    offsetX2 = mouseX - imgX2;
    offsetY2 = mouseY - imgY2;
  } else if (mouseX > imgX3 && mouseX < imgX3 + imgWidth3 && mouseY > imgY3 && mouseY < imgY3 + imgHeight3) {
    dragging3 = true;
    offsetX3 = mouseX - imgX3;
    offsetY3 = mouseY - imgY3;
  }
}

// Update image positions while dragging
function mouseDragged() {
  if (dragging1) {
    imgX1 = mouseX - offsetX1;
    imgY1 = mouseY - offsetY1;
  } else if (dragging2) {
    imgX2 = mouseX - offsetX2;
    imgY2 = mouseY - offsetY2;
  } else if (dragging3) {
    imgX3 = mouseX - offsetX3;
    imgY3 = mouseY - offsetY3;
  }
}

// Stop dragging when the mouse is released
function mouseReleased() {
  dragging1 = false;
  dragging2 = false;
  dragging3 = false;
}

// Adjust canvas size on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Update canvas size when window is resized
}
