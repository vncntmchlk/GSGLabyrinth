let mouseVel;
let cubeNewPos;
let lastXY;
let mitte;
let imgPathAll = [
    'src/pics/1.jpg',
    'src/pics/2.jpg',
    'src/pics/3.jpg',
    'src/pics/4.jpg',
    'src/pics/5.jpg',
    'src/pics/6.jpg',
    'src/pics/7.jpg',
    'src/pics/8.jpg',
    'src/pics/9.jpg'
];
let samplePathAll = [
    "src/sf/sample_1.mp3",
    "src/sf/sample_2.mp3",
    "src/sf/sample_3.mp3",
    "src/sf/sample_4.mp3",
    "src/sf/sample_5.mp3",
    "src/sf/sample_6.mp3",
    "src/sf/sample_7.mp3",
    "src/sf/sample_8.mp3",
    "src/sf/sample_9.mp3"
  ];
let samples = [];
let imgs = []; // Load the image
let maskedImages = [];
let posW;
let posH;
let sizeW;
let sizeH;
let gradientImg;
let timeLast = Date.now();
let randArr;
let centerVector;
let heightIndex = 88888;//99999;
let widthIndex = 88888;
let maxMagVal;
let lastVolumes;
let loadText;
let speedX = 0;
let speedY = 0;
let drift;
// let allLoaded = [0,0,0,0,0,0,0,0,0];

function preload() { // alle samples laden
    let elt = document.getElementById('textPos');
    loadText = createP(`Musik und Bilder werden geladen... `); //searchSound.duration()
    loadText.parent(elt);
    imgPathAll.forEach(function(img){
        imgs.push(loadImage(img));
    });
    gradientImg = loadImage('src/pics/gradient.png');
    samplePathAll.forEach(function(sample) {
        samples.push(loadSound(sample));
    });
}

// function preload() { // alle samples laden
//     gradientImg = loadImage('src/pics/gradient.png');
// }

// function incrLoadArr (index){
//     allLoaded[index]++;
// }

// function loadAll() { // alle samples laden
//     imgPathAll.forEach(function(img, index){
//         imgs.push(loadImage(img, incrLoadArr(index)));
//     });
//     samplePathAll.forEach(function(sample, index) {
//         samples.push(loadSound(sample, incrLoadArr(index)));
//     });
// }

function setup() {
    loadText.hide();
    createCanvas(windowWidth * 0.95, windowHeight * 0.95);

    if (Controller && Controller.supported) {
        Controller.search();
      
        window.addEventListener('gc.button.hold', function(event) {
            var stick = event.detail;
            //console.log(stick.name, stick.value);
            if (stick.name == 'MISCAXIS_1') { 
                speedX = stick.value
            };
            if (stick.name == 'MISCAXIS_2') { 
                speedY = stick.value
            };
            }, false);
    };
        


    cubeNewPos = createVector(0,0);
    centerVector = createVector(width/2, height/2);
    mitte = createVector(width/2 * 0.85, height/2 * 0.85);
    maxMagVal = width + height;
    randArr = Array.from({length: (4 * 4)}, (v,i) => i);
    lastVolumes = Array.from({length: 9}, (v,i) => -1);
    // console.log(lastVolumes);
    for (i = 0; i < 9; i++){
        let indx = floor(randArr.length * random());
        let removedItem = randArr.splice(indx,1);
    }
    posW = [
        0,
        (width/2),
        width,
        width * 1.5
    ];
    posH = [
        0,
        (height/2),
        height,
        height * 1.5
    ];
    if(width < height){
        sizeW = width/2.5;
        sizeH = width/2.5;
    } else {
        sizeW = height/2.5;
        sizeH = height/2.5;
    }
    // frameRate(10);
    noLoop();
    imageMode(CENTER);
    imgs.forEach(function(img){
        let newImg;
        let newMask = makeMask(sizeW, sizeH);
        (newImg = img.get()).mask(newMask);
        maskedImages.push(newImg);
    });
    drift = createVector(5, 5);
    joyStickMoved()
    // console.log(timeLast)
}

function joyStickMoved() {
    let newXY = createVector(speedX, speedY).mult(25);   
    //mouseVel = p5.Vector.sub(newXY, lastXY);
    //mouseVel.limit(15); //2.5 //15
    cubeNewPos.add(drift);
    cubeNewPos.sub(newXY);

    if (abs(cubeNewPos.y) > height/2) {
        if(cubeNewPos.y > 0){
            heightIndex++;
        } else {
            heightIndex--;
        }
        cubeNewPos.y = cubeNewPos.y % (height/2);
    }
    if (abs(cubeNewPos.x) > width/2) {
        if(cubeNewPos.x > 0){
            widthIndex++;
        } else {
            widthIndex--;
        }
        cubeNewPos.x = cubeNewPos.x % (width/2);
    };
    redraw();
    setTimeout(joyStickMoved, 50);
}

// function touchMoved() {
//     let timeNow = Date.now();
//         if (timeNow - timeLast > 20){
//         let newXY = createVector(mouseX, mouseY);   
//         mouseVel = p5.Vector.sub(newXY, lastXY);
//         mouseVel.limit(15); //2.5 //15
//         cubeNewPos.add(mouseVel);
//         // cubeNewPos.limit(1500);
//         // if (abs(cubeNewPos.y) > height/2) {
//         //     if(cubeNewPos.y > 0){
//         //         heightIndex++;
//         //     } else {
//         //         heightIndex--;
//         //     }
//         //     cubeNewPos.y = cubeNewPos.y % (height/2);
//         // }
//         // if (abs(cubeNewPos.x) > width/2) {
//         //     if(cubeNewPos.x > 0){
//         //         widthIndex++;
//         //     } else {
//         //         widthIndex--;
//         //     }
//         //     cubeNewPos.x = cubeNewPos.x % (width/2);
//         // }
//         if (abs(cubeNewPos.y) > height/2) {
//             if(cubeNewPos.y > 0){
//                 heightIndex++;
//             } else {
//                 heightIndex--;
//             }
//             cubeNewPos.y = cubeNewPos.y % (height/2);
//         }
//         if (abs(cubeNewPos.x) > width/2) {
//             if(cubeNewPos.x > 0){
//                 widthIndex++;
//             } else {
//                 widthIndex--;
//             }
//             cubeNewPos.x = cubeNewPos.x % (width/2);
//         }
//         // console.log(cubeNewPos);
//         lastXY = newXY;
//         redraw();
//         timeLast = Date.now();
//     }
// }

function makeMask (sizeW, sizeH) {
    let maskImg = createGraphics(sizeW, sizeH);
    
    maskImg.noStroke();
    maskImg.fill(0);
    // maskImg.ellipse(size/2,size/2,size,size);

    var radius = (sizeW + sizeH)/4;
    let randVal = random(100,300);
    let randVal2 = random(-45,-95);
    let randVal3 = random(0.1,0.3);
    
    maskImg.beginShape();
    let xoff = 0;
    for (var a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, randVal), 0, 1, -randVal2, randVal2);
      let r = radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x + (maskImg.width / 2), y + ( maskImg.height / 2));
      xoff += randVal3;
    }
    maskImg.endShape();

    return maskImg
}


function draw () {
    background(0);

    // push();
    translate(cubeNewPos.x, cubeNewPos.y);
    // fill(255);
    // textSize(15);
    // let cnt = 0;
    // for(i = 0; i <= 3; i++){
    //     for(j = 0; j <= 3; j++){
    //         text(cnt, posW[(j + widthIndex) % 4], posH[(i + heightIndex) % 4]);
    //         cnt++
    //     }
    // }
    // text("1", posW[(0 + widthIndex) % 4], posH[(0 + heightIndex) % 4]);
    // text("2", posW[(1 + widthIndex) % 4], posH[(0 + heightIndex) % 4]);
    // text("3", posW[(2 + widthIndex) % 4], posH[(0 + heightIndex) % 4]);
    // text("4", posW[(3 + widthIndex) % 4], posH[(0 + heightIndex) % 4]);
    // text("5", posW[(0 + widthIndex) % 4], posH[(1 + heightIndex) % 4]);
    // text("6", posW[(1 + widthIndex) % 4], posH[(1 + heightIndex) % 4]);
    // text("7", posW[(2 + widthIndex) % 4], posH[(1 + heightIndex) % 4]);
    // text("8", posW[(3 + widthIndex) % 4], posH[(1 + heightIndex) % 4]);
    // text("9", posW[(0 + widthIndex) % 4], posH[(2 + heightIndex) % 4]);
    // text("10", posW[(1 + widthIndex) % 4], posH[(2 + heightIndex) % 4]);
    // text("11", posW[(2 + widthIndex) % 4], posH[(2 + heightIndex) % 4]);
    // text("12", posW[(3 + widthIndex) % 4], posH[(2 + heightIndex) % 4]);
    // text("13", posW[(0 + widthIndex) % 4], posH[(3 + heightIndex) % 4]);
    // text("14", posW[(1 + widthIndex) % 4], posH[(3 + heightIndex) % 4]);
    // text("15", posW[(2 + widthIndex) % 4], posH[(3 + heightIndex) % 4]);
    // text("16", posW[(3 + widthIndex) % 4], posH[(3 + heightIndex) % 4]);

    // fill(colors[(0 + heightIndex) % 3]);
    // ellipse(width/2, 0, sizes[(0 + widthIndex) % 3]);
    // ellipse(0, 0, sizes[(1 + widthIndex) % 3]);
    // ellipse(width, 0, sizes[(2 + widthIndex) % 3]);
    // fill(colors[(1 + heightIndex) % 3]);
    // ellipse(width/2, height/2, sizes[(0 + widthIndex) % 3]);
    // ellipse(0, height/2, sizes[(1 + widthIndex) % 3]);
    // ellipse(width, height/2, sizes[(2 + widthIndex) % 3]);
    // fill(colors[(2 + heightIndex) % 3]);
    // ellipse(width/2, height, sizes[(0 + widthIndex) % 3]);
    // ellipse(0, height, sizes[(1 + widthIndex) % 3]);
    // ellipse(width, height, sizes[(2 + widthIndex) % 3]);


    // image(maskedImages[0], posW[(0 + widthIndex) % 3], posH[(0 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[1], posW[(1 + widthIndex) % 3], posH[(0 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[2], posW[(2 + widthIndex) % 3], posH[(0 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[3], posW[(0 + widthIndex) % 3], posH[(1 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[4], posW[(1 + widthIndex) % 3], posH[(1 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[5], posW[(2 + widthIndex) % 3], posH[(1 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[6], posW[(0 + widthIndex) % 3], posH[(2 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[7], posW[(1 + widthIndex) % 3], posH[(2 + heightIndex) % 3], sizeW, sizeH);
    // image(maskedImages[8], posW[(2 + widthIndex) % 3], posH[(2 + heightIndex) % 3], sizeW, sizeH);
    let cnt = 0;
    let imgIndex = 0;
    let centreDiff = p5.Vector.sub(centerVector, cubeNewPos);
    for(i = 0; i <= 3; i++){
        for(j = 0; j <= 3; j++){
            if(randArr.includes(cnt)){
                // console.log(allLoaded[imgIndex]);
                // if(allLoaded[imgIndex] == 2) {
                let imgPos = createVector(posW[(j + widthIndex) % 4], posH[(i + heightIndex) % 4]);
                let imgPosDiff = p5.Vector.sub(centreDiff, imgPos).mag();
                let volume = map(imgPosDiff, 0, maxMagVal, 1, -6);
                // volume = volume < 0 ? 0 : volume;
                image(maskedImages[imgIndex], imgPos.x, imgPos.y, sizeW, sizeH);
                // if(imgIndex == 0){
                if(volume > 0){
                    if(lastVolumes[imgIndex] <= 0){
                        // console.log("play")
                        samples[imgIndex].loop();
                    }
                    // console.log(volume);
                    samples[imgIndex].setVolume(volume);
                } else {
                    if(lastVolumes[imgIndex] > 0){
                        // console.log("stop")
                        samples[imgIndex].pause();
                    }
                }
                // }
                lastVolumes[imgIndex] = volume;
                // }
                imgIndex++;
            } 
            cnt++
        }
    }
    // ellipse(centreDiff.x, centreDiff.y, 150);
    image(gradientImg, centreDiff.x, centreDiff.y, width, height);
    // pop();
  
    
    // let cnt = 0;
    // let imgIndex = 0;
    // for(i = 0; i <= 3; i++){
    //     for(j = 0; j <= 3; j++){
    //         if(randArr.includes(cnt)){
    //             image(maskedImages[imgIndex], posW[(j + widthIndex) % 4], posH[(i + heightIndex) % 4], sizeW, sizeH);
    //             imgIndex++;
    //         } 
    //         cnt++
    //     }
    // }
    // pop();
    // image(gradientImg,width/2,height/2,width,height);
    // noStroke();
    // fill(100,100);
    // rect(0, 0, width, height)

    // let b1, b2;
    // b1 = color(0);
    // b2 = color(255,0);
    // setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
    // setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
    
}
