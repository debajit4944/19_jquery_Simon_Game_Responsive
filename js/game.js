let gamePattern = [];
let buttonColors = ["red","blue","green", "yellow"];
let userClickedPattern =[];
let level = 0;

let gameStartClick = document.querySelector("#gameStartClick");
gameStartClick.addEventListener("click",function (){
    if(level==0){
        let randomNumber = nextSequence();
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        animate(randomChosenColor);
        console.log(gamePattern);
        console.log(level);
        $("#gameStartClick").hide();
    }
});


//Add Event Listener to button A in keyboard tostart the game
$(document).keypress(function(event){
    if((event.key == "a" || event.key == "A") && level==0){
        let randomNumber = nextSequence();
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        animate(randomChosenColor);
        console.log(gamePattern);
        console.log(level);
    }
});

//Add "click" Event Listener to all buttons
let allButtons = document.querySelectorAll(".custom-btn");
for(let i=0;i<allButtons.length;i++)
{
    allButtons[i].addEventListener("click",function (){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animate(userChosenColor);

    if(checkAnswer(userClickedPattern.length-1)){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function (){
                let randomNumber = nextSequence();
                userClickedPattern =[];
                let randomChosenColor = buttonColors[randomNumber];
                gamePattern.push(randomChosenColor);
                playSound(randomChosenColor);
                animate(randomChosenColor);
                console.log(gamePattern);
              }, 1000);
        }
    }
    else{
        gamePattern = [];
        userClickedPattern =[];
        level = 0;
        $("#gameStartClick").show();
        new Audio('sounds/wrong.mp3').play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
          }, 100);
        $("h1").text("Game Over. Press A to Start");
    }
    console.log(userClickedPattern);
    });
}

function randomNoGenerator(min,max){
    // min = Math.ceil(min);
    // max = Math.floor(max);
    // Generate a random number between 0 and 1
  const randomValue = Math.random();

  // Scale the random value to the desired range
  const scaledValue = randomValue * (max - min + 1) + min;

  // Round down to the nearest integer to include both min and max
  const randomNumber = Math.floor(scaledValue);

  return randomNumber;
}

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    return (randomNoGenerator(0,3));
}

function playSound(key){
    switch (key) 
    {
        case "green":
            new Audio('sounds/green.mp3').play();
            break;
        case "red":
            new Audio('sounds/red.mp3').play();
            break;
        case "blue":
            new Audio('sounds/blue.mp3').play();
            break;
        case "yellow":
            new Audio('sounds/yellow.mp3').play();
            break;
        default:
            console.log(key);
            break;
    }
}

function animate(key){
    let buttonToAnimate = document.querySelector("#"+key);
    buttonToAnimate.classList.add("pressed");
    setTimeout(function (){
        buttonToAnimate.classList.remove("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        // console.log("index"+currentLevel);
        // console.log("User: "+ userClickedPattern[currentLevel] +" Game: "+ gamePattern[currentLevel] );
        console.log("success");
        return true;
    }
    else{
        console.log("wrong");
        return false;
    }
}