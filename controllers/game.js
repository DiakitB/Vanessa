

/// create an array of sentences that describe vactions you would like to go on
const vacationSentences = [
    "I would love to visit the beaches of Hawaii.",
    "Exploring the ancient ruins in Greece would be amazing.",
    "A safari in Kenya is on my bucket list.",
    "I dream of seeing the Northern Lights in Iceland.",
    "A road trip across the United States sounds like a lot of fun."
];


// create a function that will loop throught the vacationSentences array and return one sentence at a time 


//What you're doing here is basically overwrite the display.innertText with question3 every time.

 
//What you should do instead is to have a counter = 0 and when the user click next button, you increase the counter by one. Also, you should not store your question in that format. You should use array of string instead.

//The entire javascript code should be:

const QUESTIONS = [
   "What is 2+8?", 
   "How many legs does the spider have?", 
   "what is the capital of Russia?"
];

let counter = 0;
let display = document.querySelector('h3');
display.innerText = QUESTIONS[counter]

let btn = document.getElementById('next');

btn.addEventListener('click', ()=>{
   counter++;
   display.innerText = QUESTIONS[counter]
})


///
{/* <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz</title>
</head>
<body>
  <div class="container">
     <h3>Qustions will be displayed here</h3>
     <button id ="next" value ="submit"> Next</button>
    <h2 id ="score"></h2>
  </div>
</body>
</html */}


// .container{
//     background-color: lightblue;
//     width:400px;
//     margin:10em auto;
//     padding:20px;
//   }
//   h3{
//     text-align:center;
//   }
//   h2{
//     float:right;
//     position:absolute;
//     top:219px;
//     right:750px;
//     border-radius:10px;
//   }
//   #next{
//     width:100px;
//     padding:10px;
//     border-radius:10px;
//     background-color: yellowgreen;
//     border-style:none;
    
//   }