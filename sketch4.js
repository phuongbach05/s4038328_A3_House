let bugs = [];
let score = 0;
let bugTimer = 0;
let bugInterval = 60;
let bugIntervalDecrease = 0.98;
let minBugInterval = 10;
let minBugsPerSpawn = 1;
let maxBugsPerSpawn = 5;
let gameTime = 30000;
let startTime;
let gameOver = false;
let bugImage;
let backgroundImage1;
let backgroundImage2;
let flyCursor; // Image for the custom cursor
let killSound;
let backgroundMusic;

function preload() {
  bugImage = loadImage('gian.gif'); // Replace with your bug image path
  backgroundImage1 = loadImage('background1.png'); // First background image
  backgroundImage2 = loadImage('1x/new-03.png'); // Second background image for game over
  flyCursor = loadImage('fly.png'); // Load your cursor image (fly.png)
  killSound = loadSound('soundkill.mp3'); // Replace with your sound effect path
  backgroundMusic = loadSound('music.mp3'); // Replace with your background music path
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  startGame();
  
  // Set the custom cursor
  cursor(flyCursor);
}

function draw() {
  if (gameOver) {
    background(backgroundImage2); // Directly switch to the game-over background
    displayGameOver();
    backgroundMusic.stop(); // Stop music when the game is over
    return;
  } else {
    background(backgroundImage1); // Display the first background during the game
  }

  let elapsedTime = millis() - startTime;
  let remainingTime = max(0, gameTime - elapsedTime);

  if (remainingTime <= 0 || score >= 30) {
    gameOver = true;
  }

  bugTimer++;
  if (bugTimer >= bugInterval) {
    let bugsToSpawn = int(random(minBugsPerSpawn, maxBugsPerSpawn + 1));
    for (let i = 0; i < bugsToSpawn; i++) {
      bugs.push(new Bug());
    }
    bugTimer = 0;

    if (bugInterval > minBugInterval) {
      bugInterval *= bugIntervalDecrease;
    }
  }

  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].update();
    bugs[i].show();

    if (bugs[i].offscreen()) {
      bugs.splice(i, 1);
    }
  }

  updateScoreboard();
  updateTimer(remainingTime);

  // Draw custom cursor at the mouse position
  image(flyCursor, mouseX - 40, mouseY - 50, 80, 170); // Adjust size as needed
}

function updateScoreboard() {
  let scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = `Score: ${score}`;
}

function updateTimer(remainingTime) {
  let timer = document.getElementById('timer');
  timer.innerHTML = `Time Left: ${Math.ceil(remainingTime / 1000)}s`;
}

function displayGameOver() {
  let gameOverDiv = document.getElementById('game-over');
  gameOverDiv.style.display = 'block'; // Show the game-over text
  if (score >= 30) {
    gameOverDiv.innerHTML = `You Win!<br>Score: ${score}`; // Update with the win message
  } else {
    gameOverDiv.innerHTML = `Game Over!<br>Score: ${score}`; // Update with the game-over message
  }

  let restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'block'; // Show the restart button
}

function mousePressed() {
  if (gameOver) {
    return; // Ignore clicks when the game is over
  }

  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].contains(mouseX, mouseY)) {
      score++;
      killSound.play(); // Play sound when a bug is killed
      bugs.splice(i, 1);  // Remove the bug once clicked
      break;  // Stop checking other bugs after the first one is removed
    }
  }
}

function startGame() {
  bugs = [];
  score = 0;
  bugTimer = 0;
  bugInterval = 60;
  gameOver = false;
  startTime = millis();

  let gameOverDiv = document.getElementById('game-over');
  gameOverDiv.style.display = 'none'; // Hide the game-over text when restarting
  
  let restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'none'; // Hide the restart button
  
  backgroundMusic.loop(); // Start playing background music and loop it
}

class Bug {
  constructor() {
    this.size = 200;
    this.x = random(width - this.size);  
    this.y = random(height - this.size); 
    this.time = frameCount;
    this.duration = 60;
    this.speed = 2;
    this.direction = createVector(random(-1, 1), random(-1, 1)).normalize();
    this.rotation = random(TWO_PI); 
    this.rotationSpeed = random(-0.05, 0.05); 
  }

  update() {
    if (random() < 0.01) {
      this.direction = createVector(random(-1, 1), random(-1, 1)).normalize();
    }

    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
    this.rotation += this.rotationSpeed;
  }

  show() {
    push();
    translate(this.x + this.size / 2, this.y + this.size / 2); 
    rotate(this.rotation); 
    imageMode(CENTER); 
    image(bugImage, 0, 0, this.size, this.size); 
    pop();
  }

  contains(px, py) {
    let d = dist(px, py, this.x + this.size / 2, this.y + this.size / 2); 
    return d < this.size / 2;
  }

  offscreen() {
    return false;
  }
}
