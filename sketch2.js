let img;
let circles = [];
let targetPage = 'index3.html'; // Change to your desired page
let numCircles = 0; // Number of images to create
let duration = 2000; // Duration in milliseconds for image generation
let startTime;
let bgMusic; // Variable for the background music

function preload() {
    // Load your image and background music
    img = loadImage('bua.jpg'); // Replace with your image file path
    bgMusic = loadSound('ambient.mp3'); // Replace with your music file path
}

function setup() {
    // Create a canvas that is transparent and attach it to the landing-image
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('landing-image'); // Make 'landing-image' the parent

    // Set the canvas to be transparent
    clear(); // Clears the canvas so it's fully transparent

    // Play background music automatically
    bgMusic.loop(); // Start playing the background music in a loop
}

function draw() {
    clear(); // Clear the canvas each frame to maintain transparency

    // Draw all images in place of circles
    for (let i = 0; i < circles.length; i++) {
        image(img, circles[i].x, circles[i].y, 100, 200); // Draw the image larger (100x200 size)
    }

    // If within the duration, keep generating images
    if (millis() < startTime + duration) {
        if (frameCount % 2 === 0) { // Generate images every 5 frames
            numCircles = int(random(1, 5)); // Random number of images between 1 and 5
            for (let i = 0; i < numCircles; i++) {
                let newImagePosition = {
                    x: random(width),
                    y: random(height)
                };
                circles.push(newImagePosition);
            }
        }
    } else if (millis() >= startTime + duration) {
        // Redirect to another page after the duration
        window.location.href = targetPage; // Redirect to the target page
    }
}

// Function to start image generation when clicked
function mousePressed() {
    startTime = millis(); // Start the timer when mouse is pressed
    circles = []; // Clear existing circles to start fresh
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
