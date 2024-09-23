let girlSound;
let bgMusic;
let girlElement;
let subtitleElement;
let subtitles = [
  { time: 0, text: "Hello," },
  { time: 2, text: "my name is Xiaomei" },
  { time: 4, text: "and it's my cosy 45sq tiny house," },
  { time: 7, text: "let's explore it" }
];
let currentSubtitleIndex = 0;

function preload() {
  girlSound = loadSound('voice.mp3'); // Replace with the path to your 'sound.mp3'
  bgMusic = loadSound('ambient.mp3'); // Preload the background music
}

function setup() {
  noCanvas(); 
  girlElement = select('#girl'); 
  subtitleElement = select('#subtitles'); 

  bgMusic.loop(); // Start playing background music in a loop
  bgMusic.setVolume(0.3); // Adjust the background music volume

  girlSound.play(); // Play the girl sound
  girlSound.onended(() => fadeOut(girlElement, subtitleElement)); // Trigger fade out when the sound ends
  girlSound.amp(0.8); 
}

function draw() {
  if (girlSound.isPlaying()) {
    updateSubtitles();
  }
}

function updateSubtitles() {
  if (currentSubtitleIndex < subtitles.length) {
    let subtitle = subtitles[currentSubtitleIndex];

    if (girlSound.currentTime() >= subtitle.time) {
      subtitleElement.html(subtitle.text); // Update subtitle
      currentSubtitleIndex++;
    }
  } else {
    subtitleElement.html(''); // Clear subtitle after last one
  }
}

// Function to fade out both #girl and #subtitles smoothly
function fadeOut(element1, element2) {
  let opacity = 1;

  let fadeInterval = setInterval(() => {
    opacity -= 0.05;
    element1.style('opacity', opacity); // Fade out #girl
    element2.style('opacity', opacity); // Fade out #subtitles

    if (opacity <= 0) {
      clearInterval(fadeInterval);
      element1.style('display', 'none'); // Hide #girl after fade
      element2.style('display', 'none'); // Hide #subtitles after fade
    }
  }, 50);
}
