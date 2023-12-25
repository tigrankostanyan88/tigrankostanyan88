// import VanillaTilt from './vanilla.js';
import questions from './questions.js'

function navMenu() {

  let elements = {
    mobileMenu: document.querySelector('.mobile_btn'),
    navMenu: document.querySelector('.nav_list'),
    navItem: document.querySelectorAll('.nav_item'),
    img: document.querySelector('.mobile_btn > img'),
    mask: document.querySelector('.mask_menu')
  }

  window.addEventListener('resize', () => {
    if (document.body.offsetWidth > 768) {
      elements.navMenu.style.transition = "none";
    }
  })

  function handleChangeButton() {
    elements.img.src = './imgs/nav/menu.png';
    elements.mobileMenu.style.position = "static";
  }

  elements.mask.addEventListener('click', () => {
    elements.navMenu.classList.remove('active_menu');
    elements.mask.classList.remove('active');
    handleChangeButton();
  })

  elements.navItem.forEach(item => {
    item.addEventListener('click', () => {
      elements.navMenu.classList.remove('active_menu');
      elements.mask.classList.remove('active');
      handleChangeButton();
    })
  });


  elements.mobileMenu.addEventListener('click', () => {
    elements.navMenu.style.transition = "all .3s ease-in-out";
    elements.navMenu.classList.toggle('active_menu');
    elements.mask.classList.add('active');

    if (elements.navMenu.classList.contains("active_menu")) {
      elements.img.src = './imgs/nav/close.png';
      elements.mobileMenu.style.position = "fixed";
    } else {
      handleChangeButton();
      elements.mask.classList.remove('active');
    }
  });
}
navMenu();


let swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5
  },
  keyboard: {
    enabled: true
  },
  mousewheel: {
    thresholdDelta: 70
  },
  spaceBetween: 30,
  loop: false,
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

swiper.slideTo(1, false, false);

function quiz() {
  const questionElement = document.querySelector('.question');
  const answerButtons = document.querySelector('.answer-butttons');
  const nextButton = document.querySelector('.btn-next');
  const prevButton = document.querySelector('.btn-prev');

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (nextButton) {
      nextButton.innerHTML = 'Հաջորդը';
      showQuestion();
    }
  }

  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    const img = document.createElement('img');


    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // img.src = currentQuestion.img;
    currentQuestion.img === '' ?
      img.src = 'https://st4.depositphotos.com/17828278/24719/v/450/depositphotos_247193458-stock-illustration-image-vector-symbol-missing-available.jpg' :
      img.src = currentQuestion.img;

    questionElement.appendChild(img);

    currentQuestion.answers.forEach(({
      text,
      correct
    }) => {
      const button = document.createElement('button');
      button.innerHTML = text;
      button.classList.add('btn');
      answerButtons.appendChild(button);
      correct ? button.dataset.correct = correct : null;
      button.addEventListener('click', selectAnswer)
    })
  }

  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    isCorrect ? score++ : null;
    selectedBtn.classList.add(isCorrect ? 'correct' : 'incorrect');
    Array.from(answerButtons.children).forEach(btn => {
      btn.classList.add(btn.dataset.correct === 'true' ? 'correct' : null);
      btn.disabled = true;
    });

    nextButton.style.display = 'block';
  }

  function showScore() {
    resetState();
    questionElement.innerHTML = `
    <div class="result">
    <p>Ձեր գնահատականը ${score}-ից ${questions.length}!</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Icons8_flat_ok.svg/1200px-Icons8_flat_ok.svg.png">
    </div>`;
    nextButton.innerHTML = 'Նորից փորցել։'
    nextButton.style.display = "block"
  }

  function handleNextButton() {
    currentQuestionIndex++;

    currentQuestionIndex < questions.length ? showQuestion() : showScore();
  }

  // console.log(currentQuestionIndex === 0)
  function handlePrevButton() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      currentQuestionIndex < questions.length ? showQuestion() : showScore();
    }
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      handlePrevButton();
    })
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentQuestionIndex < questions.length ? handleNextButton() : startQuiz();

      let quizNum = document.querySelector('.quiz_num')
      if (currentQuestionIndex) {
        quizNum.style.padding = '15px';
        quizNum.style.width = '50px';
        quizNum.style.height = '50px';
        quizNum.innerHTML = 1 + "/" + currentQuestionIndex
      } else {
        quizNum.style.padding = '0';
        quizNum.style.width = '0';
        quizNum.style.height = '0';
        quizNum.innerHTML = '';
      }
    });
  }

  startQuiz();
}
quiz();