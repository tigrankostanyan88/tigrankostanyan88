let textarea = document.querySelectorAll('textarea');
textarea.forEach(el => {
    let val = el.value.trim();
    el.innerHTML = val
});


let questions = document.querySelector('.questions');
let addQuestions = document.querySelector('.add_questions');
let count = 1;

addQuestions.addEventListener('click', (e) => {
    let removeBtn = document.createElement('button');
    let group = document.createElement('div');
    let textarea = document.createElement('textarea');
    let select = document.createElement('select');
    let option = document.createElement('option');

    removeBtn.classList.add('remove_question');
    removeBtn.innerHTML = 'X';
    select.name = 'correct';
    textarea.name = 'text';
    textarea.placeholder = 'Պատասխանի տարբերակ ' + count++;

    group.classList.add('group');

    // questions > group
    group.appendChild(removeBtn);
    questions.appendChild(group);
    group.appendChild(textarea);
    group.appendChild(select);

    select.appendChild(option);

    option.innerHTML = 'Ճիշտ';
    option.value = true;

    select.appendChild(option.cloneNode(true));
    option.innerHTML = 'սխալ';
    option.value = false;


    let removeQuestionBtn = document.querySelectorAll('.remove_question');
    removeQuestionBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(btn.parentElement.remove());
        })
    })
});

// Select the form with the class 'add_test'
const addTestForm = document.querySelector('.add_test');

// Attach a submit event listener to the form
addTestForm.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a FormData object to capture form data
    const formData = new FormData(addTestForm);

    // Initialize an object to hold the form data
    const formDataObject = {
        answers: [] // Initialize answers as an array
    };

    // Iterate over form data and populate the object
    formData.forEach((value, key) => {
        formDataObject[key] = value;

        // Check if the key is 'text' to structure answers
        if (key === 'text') {
            formDataObject.answers.push({ [key]: value });
        }
    });

    // Log the structured form data object
    console.log(formDataObject);

    // axios.post('/api/v1/course', {
    //     // data: formDataObject
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
});
