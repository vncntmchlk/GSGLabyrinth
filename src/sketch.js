let mouseVel;
let cubeNewPos;
let lastXY;
let kreise = [];
let mitte;
let samplePathAll = [
    "src/sf/sample_1.mp3",
    "src/sf/sample_2.mp3",
    "src/sf/sample_3.mp3",
    "src/sf/sample_4.mp3",
    "src/sf/sample_5.mp3",
    "src/sf/sample_6.mp3",
    "src/sf/sample_7.mp3",
    "src/sf/sample_8.mp3",
    "src/sf/sample_9.mp3",
    "src/sf/sample_10.mp3",
    "src/sf/sample_11.mp3",
    "src/sf/sample_12.mp3",
    "src/sf/sample_13.mp3",
    "src/sf/sample_14.mp3",
    "src/sf/sample_15.mp3",
    "src/sf/sample_16.mp3",
    "src/sf/sample_17.mp3",
    "src/sf/sample_18.mp3",
    "src/sf/sample_19.mp3",
    "src/sf/sample_20.mp3",
    "src/sf/sample_21.mp3",
    "src/sf/sample_22.mp3",
    "src/sf/sample_23.mp3",
    "src/sf/sample_24.mp3",
    "src/sf/sample_25.mp3"
  ];
let samples = [];

function preload() { // alle samples laden
    samplePathAll.forEach(function(sample) {
      samples.push(loadSound(sample));
    });
}
  

function setup() {
    createCanvas(600, 600);
    cubeNewPos = createVector(0,0);
    mitte = createVector(width/2 * 0.85, height/2 * 0.85);
    noStroke();
    let size = width * 0.85;
    let overLap = 1.5;
    let cnt = 0;
    for(i = -2; i < 3; i++){
        for(j = -2; j < 3; j++){
            let x = j * (size);
            let y = i * (size);
            kreise.push(new SoundKreis (x, y, size * overLap, [i, j], samples[cnt]));
            cnt ++;
            //ellipse(x + (size/10), y + (size/10),size,size);
            //text([x + (size/10), y + (size/10)], x + (size/10), y + (size/10));
        }
    }
    frameRate(15)
    // mouseVel = createVector(0,0);
}

// function mouseDragged(event) {
//     let newXY = createVector(event['clientX'], event['clientY']);   
//     mouseVel = p5.Vector.sub(newXY, lastXY);
//     mouseVel.limit(2.5);
//     cubeNewPos.add(mouseVel);
//     cubeNewPos.limit(1500);
//     // console.log(cubeNewPos);
//     lastXY = newXY;
// }

function touchMoved(event) {
    let newXY = createVector(event['clientX'], event['clientY']);   
    mouseVel = p5.Vector.sub(newXY, lastXY);
    mouseVel.limit(2.5);
    cubeNewPos.add(mouseVel);
    cubeNewPos.limit(1500);
    // console.log(cubeNewPos);
    lastXY = newXY;
}

function draw () {
    background(250);
    translate(cubeNewPos.x, cubeNewPos.y);
    let distFrom = p5.Vector.sub(mitte, cubeNewPos);
    kreise.forEach(function(kreis){
        kreis.display();
        kreis.distFromCanvasCenter(distFrom);
    });
    // kreise[12].distFromCanvasCenter(distFrom); // muss noch um width/ height halbe verschoben werden dann ist alles paletti
}

function clip (val, min, max) {
    return Math.min(max, Math.max(min, val));
}

class SoundKreis {  
    constructor (x, y, s, num, mySample) {
        this.pos = createVector(x,y);
        this.size = s;
        this.num = num;
        this.color = [255,0,0,20];
        this.sample = mySample;
        this.lastVolume = 0;
        this.volume = 0;
    }

    distFromCanvasCenter (centerPos) {
        let dist = abs(p5.Vector.sub(this.pos, centerPos).mag());
        let clipped = clip(dist, 0, 550);
        let newColor = map(clipped, 0, 550, 0, 255);
        this.color = [255,0,0, 255 - clip(newColor,0,255)];
        this.volume = 1 - map(clipped, 0, 550, 0, 1);
        // console.log(dist, this.pos, centerPos);
        if(this.volume > 0){
            if(this.lastVolume == 0){
                if(!this.sample.isPlaying()){
                    this.sample.loop();
                }
            }
            this.sample.setVolume(this.volume);
            // console.log(this.volume, this.num)
        } else {
            if(this.lastVolume > 0){
                if(this.sample.isPlaying()){
                    this.sample.pause();
                }
            }
        }
        this.lastVolume = this.volume;
    }

    display () {
        let resize = this.size / 10;
        fill(this.color);
        ellipse(this.pos.x + resize, this.pos.y + resize,this.size,this.size);
        text(this.num, this.pos.x + resize, this.pos.y + resize); //[this.pos.x + resize, this.pos.y + resize]]
    }

}


// let mouseVel;
// let cubeNewPos;
// let lastXY;

// function setup() {
//     createCanvas(600, 600, WEBGL);
//     cubeNewPos = createVector(0,0);
//     frameRate(10)
//     // mouseVel = createVector(0,0);
// }

// function mouseDragged(event) {
//     let newXY = createVector(event['clientX'], event['clientY']);   
//     mouseVel = p5.Vector.sub(newXY, lastXY);
//     mouseVel.limit(0.3);
//     cubeNewPos.add(mouseVel);
//     lastXY = newXY;

// }

// function draw() {
//     background(250);
  
//     // normalMaterial();
//     // ambientLight(60, 60, 60);
//     pointLight(255, 100, 255, 50, 200, 100);
//     specularMaterial(250);
//     // ambientMaterial(250);

//     fill(100,100,100,100);
  
//     // push();
//     rotateX(-cubeNewPos.y * 0.01);
//     rotateY(cubeNewPos.x * 0.01);
//     box(300, 300, 300);
//     // pop();
// }
  
  