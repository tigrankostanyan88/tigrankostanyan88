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
    questions.id = 11;
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
            answerBox.id = count++;
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

addQuestions.addEventListener('click', (e) => {
    let questionCountEl = document.querySelector('.questionCount');
    questionCountEl.innerHTML = `Թեստը ունի ${count++} հարց`;
    const parentElement = e.target.parentElement;
    createElement();    
});


const addTestForm = document.querySelector('.add_test');

// Attach a submit event
addTestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    constructObject();
});

function constructObject() {
    let formdatad = new FormData(addTestForm);
    let testObject = {
        title: addTestForm.elements.title.value,
        questions: []
    };

    let question = [];
    let answers = [];

    formdatad.forEach((value, key) => {
        if(key === 'question') question.push(value);
        if(key === 'img') question.push(value);
        if(key === 'text') answers.push(value);
        if(key === 'correct') answers.push(value);
    });

    for(let i = 0; i < question.length; i += 2) {
        let questionObj = { answers: [] };

        const questions = question[i+1];
        const img = question[i];
        questionObj.questions = questions;
        questionObj.img = img;

        for(let j = 0; j < answers.length; j += 2) {

            const correct = answers[j + 1];
            const text = answers[j];

            if (text === questions) {
                questionObj.answers.push({ text, correct });          
            }
        }
        testObject.questions.push(questionObj);
    }

    console.log(testObject.questions);
}





   // axios('/api/v1/test', {
    //     method: 'POST',
    //     data: testObject
    // })
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })