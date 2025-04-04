function setup() 
{
  createCanvas(500, 500);

  encryptInput = createInput();
  encryptInput.position(0, 40);
  encryptInput.input(onlyAllowLetters);

  encryptButton = createButton('Encrypt');
  encryptButton.position(175, 300);
  background(255);

  decryptInput = createInput();
  decryptInput.position(0, 170);
  decryptInput.input(onlyAllowLetters);
  decryptButton = createButton('Decrypt');
  decryptButton.position(245, 300);
  
  keyInput = createInput();
  keyInput.input(onlyAllowNonNegativeIntegers);
  keyInput.position(0, 300);  
}

let SecretMessage = "";

function draw() 
{
   background(255);
   textSize(20);
   textAlign(LEFT);
   text(`What key would you like to Use? [Positive Integers Only.]`, 0, 285);
   text(`Key--> "${keyInput.value()}"`, 0, 340);  
   text(`What would you like to Encrypt?`, 0, 25);
   text(`Secret Message --> "${encryptInput.value()}"`, 0, 90);
   text(`What would you like to Decrypt?`, 0, 155);
   text(`Secret Message --> "${decryptInput.value()}"`, 0, 220);
   text(`Your Message is:`, 0, 400);
   text(`"${SecretMessage}"`, 0, 450);
   encryptButton.mousePressed(encryptFunction);
   decryptButton.mousePressed(decryptFunction);
}

let alph = "abcdefghijklmnopqrstuvwxyz";

let inputs = [];
function encryptFunction()
{
  const initial = encryptInput.value().toLowerCase();
  const shift = (keyInput.value()) % 26;
  let output = "";
  for (let c = 0; c < initial.length; c++) 
  {
    if (alph.includes(initial[c])) 
    {
      output += alph[(alph.indexOf(initial[c]) + shift + 26) % 26];
    } 
    else 
    {
      output += initial[c];
    }
  }
  SecretMessage = output;
}

function decryptFunction()
{
  const initial = decryptInput.value().toLowerCase();
  const shift = (keyInput.value() % 26);
  let output = "";
  for (let c = 0; c < initial.length; c++) 
  {
    if (alph.includes(initial[c])) 
    {
      output += alph[(alph.indexOf(initial[c]) - shift + 26) % 26];
    } 
    else 
    {
      output += initial[c];
    }
  }
  SecretMessage = output;
}

function onlyAllowNonNegativeIntegers() 
{
  let val = this.value();
  
  // Remove any non-number characters
  let cleaned = val.replace(/\D/g, ''); //<-- regex
  
  // Update the input if it was modified
  if (val !== cleaned) this.value(cleaned);
}

function onlyAllowLetters() 
{
  let val = this.value();
  
  // Remove any non-digit characters
  let cleaned = val.replace(/\d/g, ''); //<-- regex
  
  // Update the input if it was modified
  if (val !== cleaned) this.value(cleaned);
}

/*
3) Moveable Type
o Introduced in tutorial 5
o Explores the use of fonts, text, and time as inputs
o You should explore how the meaning of text can be enhanced through careful use of
motion design, interactivity and temporal dynamics (animation). Thinking of networks of
data, you might also explore how textual data moves from one place to another to produce
new relations and information. How can computational visualisations aid interpretation of
textual data? What are the poetic, affective and playful dimensions of text as a visual
medium?
*/

//Ceasar Cipher

//Get User Input
//Do calculation + visualise it
//Display result