# 🐦 Flappy Bird Game - PHP Edition

A web-based Flappy Bird game built with PHP, HTML5 Canvas, and JavaScript.

## Features

- **Classic Flappy Bird gameplay** - Navigate the bird through pipes by clicking or pressing spacebar
- **Smooth animations** - Bird rotation based on velocity and fluid pipe movement
- **Score tracking** - Real-time score display with persistent high score storage
- **PHP-powered high scores** - Uses PHP cookies to store high scores across sessions
- **Responsive design** - Beautiful gradient backgrounds and modern UI
- **Game states** - Proper game state management (waiting, playing, game over)

## Files Structure

```
flappybird/
├── index.php          # Main game file with HTML structure and styling
├── game.js            # JavaScript game logic and rendering
├── score.php          # PHP script for high score management
└── README.md          # This documentation file
```

## How to Play

1. **Start the game** - Click the "Start Game" button
2. **Control the bird** - Press SPACEBAR or click anywhere to make the bird flap
3. **Avoid obstacles** - Navigate through the green pipes without touching them
4. **Score points** - Each pipe you pass through increases your score
5. **Beat your high score** - Try to achieve the highest score possible!

## Installation & Setup

### Prerequisites
- XAMPP, WAMP, or any local PHP server
- Modern web browser with HTML5 Canvas support

### Running the Game

1. **Copy files** to your web server directory:
   ```
   d:\xampp1\htdocs\flappybird\
   ```

2. **Start your PHP server** (XAMPP/WAMP)

3. **Open in browser**:
   ```
   http://localhost/flappybird/
   ```

## Technical Details

### PHP Components
- **index.php**: Serves the main game page and retrieves stored high scores
- **score.php**: RESTful API for high score operations (get, set, reset)
- **Cookie storage**: Persistent high score storage using PHP cookies

### JavaScript Game Engine
- **Canvas rendering**: All graphics drawn using HTML5 Canvas 2D context
- **Physics simulation**: Gravity, velocity, and collision detection
- **Game loop**: RequestAnimationFrame for smooth 60fps gameplay
- **Object-oriented design**: Bird and pipe objects with proper state management

### Game Mechanics
- **Bird physics**: Gravity (0.5), jump power (-8), realistic movement
- **Pipe generation**: Random heights with consistent gaps (150px)
- **Collision detection**: Precise boundary checking for bird vs pipes/ground
- **Scoring system**: Points awarded for each pipe successfully passed

## Controls

- **SPACEBAR**: Make the bird flap (jump)
- **Mouse Click**: Alternative flap control
- **Start Game Button**: Begin a new game
- **Reset High Score Button**: Clear the stored high score

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with HTML5 Canvas support

## Customization

You can easily modify the game by editing these variables in `game.js`:

```javascript
// Bird properties
bird.gravity = 0.5;        // How fast bird falls
bird.jumpPower = -8;       // How strong the flap is

// Pipe settings
const pipeGap = 150;       // Gap between pipes
const pipeSpeed = 2;       // How fast pipes move

// Visual settings
bird.color = '#FFD700';    // Bird color
```

## Future Enhancements

- Sound effects and background music
- Multiple bird characters/skins
- Power-ups and special abilities
- Leaderboard with multiple players
- Mobile touch controls optimization
- Particle effects for collisions

## License

This project is open source and available under the MIT License.

---

**Enjoy playing Flappy Bird! 🎮**
