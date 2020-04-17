const userInput=prompt('Enter your name!');

if (userInput.length > 4){
  alert('Your name is greater than four characters.');
 
}

else if (userInput.length < 4){
  alert('Your name is less than four characters');
}

else {
  alert('Your name is exactly four characters!');
}
//Based on the instructions, I didn't know what to do if the name was exactly 4 characters. I hope this is okay.
