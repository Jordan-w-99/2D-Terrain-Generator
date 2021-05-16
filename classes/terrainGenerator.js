class TerrainGenerator {
    constructor(width, height) {
        this.terrain = [];
        this.width = width;
        this.height = height;
        this.baseNoiseOffset = createVector(random(0, 9999), random(0, 9999));
        this.baseNoiseInc = 0.007;
        this.detailNoiseOffset = createVector(random(0, 9999), random(0, 9999));
        this.detailNoiseInc = 0.01;
        this.seaLevel = 0.4;

        this.posOffset = createVector(0, 0);
    }

    generate() {
        this.terrain = [];

        for (let i = 0; i < this.height; i++) {
            let row = [];

            for (let j = 0; j < this.width; j++) {
                let base = noise(this.baseNoiseOffset.x + this.baseNoiseInc * j, this.baseNoiseOffset.y + this.baseNoiseInc * i);
                let detail = noise(this.detailNoiseOffset.x + this.detailNoiseInc * j, this.detailNoiseOffset.y + this.detailNoiseInc * i) / 10;
                row.push(base + detail);
            }

            this.terrain.push(row);
        }
    }

    drawTerrain(mouseDown) {
        push();


        loadPixels();

        if(mouseDown){
            this.seaLevel = this.map(mouseX, 0, width, 0.2, 0.8);
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let h = this.terrain[y][x];
                let col = [0, 0, 0];

                if (h < this.seaLevel) {
                    col[1] = this.map(h, 0, this.seaLevel, 70, 110);
                    col[2] = this.map(h, 0, this.seaLevel, 120, 200);
                }
                else {
                    col[0] = this.map(h, this.seaLevel, 1, 60, 100);
                    col[1] = this.map(h, this.seaLevel, 1, 90, 160);
                }

                // loop over
                let index = (x + y * width) * 4;

                pixels[index] = col[0];
                pixels[index + 1] = col[1];
                pixels[index + 2] = col[2];
            }
        }
        updatePixels();

        pop();
    }

    map(val, valMin, valMax, resMin, resMax){
        let valRange = valMax - valMin;
        let valPercent = val / valRange;
    
        let resRange = resMax - resMin;
        let res = resMin + resRange * valPercent;
    
        return res;
    }
}