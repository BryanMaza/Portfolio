let isMenuOpen = false;
const wordsCover = [
  "Hello, My name is",
  "bryan maza.",
  "I'm frontend developer"
];
const selectors = document.querySelectorAll(".cover-text");
const nav = document.querySelector(".nav");
let cont = 0;
let contWord = 0;
let refresh;
let lastMove = 0;

const openMenuNavbar = () => {
  if (!isMenuOpen) {
    nav.classList.add("active");
    isMenuOpen = true;
  } else {
    nav.classList.remove("active");
    isMenuOpen = false;
  }
};

const showCurrentContent = () => {
  const menuOptions = document.querySelectorAll(".menu-option");

  menuOptions.forEach((option) => {
    option.addEventListener("click", () => {
      menuOptions.forEach((option) => {
        option.classList.remove("active");
      });

      option.classList.add("active");
    });
  });
};

const fixedNavbar = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (window.pageYOffset === nav.offsetTop) {
    nav.classList.remove("scrolling");
  } else if (scrollTop > lastMove) {
    nav.classList.remove("scrolling");
  } else {
    nav.classList.add("scrolling");
  }
  lastMove = scrollTop <= 0 ? 0 : scrollTop;
};

const printLetters = (selector, contW, contN) => {
  selector.classList.add("typewriter");
  let firstWord = wordsCover[contW].split("");
  if (firstWord.length > contN) {
    selector.textContent += firstWord[contN];
    cont++;
  } else {
    contWord++;
    selector.classList.remove("typewriter");
    cont = 0;
    clearInterval(refresh);
    if (contWord < selectors.length) {
      refresh = setInterval(() => {
        printLetters(selectors[contWord], contWord, cont);
      }, 60);
    }
  }
};

const showWellcomeMsg = () => {
  refresh = setInterval(() => {
    printLetters(selectors[contWord], contWord, cont);
  }, 60);
};

const goTop = () => {
  window.scroll(0, 0);
};

// Add a accounted for each project
const addAccountProjects = () => {
  const nums = document.querySelectorAll(".number");
  let i = 1;
  for (let num of nums) {
    num.innerHTML = "0" + i;
    i++;
  }
};

const sendEmail = async (name, email, message) => {
  let envio = await Email.send({
    Host: "smtp.gmail.com",
    Username: "bryanjrmzz@gmail.com",
    Password: "aempdagftdidazvr",
    To: "bryanjrmzz@gmail.com",
    From: "bryanjrmzz@gmail.com",
    Subject: `New message from ${name}`,
    Body: `Name: ${name} <br/> Email:${email} <br/> Message: ${message}`
  });
  await console.log(envio);
};

const submitForm = (e) => {
  e.preventDefault();
  const name = document.querySelector(".form-name");
  const email = document.querySelector(".form-email");
  const content = document.querySelector(".form-content");
  const btnSend = document.querySelector(".btn-send");
  const infoBtnSend = btnSend.innerHTML;
  const isAllOk = handlerErrorFields(name, email, content);

  if (name.value !== "" && email.value !== "" && content.value !== "") {
    if (isAllOk) {
      sendEmail(name.value, email.value, content.value);
      btnSend.innerHTML = "Submited";
      btnSend.classList.add("submited");
      setTimeout(() => {
        btnSend.classList.remove("submited");
        btnSend.innerHTML = infoBtnSend;
      }, 1000);
      document.querySelector(".form").reset();
    }
  }
};

// Check if all fields are filled
const handlerErrorFields = (name, email, content) => {
  let allTrue = false;
  const validateName = /^[a-zA-Z ]+$/.test(name.value);
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email.value
    );
  const validateContent = !content.value.length <= 0;
  console.log(validateContent);
  if (name.value === "") {
    name.nextElementSibling.classList.add("showError");
    name.nextElementSibling.innerHTML = "Name is required";
    allTrue = false;
  } else {
    if (!validateName) {
      name.nextElementSibling.classList.add("showError");
      name.nextElementSibling.innerHTML = "Name must be letters only";
      allTrue = false;
    } else {
      name.nextElementSibling.classList.remove("showError");
      allTrue = true;
    }
  }
  if (email.value === "") {
    email.nextElementSibling.classList.add("showError");
    email.nextElementSibling.innerHTML = "Email is required";
    allTrue = false;
  } else {
    if (!validateEmail) {
      email.nextElementSibling.classList.add("showError");
      email.nextElementSibling.innerHTML = "Email incorrect";
      allTrue = false;
    } else {
      email.nextElementSibling.classList.remove("showError");
      allTrue = true;
    }
  }
  if (content.value === "") {
    content.nextElementSibling.classList.add("showError");
    content.nextElementSibling.innerHTML = "Message is required";
    allTrue = false;
  } else {
    if (!validateContent) {
      content.nextElementSibling.classList.add("showError");
      content.nextElementSibling.innerHTML = "The message is too short";
      allTrue = false;
    } else {
      content.nextElementSibling.classList.remove("showError");
      allTrue = true;
    }
  }

  return allTrue;
};

const addEvents = () => {
  if (document.readyState === "complete") {
    AOS.init();
    const btnMenu = document.querySelector(".btn-menu");
    const btnTop = document.querySelector(".go-top");
    const form = document.querySelector(".form");
    const btnDownload = document.querySelector(".btn-download");

    showWellcomeMsg();
    showCurrentContent();
    addAccountProjects();

    form.addEventListener("submit", submitForm);
    btnTop.addEventListener("click", goTop);
    btnMenu.addEventListener("click", openMenuNavbar);
    window.addEventListener("scroll", fixedNavbar, false);
  }
};
document.addEventListener("readystatechange", addEvents);
