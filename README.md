# 🐍 Snake Game

A modern, responsive Snake game built with React and Vite featuring a retro arcade aesthetic with both keyboard and mobile touch controls.

## ✨ Features

- **Classic Snake Gameplay** - Navigate the snake to eat food and grow longer
- **Progressive Difficulty** - Speed increases as your score grows
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Touch Controls** - On-screen controls for mobile/tablet gameplay
- **Keyboard Controls** - Arrow keys for movement, Space to pause, R to restart
- **Retro Aesthetic** - Minimalist black & white theme with CRT screen effects
- **Pause Functionality** - Take a break anytime during gameplay
- **Score Tracking** - Real-time score display with game over summary

## 🎮 Controls

### Desktop
- **Arrow Keys** - Move the snake (Up, Down, Left, Right)
- **Space** - Pause/Resume game
- **R** - Restart game (when game over)

### Mobile/Tablet
- **On-screen D-pad** - Tap directional buttons to move
- **Pause Button** - Pause/Resume game
- **Restart Button** - Restart game (when game over)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snake-game.git
cd snake-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

1. **Start Moving** - Use arrow keys or touch controls to guide the snake
2. **Eat Food** - Guide the snake to the white food squares to grow
3. **Avoid Collisions** - Don't hit the walls or your own tail
4. **Score Points** - Each food item gives you 10 points
5. **Speed Up** - The game gets faster as your score increases

## 🏗️ Technical Details

### Tech Stack
- **React 18** - Component-based UI framework
- **Vite** - Fast development build tool
- **CSS3** - Styling with animations and responsive design
- **JavaScript ES6+** - Modern JavaScript features

### Game Mechanics
- **Grid System** - 20x20 playing field
- **Collision Detection** - Wall and self-collision detection
- **Food Generation** - Random placement avoiding snake body
- **Speed Progression** - Game speed increases by 5ms per food (minimum 50ms)

### File Structure
```
src/
├── App.jsx              # Main game component and logic
├── SnakeGame.css        # Game styling and animations
├── main.jsx            # React app entry point
└── index.css           # Global styles
```

## 🎨 Features Breakdown

### Game Board
- 20x20 grid system
- Pixel-perfect rendering
- Responsive scaling for mobile devices

### Snake
- Dynamic growth system
- Head and body differentiation
- Smooth movement animations

### Food System
- Random generation algorithm
- Collision avoidance with snake body
- Pulsing animation effect

### Controls
- Prevented opposite direction movement
- Debounced input handling
- Touch-friendly mobile controls

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Desktop** - Full keyboard controls with side instruction panels
- **Tablet** - Touch controls with optimized layout
- **Mobile** - Scaled game board with touch controls

## 🐛 Known Issues

- No sound effects yet (planned feature)
- High score not persistent across sessions
- No settings menu for themes

## 🚧 Future Enhancements

- **Sound Effects** - Eating, game over, and background music
- **High Score System** - Local storage for persistent scores
- **Themes** - Multiple color schemes and visual styles
- **Power-ups** - Special items with unique effects
- **Multiplayer** - Local competitive mode
- **Achievements** - Unlockable challenges

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

Made with ❤️ using React & Vite