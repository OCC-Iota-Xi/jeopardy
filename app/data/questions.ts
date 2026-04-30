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
    name: "Data Structures",
    clues: [
      { id: "c1-100", value: 100, question: "This data structure operates on a Last In, First Out (LIFO) principle.", answer: "What is a Stack?" },
      { id: "c1-200", value: 200, question: "In this type of tree, each node has at most two children.", answer: "What is a Binary Tree?" },
      { id: "c1-300", value: 300, question: "This structure uses a hash function to map keys to values for fast lookups.", answer: "What is a Hash Table (or Dictionary)?" },
      { id: "c1-400", value: 400, question: "A graph where all edges are bidirectional is called this.", answer: "What is an Undirected Graph?" },
      { id: "c1-500", value: 500, question: "This self-balancing binary search tree ensures O(log n) time complexity for insertions and deletions.", answer: "What is an AVL Tree (or Red-Black Tree)?" },
    ],
  },
  {
    id: "cat-2",
    name: "Famous Algorithms",
    clues: [
      { id: "c2-100", value: 100, question: "This simple sorting algorithm repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.", answer: "What is Bubble Sort?" },
      { id: "c2-200", value: 200, question: "This search algorithm finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.", answer: "What is Binary Search?" },
      { id: "c2-300", value: 300, question: "This algorithm finds the shortest path between nodes in a graph, often used in GPS navigation routing.", answer: "What is Dijkstra's Algorithm?" },
      { id: "c2-400", value: 400, question: "This divide-and-conquer sorting algorithm was invented by John von Neumann in 1945.", answer: "What is Merge Sort?" },
      { id: "c2-500", value: 500, question: "This algorithm is used to find the minimum spanning tree for a connected weighted graph, building it one edge at a time.", answer: "What is Kruskal's Algorithm (or Prim's)?" },
    ],
  },
  {
    id: "cat-3",
    name: "Web Development",
    clues: [
      { id: "c3-100", value: 100, question: "This language is used to structure content on the web.", answer: "What is HTML (HyperText Markup Language)?" },
      { id: "c3-200", value: 200, question: "This popular JavaScript library was developed by Facebook for building user interfaces.", answer: "What is React?" },
      { id: "c3-300", value: 300, question: "This CSS methodology stands for Block Element Modifier.", answer: "What is BEM?" },
      { id: "c3-400", value: 400, question: "In HTTP, this status code indicates that the requested resource was not found.", answer: "What is 404?" },
      { id: "c3-500", value: 500, question: "This refers to the practice of making web pages render well on a variety of devices and window or screen sizes.", answer: "What is Responsive Web Design?" },
    ],
  },
  {
    id: "cat-4",
    name: "Computer History",
    clues: [
      { id: "c4-100", value: 100, question: "Often considered the first computer programmer, she worked on Charles Babbage's Analytical Engine.", answer: "Who is Ada Lovelace?" },
      { id: "c4-200", value: 200, question: "This mathematician and computer scientist cracked the Enigma code during WWII.", answer: "Who is Alan Turing?" },
      { id: "c4-300", value: 300, question: "This company introduced the first commercially successful personal computer to feature a mouse and a graphical user interface in 1984.", answer: "What is Apple (Macintosh)?" },
      { id: "c4-400", value: 400, question: "In 1969, this early packet-switching network became the foundation of the modern internet.", answer: "What is ARPANET?" },
      { id: "c4-500", value: 500, question: "This person invented the World Wide Web while working at CERN in 1989.", answer: "Who is Tim Berners-Lee?" },
    ],
  },
  {
    id: "cat-5",
    name: "Tech Acronyms",
    clues: [
      { id: "c5-100", value: 100, question: "CPU stands for this.", answer: "What is Central Processing Unit?" },
      { id: "c5-200", value: 200, question: "API stands for this.", answer: "What is Application Programming Interface?" },
      { id: "c5-300", value: 300, question: "JSON stands for this.", answer: "What is JavaScript Object Notation?" },
      { id: "c5-400", value: 400, question: "In database theory, ACID stands for Atomicity, Consistency, Isolation, and this.", answer: "What is Durability?" },
      { id: "c5-500", value: 500, question: "REST, an architectural style for web services, stands for this.", answer: "What is Representational State Transfer?" },
    ],
  },
  {
    id: "cat-6",
    name: "Programming Languages",
    clues: [
      { id: "c6-100", value: 100, question: "This versatile language is named after a British comedy troupe, not a snake.", answer: "What is Python?" },
      { id: "c6-200", value: 200, question: "Originally called 'Oak', this language is famous for its 'write once, run anywhere' philosophy.", answer: "What is Java?" },
      { id: "c6-300", value: 300, question: "Developed by Microsoft, this language is a strict syntactical superset of JavaScript.", answer: "What is TypeScript?" },
      { id: "c6-400", value: 400, question: "This systems programming language, sponsored by Mozilla, guarantees memory safety without a garbage collector.", answer: "What is Rust?" },
      { id: "c6-500", value: 500, question: "Created by Bjarne Stroustrup, this language was originally named 'C with Classes'.", answer: "What is C++?" },
    ],
  }
];
