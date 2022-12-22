video="";
status="";
object=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        object_detector.detect(video,gotresult);
        for(var i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            
            stroke("#0F9D58");
            fill("#0F9D58");
          var percent=floor(object[i].confidence*100); 
          text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
          noFill();
          rect(object[i].x, object[i].y , object[i].width, object[i].height); 
          if(object[i].label==ojectName){
            video.stop();
            object_detector.detect(gotresult);
            document.getElementById("objectStatus").innerHTML=ojectName+" found";
            synth=window.speechSynthesis;
            utterThis=new SpeechSynthesisUtterance(ojectName+" found");
            synth.speak(utterThis);
          }
          else{
            document.getElementById("objectStatus").innerHTML=ojectName+" Not found";
          }
        }
    }
}
function startFunction(){
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("objectStatus").innerHTML="Status : Detecting Object ";
    ojectName=document.getElementById("object_name").value;
}
function modelloaded(){
    console.log("Model has been loaded");
    status=true;
}
function gotresult(error,result){
    if(error){
        console.log(error);
    }  
    else{
        console.log(result);
        object=result;
    }
}