window.onload = function () {
    afterLoadingPage();
};

let questions = [
    {
        title: "In which numbering system can the binary number 1011011111000101 be easily converted to?",
        options: [
            "Decimal system",
            "Hexadecimal system",
            "Octal system",
            "No need to convert",
        ],
        ans: 1,
    },
    {
        title: "The system of competitive examination for civil service was accepted in principle in the year",
        options: ["1833", "1853", "1858", "1882"],
        ans: 1,
    },
    {
        title: "Light year is a unit of",
        options: ["time", "distance", "light", "intensity of light"],
        ans: 1,
    },
    {
        title: "Light from the Sun reaches us in nearly",
        options: ["2 minutes", "4 minutes", "8 minutes", "16 minutes"],
        ans: 2,
    },
    {
        title: "Light from the Sun reaches us in nearly",
        options: ["2 minutes", "4 minutes", "8 minutes", "16 minutes"],
        ans: 2,
    },
    {
        title: "Metals are good conductors of electricity because",
        options: [
            "they contain free electrons",
            "the atoms are lightly packed",
            "they have high melting point",
            "All of the above",
        ],
        ans: 0,
    },
    {
        title: "Pick out the scalar quantity",
        options: ["force", "pressure", "velocity", "acceleration"],
        ans: 1,
    },
    {
        title: "Rectifiers are used to convert",
        options: [
            "Direct current to Alternating current",
            "Alternating current to Direct current",
            "high voltage to low voltage",
            "low voltage to high voltage",
        ],
        ans: 1,
    },
    {
        title: "Entomology is the science that studies",
        options: [
            "Behavior of human beings",
            "Insects",
            "The origin and history of technical and scientific terms",
            "The formation of rocks",
        ],
        ans: 1,
    },
    {
        title: "Who invented the BALLPOINT PEN?",
        options: [
            "Biro Brothers",
            "Waterman Brothers",
            "Bicc Brothers",
            "Write Brothers",
        ],
        ans: 0,
    },
    {
        title: "What J. B. Dunlop invented?",
        options: [
            "Pneumatic rubber tire",
            "Automobile wheel rim",
            "Rubber boot",
            "Model airplanes",
        ],
        ans: 0,
    },
    {
        title: "India changed over to the decimal system of coinage in",
        options: ["April 1995", "April 1957", "April 1958", "April 1959"],
        ans: 0,
    },
];

let heading,
    startButton,
    mainContainer,
    questionBox,
    answerBox,
    currentQues,
    totalQues,
    form,
    myDom,
    skipButton,
    nextButton,
    isOptionRight,
    score,
    finishButton,
    totalOption,
    quesNumberContainer,
    clicked;

let headingArray = ["WELCOME", "QUIZ STARTED", "QUIZ OVER"],
    domArray = [],
    submittedAns = [];

function afterLoadingPage() {
    heading = document.getElementById("heading-text");
    heading.innerText = headingArray[0];

    startButton = document.getElementById("start-button");
    startButton.addEventListener("click", onclickingStartButton);

    finishButton = document.getElementById("finish");
    finishButton.addEventListener("click", gameOver);

    prevButton = document.getElementById("prev");
    prevButton.addEventListener("click", goBack);

    nextButton = document.getElementById("next");
    nextButton.addEventListener("click", goNext);

    mainContainer = document.getElementById("main-container");

    form = document.getElementById("my-form");

    questionBox = document.getElementById("question-section");

    // answerBox = document.getElementById("answer-section");
    totalQues = questions.length;

    createAnswerBox();
    createQuestionsLink();

    mainContainer.append(quesNumberContainer);

    score = 0;
}

function onclickingStartButton() {
    heading.innerText = headingArray[1];
    startButton.style.display = "none";
    mainContainer.style.display = "flex";
    prevButton.disabled = true;

    currentQues = 0;

    startDisplayingQuesAns(currentQues);
}

function startDisplayingQuesAns(currentQues) {
    disableButton(currentQues);

    displayQuestion(currentQues);
    displayAnswer(currentQues);
}

function goBack() {
    console.log(currentQues);

    if (currentQues > 0) {
        startDisplayingQuesAns(--currentQues);
    }
}

function goNext() {
    console.log(currentQues);
    let quesNum = currentQues;

    if (currentQues < totalQues - 1) {
        startDisplayingQuesAns(++currentQues);
    }
}

function checkClickedOption(owner) {
    console.log(owner);

    if (owner.value == questions[currentQues].ans) {
        submittedAns[currentQues] = true;
    } else {
        submittedAns[currentQues] = false;
    }

    document.getElementById(currentQues + 1).style.backgroundColor =
        "powderblue";
}

function disableButton(currentQues) {
    if (currentQues == 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentQues == totalQues - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function displayQuestion(currentQues) {
    questionBox.innerText = `${currentQues + 1}) ${
        questions[currentQues].title
    }`;
}

function displayAnswer(currentQues) {
    form.innerHTML = "";
    form.append(domArray[currentQues]);
}

function createAnswerBox(currentQues) {
    for (let i = 0; i < totalQues; i++) {
        totalOption = questions[i].options.length;

        answerBox = HTMLDom('<div id="answer-section"></div>');

        for (let j = 0; j < totalOption; j++) {
            myDom = `<div class="choice"><input type="radio" name="option" id="option${
                j + 1
            }" class="my-ans" value=${j} onclick="checkClickedOption(this)" /><label class="label" for="option${
                j + 1
            }">${questions[i].options[j]}</label></div>`;

            answerBox.append(HTMLDom(myDom));
        }

        domArray.push(answerBox);
        submittedAns[i] = -1;
    }
}

function createQuestionsLink() {
    let numDiv;

    quesNumberContainer = HTMLDom(`<div id="ques-numbers-container"></div>`);

    for (let i = 0; i < totalQues; i++) {
        numDiv = HTMLDom(`<div id="${i + 1}" class="circle">${i + 1}</div>`);
        numDiv.addEventListener("click", function () {
            console.log(this);
            goToThisQuesNum(this);
        });

        quesNumberContainer.append(numDiv);
    }
}

function goToThisQuesNum(reference) {
    currentQues = parseInt(reference.innerText) - 1;
    startDisplayingQuesAns(currentQues);
}

function HTMLDom(dom) {
    let temp = document.createElement("template");
    temp.innerHTML = dom;
    return temp.content.firstChild;
}

function gameOver() {
    let correctAns = 0,
        wrongAns = 0;
    heading.innerText = headingArray[2];

    for (let i = 0; i < submittedAns.length; i++) {
        if (submittedAns[i] == true) {
            document.getElementById(i + 1).style.backgroundColor = "green";
            score += 2;
            correctAns += 1;
        } else if (submittedAns[i] == false) {
            document.getElementById(i + 1).style.backgroundColor = "red";
            wrongAns += 1;
        }
    }

    myDom = `<div><h1>You have scored : ${score}</h1><h2>Correctly Answered : ${correctAns}</h2><h2>Wrong Answered : ${wrongAns}</h2><h1>Please reload the page to start again.</h1></div>`;

    let temp = document.createElement("template");
    temp.innerHTML = myDom;

    mainContainer.firstElementChild.innerHTML = "";
    mainContainer.firstElementChild.append(temp.content.firstChild);
}
