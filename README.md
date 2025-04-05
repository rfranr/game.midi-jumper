# game.midi-jumper


# 🎹 midi-jumper

A simple interactive MIDI-based music visualization using **Three.js** and **Tone.js**. Notes from a MIDI file are visualized as animated colored lines in a 3D scene, and played using a basic synth.

<!-- Optional: Add a real screenshot or GIF here -->
![image](https://github.com/user-attachments/assets/6b947fcf-1f2d-4ec0-af12-54b427ee8512)
![image](https://github.com/user-attachments/assets/23fbb9d8-fb31-4c1a-b269-efeb9e69e4b4)



## ✨ Features

-   Visualizes MIDI notes as animated 3D bars.
    
-   Synth playback using Tone.js.
    
-   3D rendering powered by [Three.js](https://threejs.org/).
    
-   Orbit controls for interactive camera movement.
    
-   GUI to control visualization velocity using lil-gui.
    

## 🧰 Built With

-   [Three.js](https://threejs.org/) – 3D graphics
    
-   Tone.js – Web Audio API framework
    
-   lil-gui – lightweight GUI controls
    

## 🚀 Getting Started

### Prerequisites

-   Node.js
    
-   A MIDI file available to load (default is loaded via `main()` in `midi.ts`)
    

### Installation

``` bash
git clone https://github.com/rfranr/game.midi-jumper.git 
cd three-js-ts
npm install
npm run dev
``` 

Then open the local server (usually at http://localhost:5173) in your browser.

> The splash screen includes a **Start Game** button to initialize the audio context.

## 🕹️ Controls

-   Use mouse to rotate/zoom camera (OrbitControls)
    
-   Adjust "Velocity" in the GUI to control scrolling speed
    
-   Click **Start Game** to begin MIDI playback and visualization
    

## 📁 Project Structure

```
├── midi.ts     # MIDI parsing and Tone.js integration 
├── main.ts     # Visualization logic 
├── style.css   # Basic styling 
├── index.html  # Entry point with splash screen
``` 

## 🧠 How It Works

-   MIDI file is parsed via `main()` in `midi.ts`.
    
-   Each note triggers a line (box) to appear in the scene.
    
-   The synth plays the note in sync with its visual representation.
    
-   Velocity controls how fast the notes scroll across the screen.
    

## 🎧 Example

> This works best with short melodic MIDI files. Consider replacing the sample MIDI with your own.

## 📜 License

MIT
