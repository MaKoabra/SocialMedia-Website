var aplhanum = /^[a-zA-Z0-9]+$/;
var numbers = /[0-9]/;
var letters = /^[A-Za-z]+$/;
var UpperLetters = /[A-Z]/;
var SpecialChars = /[/*-+!@#$^&*]/;
var PassCheck = false;
var nameCheck = false;
var password= "";
var username = "";
var Rpassword= "";

document.getElementById("username").addEventListener("change",function(ev){
let userInput = ev.currentTarget;
username = userInput.value;
let User = username.charAt[0]
if (!letters.test(User)) {
  document.getElementById('UserDiv').innerHTML="Following Must Be True:\nUsernames must begin with a letter\nUsernames must have 3 at least letters in username";
 
  console.log("Username doesn't start with letters");
}

else if (username.length < 3 || !aplhanum.test(username)) {
  document.getElementById('UserDiv').innerHTML="Following Must Be True:\nUsernames must begin with a letter\nUsernames must have 3 at least letters in username";
  console.log("Invalid Length");
} 

else {
  nameCheck = true;
  console.log("Username is valid");
  document.getElementById('UserDiv').innerHTML="";
}
})


document.getElementById("password").addEventListener("change",function(ev){
  let userInput=ev.currentTarget;
  password = userInput.value;
  if (password.length < 8){
    console.log("invalid length");
    document.getElementById('PassDiv').innerHTML="Following Must Be True:\nPasswords must have at least 8 characters\nPasswords must contains at least 1 upper case letter AND 1 number and 1 of the following special characters\n  / * - + ! @ # $ ^ & ~ [ ]" ;
  }
  else if(!numbers.test(password)){
    console.log("No Numbers");
    document.getElementById('PassDiv').innerHTML="Following Must Be True:\nPasswords must have at least 8 characters\nPasswords must contains at least 1 upper case letter AND 1 number and 1 of the following special characters\n  / * - + ! @ # $ ^ & ~ [ ]" ;  }
  else if (!UpperLetters.test(password)){
    console.log("No Uppercase Letters");
    document.getElementById('PassDiv').innerHTML="Following Must Be True:\nPasswords must have at least 8 characters\nPasswords must contains at least 1 upper case letter AND 1 number and 1 of the following special characters\n  / * - + ! @ # $ ^ & ~ [ ]" ;  }
    else if(!SpecialChars.test(password)){
      console.log("No Special Characters");
      document.getElementById('PassDiv').innerHTML="Following Must Be True:\nPasswords must have at least 8 characters\nPasswords must contains at least 1 upper case letter AND 1 number and 1 of the following special characters\n  / * - + ! @ # $ ^ & ~ [ ]" ;  
     
    }
    else{
      console.log("Password Passes");
      document.getElementById('PassDiv').innerHTML="" ;}

    }
)

document.getElementById("passR").addEventListener("change", function(ev){
  let userInput=ev.currentTarget;
  Rpassword = userInput.value;
  if (Rpassword !== password){
    console.log("Passwords don't match");
    document.getElementById('RPass').innerHTML="Passwords must be the same";
  }
  else if (password.length < 8){
    console.log("invalid length");
  }
  else if(!numbers.test(password)){
    console.log("No Numbers");
  }
  else if (!UpperLetters.test(password)){
    console.log("No Uppercase Letters")
  }
  else{
    console.log("valid password");
    PassCheck=true;
    document.getElementById('RPass').innerHTML="";
  }
}
)



document.getElementById("RegistrationForm").addEventListener("submit", function(ev){
  ev.preventDefault();
  if(PassCheck&&nameCheck==true){
    ev.currentTarget.submit();
  } else {
    alert("There is something wrong with either your username or password")
    ev.currentTarget.reload();
    return;
  }
})