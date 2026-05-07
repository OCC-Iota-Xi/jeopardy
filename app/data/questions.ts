export type Questions = {
  id: string;
  question: string;
  answer: string;
  value: number;
  imageUrl?: string;
  codeSnippet?: string;
};

export type Category = {
  id: string;
  name: string;
  clues: Questions[];
};

export const jeopardyData: Category[] = [
  {
    id: "cat-1",
    name: "MAANG",
    clues: [
      { id: "c1-200", value: 200, question: "Before settling on this name in 1997, its creators briefly considered calling this search engine 'BackRub'.", answer: "Google" },
      { id: "c1-400", value: 400, question: "This company's first ever item sold was a science textbook titled 'Fluid Concepts and Creative Analogies' in 1995.", answer: "Amazon" },
      { id: "c1-600", value: 600, question: "This company famously offered itself to Blockbuster for $50 million in 2000, only to be laughed out of the room.", answer: "Netflix" },
      { id: "c1-800", value: 800, question: "The original logo of this company featured Sir Isaac Newton sitting beneath a tree.", answer: "Apple" },
      { id: "c1-1000", value: 1000, question: "Its original headquarters was painted entirely in blue because its founder is red-green colorblind.", answer: "Meta/Facebook" },
    ],
  },
  {
    id: "cat-2",
    name: "Garage to unicorn",
    clues: [
      { id: "c2-200", value: 200, question: "Founded by Aravind Srinivas, this AI-powered answer engine aims to dethrone Google Search by providing direct answers with inline citations.", answer: "Perplexity" },
      { id: "c2-400", value: 400, question: "This controversial 2025 AI startup founded by Columbia University students went viral with its 'Cheat on Everything' marketing campaign.", answer: "Cluely" },
      { id: "c2-600", value: 600, question: "Founded by the Collison brothers, this massive fintech startup's API has become the default way for internet businesses to accept payments.", answer: "Stripe" },
      { id: "c2-800", value: 800, question: "Christina Cacioppo founded this unicorn startup that pioneered automated security and compliance for standards like SOC 2.", answer: "Vanta" },
      { id: "c2-1000", value: 1000, question: "Led by Eric Glyman, this corporate card and spend management startup became the fastest-growing SaaS company in history by reaching $100M ARR in just two years.", answer: "Ramp" },
    ],
  },
  {
    id: "cat-3",
    name: "Guess Who",
    clues: [
      { id: "c3-200", value: 200, question: "", answer: "Elon Musk", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg" },
      { id: "c3-400", value: 400, question: "", answer: "The Primeagen", imageUrl: "https://www.g2i.co/_next/image?url=https%3A%2F%2Fassets.basehub.com%2Fdd279994%2F244f8e736f62032c3206b53e47ca50f0%2Fprime-square.png&w=3840&q=75" },
      { id: "c3-600", value: 600, question: "", answer: "Evan Spiegel", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Evan_Spiegel%2C_founder_of_Snapchat.jpg/500px-Evan_Spiegel%2C_founder_of_Snapchat.jpg" },
      { id: "c3-800", value: 800, question: "", answer: "Peter Thiel", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Peter_Thiel_by_Gage_Skidmore.jpg/960px-Peter_Thiel_by_Gage_Skidmore.jpg" },
      { id: "c3-1000", value: 1000, question: "", answer: "Demis Hassabis", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Demis_Hassabis%2C_2024_Nobel_Prize_Laureate_in_Chemistry_7_%28cropped%29.jpg/960px-Demis_Hassabis%2C_2024_Nobel_Prize_Laureate_in_Chemistry_7_%28cropped%29.jpg" },
    ],
  },
  {
    id: "cat-4",
    name: "C++",
    clues: [
      { id: "c4-200", value: 200, question: "C++ was designed by this Danish computer scientist in 1979 as an extension of the C language.", answer: "Bjarne Stroustrup" },
      { id: "c4-400", value: 400, question: "The '++' in C++ is a pun on this specific programming operator.", answer: "The increment operator" },
      { id: "c4-600", value: 600, question: "Unlike Java, C++ allows a class to inherit from more than one parent class, a feature known by this term.", answer: "Multiple inheritance" },
      { id: "c4-800", value: 800, question: "What does this C++ program output?", answer: "ABba", codeSnippet: "#include <iostream>\n\nclass A {\npublic:\n    A() { std::cout << \"A\"; }\n    ~A() { std::cout << \"a\"; }\n};\n\nclass B {\n    A obj;\npublic:\n    B() { std::cout << \"B\"; }\n    ~B() { std::cout << \"b\"; }\n};\n\nint main() {\n    B b;\n    return 0;\n}" },
      { id: "c4-1000", value: 1000, question: "What does this C++ program output?", answer: "10", codeSnippet: "#include <iostream>\n\nint main() {\n    int x = 0;\n    int y = 0;\n    \n    if (x++ && y++) {\n        x++;\n    }\n    \n    std::cout << x << y;\n    return 0;\n}" },
    ],
  },
  {
    id: "cat-5",
    name: "Python",
    clues: [
      { id: "c5-200", value: 200, question: "Python was named not after the snake, but after this British surreal comedy troupe.", answer: "Monty Python" },
      { id: "c5-400", value: 400, question: "Typing 'import this' in a Python console will print a famous poem by Tim Peters, known by this 3-word title.", answer: "'The Zen of Python'" },
      { id: "c5-600", value: 600, question: "This is the name of the popular package installer for Python, which shares its name with a small, hard seed.", answer: "pip" },
      { id: "c5-800", value: 800, question: "What does this Python script output?", answer: "1", codeSnippet: "counts = {\n    1: \"One\",\n    True: \"True\",\n    1.0: \"Float One\"\n}\n\nprint(len(counts))" },
      { id: "c5-1000", value: 1000, question: "What does this Python snippet output?", answer: "['Roll over', 'Play dead']", codeSnippet: "class Dog:\n    tricks = []\n\n    def __init__(self, name):\n        self.name = name\n\n    def add_trick(self, trick):\n        self.tricks.append(trick)\n\ndog1 = Dog(\"Fido\")\ndog2 = Dog(\"Buddy\")\n\ndog1.add_trick(\"Roll over\")\ndog2.add_trick(\"Play dead\")\n\nprint(dog1.tricks)" },
    ],
  }
];
