//Initial Setup of variables to be used throughout the program

let drawing = [];
let currentStroke = [];
let isDrawing = false;

let replaying = false;
let strokeIndex = 0;
let pointIndex = 1;

function setup() 
{
  createCanvas(800, 600);
  background(255);
  intro(); //Call the first function
}

let i1 = "Hello! And welcome to this Drawing Program.";
let i2 = "This program can replay whatever you've drawn through the use of Arrays! \n Draw something, and then hit 'p' to watch it be re-drawn. Hit 'r' to reset.";

async function intro() //A worded explanation to the program using async [which is cool and I like it cause its similar to how I use IEnumerators in c#]
{
  background(255);
  textAlign(CENTER);
  textSize(20);
  text(i1, width/2, height/2);
  await sleep(5000);
  background(255);
  text(i2, width/2, height/2);
  await sleep(5000);
  background(255);
  stroke(0);
  strokeWeight(3);
  noFill();
}

function draw() 
{
  if (isDrawing) //note the mouse position, record it, and then draw it.
  {
    let currPoint = { x: mouseX, y: mouseY };
    currentStroke.push(currPoint);
    if (currentStroke.length > 1) 
    {
      let prev = currentStroke[currentStroke.length - 2];
      line(prev.x, prev.y, currPoint.x, currPoint.y);
    }
  }

  if (replaying) //if there is more than one stroke, and more than one point to draw, draw the 0th stroke, and then iterate till all strokes are completed.
  {
    if (strokeIndex < drawing.length) 
    {
      let currStroke = drawing[strokeIndex];
      if (pointIndex < currStroke.length) 
      {
        let prev = currStroke[pointIndex - 1];
        let curr = currStroke[pointIndex];
        line(prev.x, prev.y, curr.x, curr.y);
        pointIndex++;
      } 
      else 
      {
        strokeIndex++;
        pointIndex = 1;
      }
    } 
    else 
    {
      replaying = false;
    }
  }
}

function mousePressed()
{
  isDrawing = true;
  currentStroke = [];
}

function mouseReleased() //send the data for drawing stuffs
{
  isDrawing = false;
  if (currentStroke.length > 0) 
  {
    drawing.push(currentStroke);
  }
}

function keyPressed() 
{
  if (key === 'r') //reset everything
  {
    background(255);
    drawing = [];
    currentStroke = [];
    replaying = false;
    strokeIndex = 0;
    pointIndex = 1;
  }

  if (key === 'p') //activate replay mode
  {
    if (drawing.length > 0) 
    {
      background(255);
      replaying = true;
      strokeIndex = 0;
      pointIndex = 1;
    }
  }
}

//https://stackoverflow.com/a/67295678
// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration) 
{
  return new Promise((resolve) => { setTimeout(resolve, millisecondsDuration); })
}