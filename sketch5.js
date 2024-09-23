let buaImage;
let lichImage;
let chineseImage;
let imgSize = 80;   // Base size of images
let activeImages = []; // Array to hold active image instances
let music; // Variable for the music

function preload() {
  // Load your bua.jpg, lich.png, and chinese.png images
  buaImage = loadImage('bua.jpg');  // Adjust the path for bua.jpg
  lichImage = loadImage('lich.jpg'); // Adjust the path for lich.png
  chineseImage = loadImage('chinese.jpg'); // Adjust the path for chinese.png
  
  // Load the background music
  music = loadSound('music.mp3'); // Adjust the path to your music file
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('room1'); // Set the parent to #room1
  noStroke(); // Optional: Remove outlines for a cleaner look
  
  // Play the music immediately
  music.loop(); // Start the music looping
}

function draw() {
  // Clear the canvas with a transparent background
  clear();

  // Update and display active images
  for (let i = activeImages.length - 1; i >= 0; i--) {
    let imgObj = activeImages[i];
    
    // Make both lich and chinese images stay longer by reducing the shrink rate
    if (imgObj.image === lichImage || imgObj.image === chineseImage) {
      imgObj.scaleFactor *= 0.98; // Slow shrinking rate for lich and chinese images
    } else {
      imgObj.scaleFactor *= 0.95; // Normal shrink rate for bua
    }
    
    // Draw the image with its unique scaling factor
    image(
      imgObj.image, 
      imgObj.x - imgObj.size / 2, imgObj.y - imgObj.size / 2, 
      imgObj.size * imgObj.scaleFactor, imgObj.size * imgObj.scaleFactor
    );
    
    // Remove image if it's too small
    if (imgObj.scaleFactor < 0.1) {
      activeImages.splice(i, 1); // Remove the image from the array
    }
  }
}

// Function to generate images on mouse movement (bua.jpg)
function mouseMoved() {
  // Generate 'bua.jpg' images at the cursor position
  for (let i = 0; i < 5; i++) { // Adjust the number of images generated
    activeImages.push({
      image: buaImage, // Use bua.jpg image
      x: mouseX + random(-10, 10), // Add slight randomness to the position
      y: mouseY + random(-10, 10),
      size: random(50, 100), // Random size for bua.jpg between 50 and 100
      scaleFactor: 1.5 // Initial scale factor
    });
  }
}

// Function to generate both 'lich.png' and 'chinese.png' images on mouse click
function mousePressed() {
  // Generate a mix of 'lich.png' and 'chinese.png' images across the screen
  for (let i = 0; i < 20; i++) { // Adjust the number of images generated
    let randomImage = random([lichImage, chineseImage]); // Randomly pick between lich and chinese
    activeImages.push({
      image: randomImage, // Randomly use lich.png or chinese.png
      x: random(width), // Random position on the screen
      y: random(height),
      size: random(60, 150), // Random size for lich/chinese images between 60 and 150
      scaleFactor: 2 // Initial scale factor for larger effect
    });
  }
}

// Resize the canvas if the window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
