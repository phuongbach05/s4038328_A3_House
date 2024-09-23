let countdown = 100; // Start the countdown at 100
let isLoading = true; // To check if the preloader is active
let duration = 2000; // Duration for the countdown in milliseconds (2 seconds)
let decrementRate = duration / countdown; // Calculate the time for each decrement

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60); // Higher frame rate for smoother updates

    // Start the countdown interval
    setInterval(updateCountdown, decrementRate); // Update countdown at the calculated rate
}

function draw() {
    if (isLoading) {
        // Draw the black background
        background(0);
    }
}

// Function to update the countdown
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement && countdown > 0) {
        countdown--; // Decrement the countdown by 1
        countdownElement.innerText = countdown; // Update the displayed countdown
    } else {
        isLoading = false; // Stop loading
        fadeOut(); // Start fade out
    }
}

// Function to fade out the preloader and show the content
function fadeOut() {
    const preloader = document.getElementById('preloader');
    const menu = document.getElementById('menuinside');

    if (preloader) {
        // Fade out effect
        preloader.style.transition = 'opacity 0.5s';
        preloader.style.opacity = '0';

        setTimeout(() => {
            preloader.style.display = 'none'; // Hide preloader
            if (menu) {
                menu.style.display = 'flex'; // Show the content
            }
        }, 500); // Wait for the fade-out to complete
    }
}

// Call setup on window load
window.onload = setup;


