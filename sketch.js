let TG;
let fps;

// GUI
let seaLevelSlider;
let regenerateButton;

function setup() 
{
	// Canvas Setup
    createCanvas(800, 800);
    background(0);

    // Terrain Gen setup
    TG = new TerrainGenerator(width, height);
    TG.generate();
    
    // Fps display Setup   
    fps = createElement("p", "");
    fps.id("fps");

    // GUI setup
    seaLevelSlider = createSlider(0, 0.8, 0.25, 0.0001);

    regenerateButton = createButton("Regenerate");
    regenerateButton.mousePressed(regenerate);
}

function draw()
{   
    // Update Terrain Params from sliders
    TG.updateParams(seaLevelSlider.value());

    // Draw terrain
    TG.drawTerrain(mouseIsPressed);

    // Update FPS display
    document.getElementById("fps").innerText = frameRate();
}

function regenerate(){
    TG.regenerate();
}
