//Declaring global variables
var image;
var fgImage = null;
var bgImage = null;
var output = null;
var canv;
var canv2;

function loadForegroundImage(){
  
  //Get the canvas
  canv = document.getElementById("canv1");
  //Get the file Input
  var foregroundI = document.getElementById("foreground");
  //Create a image inside the canvas
  fgImage = new SimpleImage(foregroundI);
  image = new SimpleImage(foregroundI);
  fgImage.drawTo(canv);
}

function loadBackgroundImage(){
  
  //Get the canvas
  canv2 = document.getElementById("canv2");
  //Get the file Input
  var backgroundI = document.getElementById("background");
  //Create a image inside the canvas
  bgImage = new SimpleImage(backgroundI);
  image = new SimpleImage(backgroundI);
  bgImage.drawTo(canv2);
}

function createComposite(){
  //Create a "blank" new SimpleImage with the dimensons of the foregroundImage
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 240;
  //Start the loop
  for(var pixel of fgImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if(pixel.getGreen() > greenThreshold){
      //pixel is green use background
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }else{
      //pixel is not green use foreground
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function doGreenScreen(){
  //Check if the fgImage and bgImage are not empty
  if (fgImage == null || ! fgImage.complete()){
    alert("The foreground not loaded");
    return;
  }if (bgImage == null || ! bgImage.complete()){
    alert("The background not loaded");
    return;
  }
  //Cleaning the canvas before load the final Image
clearCanvas();
  //Start to work with both images
  var finalImage = createComposite();
  finalImage.drawTo(canv);
}

function clearCanvas(){
  //Function to clean our canvas
  var canv = document.getElementById("canv1");
  var ctx = canv.getContext("2d"); ctx.clearRect(0,0,canv.width,canv.height);
  var canv2 = document.getElementById("canv2");
  var ctx2 = canv2.getContext("2d");
  ctx2.clearRect(0,0,canv2.width,canv2.height);
}