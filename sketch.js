let TG;
let fps;

// GUI
let seaLevelSlider;
let regenerateButton;

function setup() 
{
	// Canvas Setup
    createCanvas(800, 800);

    // Terrain Gen setup
    TG = new TerrainGenerator(width, height);
    TG.generate();
    
    // Fps display Setup   
    fps = createElement("p", "");
    fps.id("fps");

    // GUI setup
    seaLevelSlider = createSlider(0.0001, 0.8, 0.25, 0.0001);

    regenerateButton = createButton("Regenerate");
    regenerateButton.mousePressed(regenerate);
}

function draw()
{   
    background(0, 90, 160);

    // Update Terrain
    TG.updateParams(seaLevelSlider.value());

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
    document.getElementById("fps").innerText = frameRate();
}

function regenerate(){
    TG.regenerate();
}
