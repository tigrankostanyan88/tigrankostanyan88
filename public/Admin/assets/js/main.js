let textarea = document.querySelectorAll('textarea');
textarea.forEach(el => {
    let val = el.value.trim();
    el.innerHTML = val
});


let addQuestions = document.querySelector('.add_questions');
let count = 1;

function createElement() {
    let questionList = document.querySelector('.question_list');

    let questions = document.createElement('div');
    questions.classList.add('question');
    questionList.appendChild(questions);

    let answerList = document.createElement('div');
    answerList.classList.add('answerList');
    questions.appendChild(answerList);

    let img = document.createElement('input');
    img.name = 'img';
    img.placeholder = 'Լուսանկարի հասցեն (URL)';
    let testQuestion = document.createElement('textarea');
    testQuestion.classList.add('testQuestion')
    testQuestion.name = 'question';
    testQuestion.placeholder = 'Թեստի հարցը';

    questions.appendChild(img);
    questions.appendChild(testQuestion);


    let addAnaswer = document.createElement('button');
    addAnaswer.classList.add('add-answer');
    addAnaswer.type = 'button';
    addAnaswer.innerHTML = 'Ավելացնել հարց';
    questions.appendChild(addAnaswer);

    let answerBtn = document.querySelectorAll('.add-answer');
    let count = 1;

    answerBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            let answerBox = document.createElement('div');
            answerBox.classList.add('answerBox');

            let answer = document.createElement('textarea');
            let select = document.createElement('select');
            let option = document.createElement('option');
            let remove = document.createElement('button');
            remove.innerHTML = 'X';
            remove.classList.add('remove');

            select.name = 'correct';
            answer.name = 'text';
            answer.placeholder = `Պատասխան-${count++}`;
            option.name = 'text';
            option.innerHTML = 'սխալ';
            option.value = false;

            select.appendChild(option.cloneNode(true));
            option.innerHTML = 'Ճիշտ';
            option.value = true;

            answerList.appendChild(answerBox);
            answerBox.appendChild(answer);
            answerBox.appendChild(remove);
            answerBox.appendChild(select);
            select.appendChild(option);


            let removeQuestion = document.querySelectorAll('.remove');
            removeQuestion.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    btn.parentElement.remove()
                })
            })
        })
    });
}


addQuestions.addEventListener('click', () => {
    let questionCountEl = document.querySelector('.questionCount');

    questionCountEl.innerHTML = `Թեստը ունի ${count++} հարց`;
    createElement();
})



const addTestForm = document.querySelector('.add_test');

// Attach a submit event
addTestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    constructObject()
});



function constructObject() {
    // Initialize the object structure

    // Create an empty Set
    let uniqueSet = new Set();

    let resultObject = {
        title: "",
        questions: []
    };


    // Extract title
    resultObject.title = addTestForm.title.value;

    let question = {};
   
    addTestForm.querySelectorAll('input, textarea').forEach((field) => {
        if(field.name !== 'title') {            
            if(field.name.startsWith('img')) {
                question = {
                    question: field.value,
                    img: field.value,
                    answers: []
                };
            } else if(field.name.startsWith('question')) {
                question.question = field.value
            }
            uniqueSet.add(question);
        }          
    });
    
    let uniqueArray = Array.from(uniqueSet);
    resultObject.questions = uniqueArray;
    console.log(resultObject);
}
