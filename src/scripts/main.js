const counter = document.querySelector("#contador");

const elementScrollStyle = document.querySelectorAll(".scroll");

const inputAccordion = document.querySelectorAll(".accordion__header");
const btnOpenAccordion = document.querySelectorAll(".open__accordion");
const btnCloseAccordion = document.querySelectorAll(".close__accordion");
const contentAccordion = document.querySelectorAll(".accordion__text");

// Oculta todas as seções com a classe scroll
const hidden = () => {
  for (let i = 0; i < elementScrollStyle.length; i++) {
    elementScrollStyle[i].classList.add("hidden");
  }
};

// timer da promoção
function startTimer(duration, display) {
  let timer = duration,
    hours,
    minutes,
    seconds;

  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt(timer / 60, 10);
    minutes = hours ? minutes - 60 * hours : minutes;
    seconds = parseInt(timer % 60, 10);

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  hidden();

  //Observa quando as seções estão na tela, para adicionar a classe show
  const myObserverRight = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        [entry.target.classList.remove("show")];
      }
    });
  });

  const sectionAbout = document.querySelectorAll(".hidden");
  sectionAbout.forEach((e) => myObserverRight.observe(e));

  //Aqui é onde setamos o tempo do timer da promoção

  if (counter) {
    let duration = 60 * 1440; // em minutos
    let display = counter;

    startTimer(duration, display);
  }
});

//laço responsavel por manipuilar o accordion
for (let i = 0; i < inputAccordion.length; i++) {
  inputAccordion[i].addEventListener("click", () => {
    if (!contentAccordion[i].classList.contains("is--open")) {
      openAccordion(i);
    } else {
      closeAccordion(i);
    }
  });
}

const openAccordion = (i) => {
  contentAccordion[i].classList.add("is--open");
  btnOpenAccordion[i].style.display = "none";
  btnCloseAccordion[i].style.display = "block";
};

const closeAccordion = (i) => {
  contentAccordion[i].classList.remove("is--open");
  btnOpenAccordion[i].style.display = "block";
  btnCloseAccordion[i].style.display = "none";
};
