<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>🐦 Flappy Bird - Play Online</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(to bottom, #70c5ce, #459ba8);
            font-family: Arial, sans-serif;
            touch-action: manipulation;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            overflow: hidden;
        }
        
        .game-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        canvas {
            border: 3px solid #2c5530;
            border-radius: 10px;
            background: linear-gradient(to bottom, #70c5ce 0%, #70c5ce 75%, #ded895 75%, #ded895 100%);
            max-width: 100vw;
            max-height: 80vh;
            width: auto;
            height: auto;
            touch-action: none;
        }
        
        @media (max-width: 480px) {
            canvas {
                width: 95vw;
                height: 70vh;
                max-width: 380px;
                max-height: 570px;
            }
            
            .game-container {
                padding: 10px;
                margin: 5px;
            }
            
            .controls {
                font-size: 16px;
            }
            
            button {
                padding: 10px 20px;
                font-size: 14px;
                margin: 3px;
            }
        }
        
        .controls {
            margin-top: 15px;
            color: white;
            font-size: 18px;
        }
        
        .score {
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .game-over {
            color: #ff4444;
            font-size: 28px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 25px;
            cursor: pointer;
            margin: 5px;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #45a049;
        }
        
        .high-score {
            color: #ffdd44;
            font-size: 16px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 style="color: white; margin-top: 0;">🐦 Flappy Bird</h1>
        <div class="score">Score: <span id="score">0</span></div>
        <div class="high-score">High Score: <span id="highScore"><?php echo isset($_COOKIE['flappy_high_score']) ? $_COOKIE['flappy_high_score'] : '0'; ?></span></div>
        
        <canvas id="gameCanvas" width="400" height="600"></canvas>
        
        <div class="controls">
            <div>🎮 Tap screen or press SPACEBAR to flap!</div>
            <button onclick="startGame()">🚀 Start Game</button>
            <button onclick="resetHighScore()">🔄 Reset High Score</button>
        </div>
        
        <div id="gameOver" class="game-over" style="display: none;">
            Game Over! 
            <br>
            <button onclick="startGame()">Play Again</button>
        </div>
    </div>

    <script src="game.js"></script>
</body>
</html>
