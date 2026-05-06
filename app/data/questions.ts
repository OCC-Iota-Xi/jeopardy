export type Clue = {
  id: string;
  question: string;
  answer: string;
  value: number;
};

export type Category = {
  id: string;
  name: string;
  clues: Clue[];
};

export const jeopardyData: Category[] = [
  {
    id: "cat-1",
    name: "Programming Fundamental", //updated
    clues: [
      { id: "c1-100", value: 100, question: "This stores a value that can be used later in a program.", answer: "What is a variable" },
      { id: "c1-200", value: 200, question: "The process of finding and fixing errors in a program", answer: "What is debugging?" },
      { id: "c1-300", value: 300, question: "This type of loop is best used when you know exactly how many time you want code to repeat.", answer: "What is a for loop?" },
      { id: "c1-400", value: 400, question: "In a browser, the Back button often returns you to the most recently visited page first.", answer: "What is a Stack?" },
      { id: "c1-500", value: 500, question: "Computers store letters, numbers, images, and sounds as patterns of these small units", answer: "What are bytes?" },
    ],
  },
  {
    id: "cat-2",
    name: "Programming Language", //updated 
    clues: [
      { id: "c2-100", value: 100, question: "This language is used to structure content on the web.", answer: "What is HTML (HyperText Markup Language)?" },
      { id: "c2-200", value: 200, question: "This popular JavaScript library was developed by Facebook for building user interfaces.", answer: "What is React?" },
      { id: "c2-300", value: 300, question: "In Java, C++, and C#, this programming style orgainzes code using objects that are created from classes.", answer: "What is object-oriented programming?" },
      { id: "c2-400", value: 400, question: "This is the term for the rules that decide whether code is written correctly in a language.", answer: "What is syntax?" },
      { id: "c2-500", value: 500, question: "This describes a programming language that must be translated into machine code before it runs, like C++.", answer: "What is compiled language?" },
    ],
  },
  {
    id: "cat-3",
    name: " Data Structure", //updated
    clues: [
      { id: "c3-100", value: 100, question: "This data structure stores items in order and lets you access them by position number.", answer: "What is an array?" },
      { id: "c3-200", value: 200, question: "This type of linked list lets each node move forward only because each node stores a link to the next node.", answer: "What is singly linked list?" },
      { id: "c3-300", value: 300, question: "When an app saves actions so Undo can reverse the most recent one first, it si often using this structure.", answer: "What is Stack?" },
      { id: "c3-400", value: 400, question: "This data structure is useful for handling items in the order thay arrive, like tasks waiting to be processed.", answer: "What is Queue?" },
      { id: "c3-500", value: 500, question: "This type of linked list lets each node move both forward and backward because it stores link to the next and previous nodes.", answer: "Who is doubly linked list?" },
    ],
  },
  {
    id: "cat-4",
    name: "Tech Acronyms", //updated
    clues: [
      { id: "c4-100", value: 100, question: "CPU stands for this.", answer: "What is Central Processing Unit?" },
      { id: "c4-200", value: 200, question: "API stands for this.", answer: "What is Application Programming Interface?" },
      { id: "c4-300", value: 300, question: "ROM stands for this.", answer: "What is Read-Only Memory?" },
      { id: "c4-400", value: 400, question: "Wi-Fi stands for this.", answer: "What is Wireless Fidelity?" },
      { id: "c4-500", value: 500, question: "OS stands for this.", answer: "What is Operating Systems" },
    ],
  },
  {
    id: "cat-5",
    name: "Programming Languages", //updated
    clues: [
      { id: "c5-100", value: 100, question: "This organ pumps blood through the human body.", answer: "What is heart?" },
      { id: "c5-200", value: 200, question: "This is the largest planet in our solar system.", answer: "What is Jupiter?" },
      { id: "c5-300", value: 300, question: "This is the process plants use to turn sunlight into food.", answer: "What is photosynthesis?" },
      { id: "c5-400", value: 400, question: "This is the process where water changes from liquid to gas.", answer: "What is evaporation?" },
      { id: "c5-500", value: 500, question: "This scientist developed the theory of relativity.", answer: "Who is Albert Einstein?" },
    ],
  }
];
