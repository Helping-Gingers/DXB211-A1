function preload() //get a random 500px x 500px photo from picksum and store it as a variable to be messed with.
{
  img = loadImage('https://picsum.photos/500/500');
}

//Initial Setup of variables
let img;
let waveAmplitude = 20;
let waveFrequency = 0.05;
let time = 0;
let stepsize = 5;
let SinOrCos = false

function setup() 
{
  createCanvas(img.width, img.height);
  noStroke();
  img.loadPixels();
}

function activateSin() //both this and the activateCos below are tied to button presses, and are a simple bool value switch.
{
  SinOrCos = false;
}


function activateCos()
{
  SinOrCos = true;
}

//Just a modified version of the pixelation code from W4.
function draw() 
{
  background(0);

  for (let x = 0; x < img.width; x += stepsize) 
  {
    let offset;
    if (SinOrCos) //do the sin wave calulations for x
      {
        offset = cos(x * waveFrequency + time) * waveAmplitude;
      }
    else
      {
        offset = sin(-x * (waveFrequency + waveFrequency) + time) * waveAmplitude;
      }

    for (let y = 0; y < img.height; y += stepsize) 
    {
      let offsetY = y + offset; //adjust the Y value of the pixel based on the offset

      // Get the color from the original image at (x, y)
      let pixColor = img.get(x, y);
      fill(pixColor);

      // Draw the square at the distorted Y position
      square(x, offsetY, stepsize);
    }
  }

  time += 0.05; //iterate time
}