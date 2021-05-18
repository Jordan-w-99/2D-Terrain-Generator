let TG;
let fps;
let canvas;

// GUI
let seaLevelSlider;
let beachLevelSlider;
let regenerateButton;

function setup() 
{
	// Canvas Setup
    canvas = createCanvas(800, 800);
    canvas.id("terrain-canvas");
    canvas.parent("canvas-container");

    // Terrain Gen setup
    TG = new TerrainGenerator(width, height);
    TG.generate();
    
    // Fps display Setup   
    fps = createElement("p", "");
    fps.id("fps");
    fps.parent("fps-display");

    // GUI setup
    seaLevelSlider = createSlider(0.0001, 0.75, 0.25, 0.0001);
    seaLevelSlider.id("sea-level-slider");
    seaLevelSlider.parent("sea-level-control");
    document.getElementById("sea-level-slider").setAttribute("name", "sea-level-slider");

    beachLevelSlider = createSlider(0, 0.4, 0.035, 0.0001);
    beachLevelSlider.id("beach-level-slider");
    beachLevelSlider.parent("beach-level-control");
    document.getElementById("beach-level-slider").setAttribute("name", "beach-level-slider");

    regenerateButton = createButton("Regenerate");
    regenerateButton.id("regen-button");
    regenerateButton.parent("regen-button-container");
    regenerateButton.mousePressed(regenerate);
}

function draw()
{   
    background(0, 90, 160);

    // Update Terrain
    TG.updateParams(seaLevelSlider.value(), beachLevelSlider.value());

    // Handle Movement
    if(keyIsDown(UP_ARROW)){
        TG.move("u");
    }
    if(keyIsDown(DOWN_ARROW)){
        TG.move("d");
    }
    if(keyIsDown(LEFT_ARROW)){
        TG.move("l");
    }
    if(keyIsDown(RIGHT_ARROW)){
        TG.move("r");
    }

    // Draw terrain
    TG.drawTerrain(mouseIsPressed);

    // Update FPS display
    if(frameCount % 10 == 0) document.getElementById("fps").innerText = floor(frameRate());
}

function regenerate(){
    TG.regenerate();
}
