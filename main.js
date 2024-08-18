
//declaration of variables
const startButton = document.getElementById('button')
const question = document.getElementById('question')
const ul = document.getElementById('ul')
const li = ul.getElementsByTagName('li')
const idkwhat = document.querySelectorAll('#li')
const quiz = document.getElementById('quiz')
//this variable holds the index number of question
let questionIndex = 0
let json = {}
let score = 0

//program starts here
getQuizContent()



//sending fetch request
//and calls the updateContent function
async function getQuizContent() {
    //url to send request
    const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
    //sending the request
    try{
        response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        json = await response.json()

        //console.log(json);
        //return json
        //updateContent(json)

        startButton.addEventListener("click", function(){
            updateContent(json)
            questionIndex++
            console.log(questionIndex);
        })
        
    }catch(error){
        console.error(error.message)
    }
}


function updateContent(object) {
    //changes the name of the button
    if(startButton.innerText == "Start Quiz"){
        startButton.innerText = "Next";
    }
    //console.log(startButton.innerText);
    
    //main updating of content starts here
    if (questionIndex<10) {
        console.log(object.results[questionIndex]);
        const value = object.results[questionIndex]

        //array of all the options(currently empty)
        let array1 = []

        //trying to loop through li
        //this loop returns a array of three incorrect answers in which the correct answer is pushed and shuffled
        for (let i = 0; i < li.length-1; i++) {
            array1.push(object.results[questionIndex].incorrect_answers[i])
            //console.log(array1);   
        }

        //getting the right answer
        const array2 = object.results[questionIndex].correct_answer
        //joining the right and the wrong answer(filled)
        array1.push(array2)

            //for use in checking the wrong answers
            wrongAnswers = [...array1]
        
        //now we shuffle the array due to obvious reasons
        // Shuffle the array
        shuffleArray(array1)
        //console.log(array1); // Output will be a shuffled version of ['A', 'B', 'C', 'D']

        //setting the values in the main document
        question.innerHTML = questionIndex + 1 +'. ' + value.question
        //setting the values in options by loop
        for (let i = 0; i < array1.length; i++) {
            li[i].textContent = array1[i] 
        }

        question.style.display = 'block'
        quiz.style.display = 'block'
        
        function completeQuestion(){

            resetState()
        
            idkwhat.forEach(function(i){
                i.addEventListener("click", function(e){
                    if(e.target.innerText == object.results[questionIndex-1].correct_answer){
                        i.style.backgroundColor = 'green'
                    }
                     
                })
            })
        }

        completeQuestion()
        
    } else if(questionIndex>10){
        //having some problem here
        alert("questions completed")
        startButton.innerText = "Start Again";
        startButton.addEventListener("click" , function(){
            questionIndex = 0
            getQuizContent()
        })
        
    } 
}

function resetState(){
    idkwhat.forEach(function(i){
        if(i.style.backgroundColor = 'green'){
            i.style.backgroundColor = '#6D28D9'
        }
    })
}





//chatgpt function which shuffles the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// function checkUserResponse(){
//     ul.addEventListener("click", function(e){
//         // console.log(e.target.innerHTML);
//         // console.log(object.results[questionIndex].correct_answer)
//         const response = e.target.innerHTML 

//         if(response == object.results[questionIndex-1].correct_answer){

//             console.log(object.results[questionIndex-1].correct_answer + "correct answer");
//             pressButton(json)
            
            
            

//             //if the answer if correct the index increases by 1
            
//         // }else if(response.includes(wrongAnswers)){
//         //     console.log('wrong answer');
            
//         // }
//         }else{
//             console.log('wrong answer');
//             console.log("right answer is:" + object.results[questionIndex-1].correct_answer);
            
            
//         }
        
//     })

//     let wrongAnswers = []
// }
