 // Initialize the object structure
 let resultObject = {
    title: addTestForm.title.value,
    questions: []
};

let textArr = [];

// Iterate over form fields
addTestForm.querySelectorAll('input, textarea, select').forEach((field, key) => {
    let question = {
        answers: []
    };

    if (field.name.startsWith('img')) {
        question.img = field.value
    } else if(field.name.startsWith('question')) {
        question.question = field.value;
    } else if(field.name.startsWith('text')) {
        textArr.push(field.value);
    } else if(field.name.startsWith('correct')) {
        textArr.push(field.value);
    }
    resultObject.questions.push(question);
    console.log(question);
});

for(let i = 0; i < textArr.length; i += 2) {
    const key = textArr[i];
    const value = textArr[i+1];
    question.answers.push({ text: key, correct: value });
}

// console.log(resultObject);