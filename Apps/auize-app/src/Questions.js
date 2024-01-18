export const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<scripting>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
    ],
  },

  {
    question:
      'What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id="demo">This is a demonstration.</p>',
    answers: [
      {
        text: 'document.getElementById("demo").innerHTML = "Hello World!";',
        correct: true,
      },
      {
        text: 'document.getElementByName("p").innerHTML = "Hello World!";',
        correct: false,
      },
      { text: '#demo.innerHTML = "Hello World!";', correct: false },
      {
        text: 'document.getElement("p").innerHTML = "Hello World!";',
        correct: false,
      },
    ],
  },

  {
    question: "Where is the correct place to insert a JavaScript script?",
    answers: [
      { text: "The <body> section", correct: false },
      { text: "The <head> section", correct: false },
      {
        text: "Both the <head> section and the <body> section are correct",
        correct: true,
      },
    ],
  },

  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      { text: '<script name="xxx.js">', correct: false },
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script src="xxx.js">', correct: true },
    ],
  },

  {
    question: "The external JavaScript file must contain the <script> tag.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alert("Hello World");', correct: true },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'msg("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
    ],
  },

  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "function = myFunction()", correct: false },
    ],
  },

  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      { text: "call myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "call function myFunction()", correct: false },
    ],
  },

  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i = 5 then", correct: false },
      { text: "if i == 5 then", correct: false },
      { text: "if i = 5", correct: false },
      { text: "if (i == 5)", correct: true },
    ],
  },

  {
    question:
      'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    answers: [
      { text: "if (i != 5)", correct: true },
      { text: "if i <> 5", correct: false },
      { text: "if (i <> 5)", correct: false },
      { text: "if i != 5 then", correct: false },
    ],
  },

  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while i = 1 to 10", correct: false },
      { text: "while (i <= 10; i++)", correct: false },
      { text: "while (i <= 10)", correct: true },
    ],
  },

  {
    question: "How does a FOR loop start?",
    answers: [
      { text: "for (i <= 5; i++)", correct: false },
      { text: "for (i = 0; i <= 5)", correct: false },
      { text: "for i = 1 to 5", correct: false },
      { text: "for (i = 0; i <= 5; i++)", correct: true },
    ],
  },

  {
    question: "How can you add a comment in JavaScript?",
    answers: [
      { text: "<!--This is a comment-->", correct: false },
      { text: "'This is a comment", correct: false },
      { text: "//This is a comment", correct: true },
    ],
  },

  {
    question: "How to insert a comment that has more than one line?",
    answers: [
      { text: "//This comment has\nmore than one line//", correct: false },
      { text: "<!--This comment has more\nthan one line-->", correct: false },
      { text: "/*This comment has more\nthan one line*/", correct: true },
    ],
  },

  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { text: 'var colors = ["red", "green", "blue"]  ', correct: true },
      { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
      { text: 'var colors = "red", "green", "blue"', correct: false },
      {
        text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        correct: false,
      },
    ],
  },
];
