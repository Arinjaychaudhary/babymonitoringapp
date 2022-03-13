status="";
song="";
object=[];
function preload() {
song = loadSound("alarm.mp3");
}


function setup(){
canvas=createCanvas(380,380);
canvas.center();

video=createCapture(VIDEO);
video.size(380,380);
video.hide()

objectDetector=ml5.objectDetector('cocossd',modelLoaded);




}

function draw() {
    image(video,0,0,380,380);
 if(status !="")
 {
   objectDetector.detect(video,gotResult);

   for ( i = 0; i < object.length; i++) {

   

    document.getElementById("status").innerHTML="Status : Object Detected ";

    decimal=floor(object[i].confidence*100);
   
    fill("#FF0000");
   stroke("#FF0000");
   text(object[i].label+" "+decimal+"%",object[i].x+15,object[i].y+15);
   noFill()
   rect(object[i].x , object[i].y , object[i].width , object[i].height);

    if(object[i].label == "person"){

song.stop();
      document.getElementById("baby_status").innerHTML=" Baby Found";
     
    }
    else{
     song.play();
      document.getElementById("baby_status").innerHTML="Baby not found ";
    }
   }  
  
}
   
   
      
}

function modelLoaded() {
  console.log("Model Loaded Successfully");
  status=true;

}

function gotResult(error,results){
if (error)
{
    console.error(error);
}
else
{
console.log(results);
object = results;
}
}