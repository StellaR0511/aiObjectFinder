identify = "";
objects = [];


function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            identify = document.getElementById("identify").value;
            console.log(objects);
            document.getElementById("status").innerHTML = "Status: Object Detected";
        
            fill("red");
            percent = Math.floor(objects[i].confidence * 100);
            noFill();
            stroke("red");
            if(objects[i].label==identify){
                   console.log("Object Found!") 
                   text1 = objects[i].label;
                   text(text1, objects[i].x - 50,objects[i].y - 50);
                   rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
                   video.stop();
                   document.getElementById("objectfound").innerHTML = identify+" was found!"
            }
            else{
                document.getElementById("objectfound").innerHTML = identify+" was not found."
            }
        }
    }
}

// identify = document.getElementById("identify")
            //console.log(object);
            //document.getElementById("status").innerHTML = "Status: Object Detected";
           
            
            //percent = floor(object[i].confidence*100);
            //text(object[i].label+" "+percent+"%", object[i].x+5,object[i].y+20);
            //noFill();
            //stroke(r,g,b);
            //if(object[i].label==identify){
             //   rect(object[i].x,object[i].y, object[i].width, object[i].height);
             //   video.stop();
             //   objectDetector.detect(gotResult);
          //  }

function start() {
    objectDetector = ml5.objectDetector("cocoSSD", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
} 

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

