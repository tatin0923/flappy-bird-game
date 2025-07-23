// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Audio system
const sounds = {
    flap: null,
    score: null,
    hit: null
};

// Initialize audio
function initAudio() {
    // Create audio contexts for sound effects
    sounds.flap = createBeepSound(200, 0.1, 'sine'); // High pitched flap
    sounds.score = createBeepSound(400, 0.2, 'square'); // Score sound
    sounds.hit = createBeepSound(150, 0.3, 'sawtooth'); // Hit sound
}

// Create beep sound using Web Audio API
function createBeepSound(frequency, duration, waveType = 'sine') {
    return function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = waveType;
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('Audio not supported');
        }
    };
}

// Play sound function
function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName]();
    }
}

let gameState = 'waiting'; // waiting, playing, gameOver
let score = 0;
let highScore = parseInt(localStorage.getItem('flappy_high_score')) || 0;

// Bird object
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 25,
    velocity: 0,
    gravity: 0.5,
    jumpPower: -8,
    color: '#FFD700'
};

// Pipes array
let pipes = [];
const pipeWidth = 60;
const pipeGap = 150;
const pipeSpeed = 2;

// Game loop
let animationId;

// Initialize game
function init() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    updateScore();
    gameState = 'waiting';
    document.getElementById('gameOver').style.display = 'none';
    
    // Initialize audio system
    initAudio();
}

// Start game
function startGame() {
    init();
    gameState = 'playing';
    gameLoop();
}

// Game loop
function gameLoop() {
    if (gameState !== 'playing') return;
    
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

// Update game logic
function update() {
    // Update bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    // Generate pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        generatePipe();
    }
    
    // Update pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= pipeSpeed;
        
        // Remove pipes that are off screen
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
            updateScore();
            playSound('score'); // Play score sound
        }
    }
    
    // Check collisions
    checkCollisions();
}

// Generate new pipe
function generatePipe() {
    const minHeight = 50;
    const maxHeight = canvas.height - pipeGap - minHeight;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + pipeGap
    });
}

// Check collisions
function checkCollisions() {
    // Ground and ceiling collision
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        playSound('hit'); // Play hit sound
        gameOver();
        return;
    }
    
    // Pipe collision
    for (let pipe of pipes) {
        if (bird.x + bird.width > pipe.x && 
            bird.x < pipe.x + pipeWidth) {
            
            if (bird.y < pipe.topHeight || 
                bird.y + bird.height > pipe.bottomY) {
                playSound('hit'); // Play hit sound
                gameOver();
                return;
            }
        }
    }
}

// Game over
function gameOver() {
    gameState = 'gameOver';
    cancelAnimationFrame(animationId);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').textContent = highScore;
        // Save high score to localStorage
        localStorage.setItem('flappy_high_score', highScore);
    }
    
    document.getElementById('gameOver').style.display = 'block';
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#70c5ce');
    gradient.addColorStop(0.75, '#70c5ce');
    gradient.addColorStop(0.75, '#ded895');
    gradient.addColorStop(1, '#ded895');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#2c5530';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
    
    // Draw pipes
    ctx.fillStyle = '#228B22';
    for (let pipe of pipes) {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
        
        // Pipe caps
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipeWidth + 10, 20);
        ctx.fillRect(pipe.x - 5, pipe.bottomY, pipeWidth + 10, 20);
        ctx.fillStyle = '#228B22';
    }
    
    // Draw bird
    drawBird();
    
    // Draw instructions if waiting
    if (gameState === 'waiting') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Click Start Game to Begin!', canvas.width / 2, canvas.height / 2);
        ctx.fillText('Press SPACE or Click to Flap', canvas.width / 2, canvas.height / 2 + 40);
    }
}

// Draw bird with animation
function drawBird() {
    ctx.save();
    ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    
    // Rotate bird based on velocity
    const rotation = Math.min(Math.max(bird.velocity * 0.1, -0.5), 0.5);
    ctx.rotate(rotation);
    
    // Bird body
    ctx.fillStyle = bird.color;
    ctx.fillRect(-bird.width / 2, -bird.height / 2, bird.width, bird.height);
    
    // Bird wing
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(-bird.width / 2 + 5, -bird.height / 2 + 5, 15, 8);
    
    // Bird eye
    ctx.fillStyle = 'white';
    ctx.fillRect(-bird.width / 2 + 18, -bird.height / 2 + 3, 8, 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(-bird.width / 2 + 20, -bird.height / 2 + 5, 4, 4);
    
    // Bird beak
    ctx.fillStyle = '#FF4500';
    ctx.fillRect(bird.width / 2 - 5, -3, 8, 6);
    
    ctx.restore();
}

// Bird jump
function jump() {
    if (gameState === 'playing') {
        bird.velocity = bird.jumpPower;
        playSound('flap'); // Play flap sound
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Reset high score
function resetHighScore() {
    highScore = 0;
    document.getElementById('highScore').textContent = '0';
    localStorage.setItem('flappy_high_score', '0');
}

// Event listeners
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        
        if (gameState === 'waiting') {
            // Start the game
            startGame();
        } else if (gameState === 'gameOver') {
            // Restart the game
            startGame();
        } else if (gameState === 'playing') {
            // Jump during gameplay
            jump();
        }
    }
});

// Mouse events
canvas.addEventListener('click', jump);

// Touch events for mobile
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    jump();
}, { passive: false });

canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
}, { passive: false });

// Prevent scrolling on mobile
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

// Handle window resize for responsive canvas
function resizeCanvas() {
    const container = canvas.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    if (window.innerWidth <= 480) {
        // Mobile responsive sizing
        const maxWidth = Math.min(380, window.innerWidth * 0.95);
        const maxHeight = Math.min(570, window.innerHeight * 0.7);
        
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = maxHeight + 'px';
    }
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', function() {
    setTimeout(resizeCanvas, 100);
});

// Initialize the game
init();
draw();
resizeCanvas();
