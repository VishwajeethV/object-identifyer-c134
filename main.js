IMG="";
status="";
objects=[];

function preload() {
    IMG=loadImage("dog_cat.jpg");
}

function setup() {
    canvas=createCanvas(400,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(400,300)
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects";
}

function modelloaded() {
    console.log("model is loaded");
    status= true;
  
}

function getResult(error,results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw() { 
    image(video,0,0,400,300);

    /*fill("red");
    textSize(20);
    text("Dog",100,70);
    noFill();
    stroke("purple");
    strokeWeight(5)
    rect(100,50,320,400);

    fill("red");
    textSize("20");
    text("cat" , 325,90);
    noFill();
    stroke("purple");
    strokeWeight(5);
    rect(320,70,320,400);*/

    if(status!="") {
        r=random(255);
        g=random(255);
        b=random(255);  
        objectdetector.detect(video,getResult);
        for(var i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("noofobjectsdetected").innerHTML = "Number of objects detected are : "+ objects.length;
             fill(r,g,b);
             textSize(20);
             percent=floor(objects[i].confidence*100)
             text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+20);
             noFill();
             stroke("purple");
             strokeWeight(5);
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }






}