var mic;
var fft;
var maxFreq;
var maxBin;

function setup(){
    var cnv = createCanvas(1280,720);
    cnv.mousePressed(userStartAudio);
    background(0);
    
    fft=new p5.FFT();

    mic=new p5.AudioIn();
    mic.start();
    fft.setInput(mic);

    textSize(25);
}

function draw(){
    background(255,255,255);
    var spectrum=fft.analyze();
    noStroke();
    fill(255,0,255);
    for(var i=0;i<spectrum.length;i++){
        var x=map(i,0,spectrum.length,0,width);
        var h=-height+map(spectrum[i],0,255,height,0);
        rect(x,height,width/spectrum.length,h);
    }
    endShape();

    maxFreq=0;
    maxBin=0;
    for(var i=0;i<spectrum.length;i++){
        if(maxFreq<spectrum[i]){
            maxFreq=spectrum[i];
            maxBin=i;
        }

    }

    fill(0);
    text("FrameRate: "+Math.floor(frameRate()),5,15+10);
    text("micLv: "+mic.getLevel(),5,50+10);
    text("maxFrequency: "+GetFrequency(maxBin),5,85+10);
    text("maxBin: "+maxBin,5,120+10);
}

function GetFrequency(bin){
    var constant=0.042020781;
    return bin/constant;
}