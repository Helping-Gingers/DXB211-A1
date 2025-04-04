function setup() 
{
  createCanvas(500, 500);
    //setup a lot of user interactions.
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

let SecretMessage = ""; //global variable

function draw() //setup the visual side of things for the en/decrypter, as well as allow input to be recieved on the buttons
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

//ENCRPYT + DECRYPT CODE ADAPTED FROM PSEUDOCODE: https://stackoverflow.com/questions/64189794/caesar-cipher-in-p5js

let alph = "abcdefghijklmnopqrstuvwxyz";

let inputs = [];
function encryptFunction()
{
  const initial = encryptInput.value().toLowerCase();
  const shift = (keyInput.value()) % 26; //use the modulus function to restrict the range of the input down to 26, and use the remainder as the shift value.
  let output = "";
  for (let c = 0; c < initial.length; c++) //for every character in the input
  {
    if (alph.includes(initial[c])) //if it is in the alphabet
    {
      output += alph[(alph.indexOf(initial[c]) + shift + 26) % 26]; //shift its index by the shift amount, and modulus it back so it doesn't overflow past 'z'.
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
  const shift = (keyInput.value() % 26); //use the modulus function to restrict the range of the input down to 26, and use the remainder as the shift value.
  let output = "";
  for (let c = 0; c < initial.length; c++) //for every character in the input
  {
    if (alph.includes(initial[c])) 
    {
      output += alph[(alph.indexOf(initial[c]) - shift + 26) % 26];//shift its index by the shift amount, and modulus it back so it doesn't overflow past 'a'.
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
  
  // Remove any non-number characters [e.g., letters or the negative sign]
  let cleaned = val.replace(/\D/g, ''); //<-- regex
  
  // Update the input if it was modified
  if (val !== cleaned) this.value(cleaned);
}

function onlyAllowLetters() 
{
  let val = this.value();
  
  // Remove any non-digit characters [numbers and the like]
  let cleaned = val.replace(/\d/g, ''); //<-- regex
  
  // Update the input if it was modified
  if (val !== cleaned) this.value(cleaned);
}