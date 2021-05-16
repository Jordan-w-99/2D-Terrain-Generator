let TG;
let fps;

function setup() 
{
	createCanvas(1000, 1000);

    TG = new TerrainGenerator(width, height);
    TG.generate();

    background(0);
    TG.drawTerrain(false);

    fps = createElement("p", "");
    fps.id("fps");
}

function draw()
{   
    TG.drawTerrain(mouseIsPressed);

    document.getElementById("fps").innerText = frameRate();
}