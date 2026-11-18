import { SubjectCategory, Branch, Topic, Chapter } from '../types';

export const SUBJECT_CATEGORIES: SubjectCategory[] = [
  {
    id: 'coding',
    name: 'Coding',
    subtitle: 'Learn to build, reason, and solve problems.',
    description: 'Master core memory models, algorithms, and practical programming languages.',
    icon: 'Code2',
    branches: [
      { id: 'python', name: 'Python', tag: 'Dynamic & AI' },
      { id: 'c', name: 'C', tag: 'Systems & Memory' },
      { id: 'cpp', name: 'C++', tag: 'Performance & RAII' },
      { id: 'csharp', name: 'C#', tag: '.NET & Enterprise' },
      { id: 'java', name: 'Java', tag: 'JVM & Scalability' },
    ],
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    subtitle: 'Understand the ideas behind the formulas.',
    description: 'Explore visual intuition, rigorous proofs, and foundational concepts from Algebra to Calculus.',
    icon: 'Binary',
    branches: [
      { id: 'functions', name: 'Functions', tag: 'Core Foundation' },
      { id: 'algebra', name: 'Algebra', tag: 'Equations & Groups' },
      { id: 'calculus', name: 'Calculus', tag: 'Rates & Integrals' },
      { id: 'linear_algebra', name: 'Linear Algebra', tag: 'Vectors & Matrices' },
      { id: 'probability', name: 'Probability & Stats', tag: 'Inference & Bayes' },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    subtitle: 'Explore the laws and systems of nature.',
    description: 'Investigate physical mechanics, chemical transformations, and living systems.',
    icon: 'Atom',
    branches: [
      { id: 'physics', name: 'Physics', tag: 'Mechanics & Energy' },
      { id: 'chemistry', name: 'Chemistry', tag: 'Bonding & Reactions' },
      { id: 'biology', name: 'Biology', tag: 'Cells & Genetics' },
    ],
  },
];

// ==========================================================
// 1. MATHEMATICS — STAR MODULE: FUNCTIONS
// ==========================================================
const TOPIC_MATH_FUNCTIONS: Topic = {
  id: 'math_1_3_functions',
  chapterId: 'math_chap_1_sets_functions',
  title: '1.3 Functions',
  subtitle: 'Understand what functions are, domain, codomain, range, and mappings',
  order: 3,
  estimatedMinutes: 12,
  subtopics: ['Domain & Codomain', 'Range', 'Mapping Notation', 'One-to-One vs Many-to-One'],
  prerequisites: ['1.1 Sets and their properties', '1.2 Relations'],
  lesson: {
    objectives: [
      'Define a mathematical function as a well-defined single-valued relation',
      'Distinguish precisely between domain, codomain, and range',
      'Analyze one-to-one (injective) and many-to-one mapping rules',
      'Evaluate functions algebraically and interpret their geometric curves',
    ],
    keyConcepts: [
      { label: 'Domain', text: 'Set of all possible input values for which the function is defined.' },
      { label: 'Codomain', text: 'Set of all permissible potential output values.' },
      { label: 'Range', text: 'Actual set of output values produced: Range ⊆ Codomain.' },
      { label: 'Notation', text: 'f: A → B (read as "f maps set A into set B").' },
    ],
    theoryMarkdown: `
A **function** is a relation between two sets, where **each element of the first set (domain) is mapped to exactly one element of the second set (codomain)**.

If $f$ maps an input $x \\in A$ to an output $y \\in B$, we write:
$$f: A \\to B \\quad \\text{such that} \\quad y = f(x)$$

### Essential Rules for a Valid Function:
1. **Total Domain Rule:** Every element in domain $A$ must produce an arrow (have an image).
2. **Deterministic Output Rule:** No element in domain $A$ may point to two different outputs in $B$ (passes the vertical line test).

### Types of Mappings:
- **One-to-One (Injective):** Distinct inputs always produce distinct outputs:
$$f(a) = f(b) \\implies a = b$$
- **Many-to-One:** Multiple different inputs map to the same output (e.g. $f(x) = x^2$ where $f(2) = 4$ and $f(-2) = 4$).
    `.trim(),
    formulas: [
      'f: A \\to B',
      '\\text{Range}(f) = \\{ f(x) \\mid x \\in A \\} \\subseteq B',
      'f(x) = x^2 \\implies f(2) = 4, \\; f(-3) = 9, \\; f(0) = 0',
    ],
    examples: [
      {
        title: 'Evaluating Quadratic Function',
        description: 'Given $f(x) = x^2$, calculate outputs for various real inputs.',
        mathOrCode: 'f(2) = 2^2 = 4 \\\\\nf(-3) = (-3)^2 = 9 \\\\\nf(0) = 0',
        steps: [
          'Substitute input value for every instance of x in formula',
          'Evaluate exponentiation preserving signs: (-3)^2 = +9',
          'Observe that both +3 and -3 produce 9 (Many-to-One)',
        ],
      },
    ],
    visuals: {
      type: 'functions_mapping',
      title: 'Domain & Codomain Set Mapping',
      caption: 'Each input in Domain A maps to exactly one output in Codomain B. Element c in Codomain is unmapped, demonstrating Range ⊂ Codomain.',
    },
    misconceptions: [
      {
        id: 'M_MATH_CODOMAIN_RANGE',
        name: 'Codomain vs Range Confusion',
        description: 'Assuming the codomain and range are always identical sets.',
        remedialTip: 'The codomain is the target set B. The range is only the subset of elements in B that actually get hit by an arrow!',
      },
      {
        id: 'M_MATH_ONE_TO_MANY',
        name: 'One-to-Many Disqualification',
        description: 'Believing an input can have multiple outputs (like y = ±√x) and still be a function.',
        remedialTip: 'A function cannot be indecisive! One input pointing to two outputs fails the definition of a function.',
      },
    ],
    realWorldApp: 'Vending machines: Pressing button "B2" (input) dispenses a specific soda can (single output). If button B2 dispensed two random items, the machine is broken!',
    recap: [
      'Every domain element maps to exactly one codomain element.',
      'Range is the actual set of outputs; Range ⊆ Codomain.',
      'A function can be one-to-one or many-to-one, but NEVER one-to-many.',
    ],
    fallbacks: {
      analogy: 'Think of passport numbers: Every citizen has exactly one passport number (Single-valued). Two people cannot share the same passport number (One-to-One).',
      eli5: 'A function is like a magical toaster. You put in a slice of bread (input), and it always turns into toast (output). It never turns one slice into both a pizza and an apple at the same time!',
      stepByStep: 'Step 1: Check Domain values. Step 2: Apply rule f(x). Step 3: Verify each input maps to exactly one output. Step 4: Collect all outputs into the Range.',
      socratic: 'If a curve on a graph crosses the vertical line x = 3 twice at y = 4 and y = -4, can this curve represent y as a function of x? Why not?',
    },
  },
  questions: [
    {
      id: 'q_func_1',
      topicId: 'math_1_3_functions',
      difficulty: 'easy',
      prompt: 'Which of the following equations defines a one-to-one (injective) function for all real numbers $x \\in \\mathbb{R}$?',
      choices: [
        {
          id: 'c1',
          text: '$f(x) = 2x + 3$',
          isCorrect: true,
          explanation: 'Correct! A linear equation with non-zero slope is strictly monotonic: each distinct input x yields a unique output f(x).',
        },
        {
          id: 'c2',
          text: '$f(x) = x^2$',
          isCorrect: false,
          misconceptionId: 'M_MATH_ONE_TO_MANY',
          explanation: 'Incorrect. $f(2) = 4$ and $f(-2) = 4$. Because two distinct inputs produce the same output, $f(x)=x^2$ is many-to-one, not one-to-one.',
        },
        {
          id: 'c3',
          text: '$f(x) = |x|$',
          isCorrect: false,
          explanation: 'Incorrect. The absolute value function maps both $5$ and $-5$ to $5$, making it many-to-one.',
        },
        {
          id: 'c4',
          text: '$f(x) = \\sin(x)$',
          isCorrect: false,
          explanation: 'Incorrect. Periodic trigonometric functions repeat values endlessly: $\\sin(0) = \\sin(\\pi) = 0$.',
        },
      ],
      hint: 'A one-to-one function never returns the same y-value for two different x-values. Think about the horizontal line test!',
      workedExample: 'Check $f(a) = f(b)$: $2a + 3 = 2b + 3 \\implies 2a = 2b \\implies a = b$. Therefore, $f(x) = 2x + 3$ is one-to-one.',
    },
    {
      id: 'q_func_2',
      topicId: 'math_1_3_functions',
      difficulty: 'medium',
      prompt: 'Let $A = \\{1, 2, 3\\}$ and $B = \\{10, 20, 30, 40\\}$. If $f(x) = 10x$, what is the **Range** of $f$?',
      choices: [
        {
          id: 'c1',
          text: '$\\{10, 20, 30\\}$',
          isCorrect: true,
          explanation: 'Correct! The range is the set of actual outputs: $f(1)=10, f(2)=20, f(3)=30$. $40$ is in the codomain but not in the range.',
        },
        {
          id: 'c2',
          text: '$\\{10, 20, 30, 40\\}$',
          isCorrect: false,
          misconceptionId: 'M_MATH_CODOMAIN_RANGE',
          explanation: 'Misconception: You selected the Codomain! The range consists ONLY of the elements in B that are mapped to by an element in A.',
        },
        {
          id: 'c3',
          text: '$\\{1, 2, 3\\}$',
          isCorrect: false,
          explanation: 'Incorrect. That is the Domain $A$, not the Range of outputs.',
        },
      ],
      hint: 'Calculate $f(x)$ for each element in $A$: $f(1), f(2), f(3)$.',
    },
    {
      id: 'q_func_3',
      topicId: 'math_1_3_functions',
      difficulty: 'medium',
      prompt: 'Why is the relation $x^2 + y^2 = 25$ NOT a function of $y$ in terms of $x$?',
      choices: [
        {
          id: 'c1',
          text: 'For values like $x = 0$, $y$ can be $+5$ or $-5$ (violating the single-output rule).',
          isCorrect: true,
          explanation: 'Correct! Solving for y yields $y = \\pm\\sqrt{25-x^2}$. A single input x produces two different outputs, failing the vertical line test.',
        },
        {
          id: 'c2',
          text: 'Because negative numbers cannot be squared.',
          isCorrect: false,
          explanation: 'Negative numbers can be squared: $(-3)^2 = 9$.',
        },
        {
          id: 'c3',
          text: 'Because it describes a circle rather than a straight line.',
          isCorrect: false,
          explanation: 'Non-linear shapes can be functions (e.g. parabolas). A circle fails because it has multiple y-values per x.',
        },
      ],
      hint: 'Apply the vertical line test: does a vertical line pass through more than one point on the circle?',
    },
    {
      id: 'q_func_4',
      topicId: 'math_1_3_functions',
      difficulty: 'hard',
      prompt: 'If $f(x) = \\frac{1}{x - 4}$, what is the maximal natural Domain of $f$ in the real numbers $\\mathbb{R}$?',
      choices: [
        {
          id: 'c1',
          text: '$\\mathbb{R} \\setminus \\{4\\}$ (All real numbers except $x = 4$)',
          isCorrect: true,
          explanation: 'Correct! Division by zero is undefined, so $x - 4 \\neq 0 \\implies x \\neq 4$.',
        },
        {
          id: 'c2',
          text: '$\\mathbb{R}$ (All real numbers)',
          isCorrect: false,
          explanation: 'Incorrect. At $x = 4$, the denominator becomes 0, which is undefined.',
        },
        {
          id: 'c3',
          text: '$[4, \\infty)$',
          isCorrect: false,
          explanation: 'Negative numbers and numbers less than 4 are fully valid inputs (e.g. $f(0) = -1/4$).',
        },
      ],
      hint: 'Identify any input values that cause division by zero.',
    },
    {
      id: 'q_func_5',
      topicId: 'math_1_3_functions',
      difficulty: 'hard',
      prompt: 'Let $f: \\mathbb{R} \\to \\mathbb{R}$ with $f(x) = x^3$. Is this function one-to-one (injective)?',
      choices: [
        {
          id: 'c1',
          text: 'Yes, because odd powers preserve signs: if $a \\neq b$, then $a^3 \\neq b^3$.',
          isCorrect: true,
          explanation: 'Correct! Cubing is strictly increasing on the entire real line. Each real number has a unique real cube root.',
        },
        {
          id: 'c2',
          text: 'No, because $f(-2)$ and $f(2)$ give the same magnitude.',
          isCorrect: false,
          explanation: 'Magnitude does not matter; $f(-2) = -8$ while $f(2) = 8$. They are distinct real numbers!',
        },
      ],
      hint: 'Does the horizontal line test ever intersect $y = x^3$ more than once?',
    },
  ],
};

// ==========================================================
// 2. CODING — STAR MODULE: PYTHON VARIABLES & MEMORY
// ==========================================================
const TOPIC_PYTHON_VARIABLES: Topic = {
  id: 'py_1_1_variables_datatypes',
  chapterId: 'py_chap_1_fundamentals',
  title: '1.1 Variables & Data Types',
  subtitle: 'Names, references, heap allocation, primitive types, and dynamic binding',
  order: 1,
  estimatedMinutes: 10,
  subtopics: ['Variable Assignment', 'int, float, str, bool', 'Type Conversion', 'id() & Memory'],
  prerequisites: ['Python Setup'],
  lesson: {
    objectives: [
      'Understand Python\'s name-binding model: variables are references, not memory boxes',
      'Identify primitive data types: int, float, str, bool',
      'Perform explicit type conversions (casting)',
      'Recognize object identity with `id()` and `is` vs value equality `==`',
    ],
    keyConcepts: [
      { label: 'Name Binding', text: 'In Python, variables are tags bound to objects in heap memory.' },
      { label: 'Dynamic Typing', text: 'Types belong to values, not to variable names.' },
      { label: 'Mutability', text: 'Integers, floats, and strings are immutable; lists and dicts are mutable.' },
      { label: 'id() Function', text: 'Returns the unique memory address of the object in heap.' },
    ],
    theoryMarkdown: `
In Python, variables do not store values directly inside named memory slots. Instead, **variables are reference tags bound to objects allocated on the heap**.

When you write:
\`\`\`python
x = 42
y = x
\`\`\`
Both \`x\` and \`y\` point to the **exact same integer object** in memory:
$$\\text{id}(x) == \\text{id}(y)$$

### Core Built-in Types:
- \`int\`: Arbitrary-precision integers (e.g. \`42\`, \`-9000\`).
- \`float\`: Double-precision 64-bit IEEE 754 floating point numbers (e.g. \`3.14159\`).
- \`str\`: Immutable sequences of Unicode characters (e.g. \`"Airavata"\`).
- \`bool\`: Boolean values (\`True\` or \`False\`).

### Type Conversion (Casting):
Explicit conversion functions create new objects:
\`\`\`python
age_str = "25"
age_int = int(age_str)  # Converts string to integer 25
\`\`\`
    `.trim(),
    formulas: [
      '\\text{variable} \\xrightarrow{\\text{binds to}} \\text{Heap Object}(\\text{type}, \\text{value}, \\text{ref\\_count})',
      '\\text{x is y} \\iff \\text{id}(x) == \\text{id}(y)',
    ],
    examples: [
      {
        title: 'Reassignment vs Mutation',
        description: 'Demonstrating how rebinding an integer variable creates a new object in memory.',
        mathOrCode: 'a = 10\nprint(id(a))  # e.g. 0x1000\na = a + 1\nprint(id(a))  # e.g. 0x1020 (New object created!)',
        steps: [
          'Integers are immutable in Python.',
          'Evaluating a + 1 allocates a new integer 11 in heap memory.',
          'Variable "a" is rebound to the new address.',
        ],
      },
    ],
    visuals: {
      type: 'python_memory',
      title: 'Python Heap Reference Model',
      caption: 'Variable tags on the stack point to heap objects. Reassigning a variable updates the pointer without destroying the old value.',
    },
    misconceptions: [
      {
        id: 'M_PY_BOX_MODEL',
        name: 'The "Box" Storage Fallacy',
        description: 'Assuming Python variables are fixed memory boxes that hold raw bytes like C primitives.',
        remedialTip: 'In Python, all data lives on the heap as objects. Variables are lightweight pointers/stickers.',
      },
      {
        id: 'M_PY_IS_VS_EQUAL',
        name: 'Identity vs Equality Confusion',
        description: 'Using `is` instead of `==` to compare numerical values.',
        remedialTip: '`==` compares values (content). `is` compares memory identity (address).',
      },
    ],
    realWorldApp: 'Managing sensor readings in data science: Understanding references prevents unintended memory bloat when passing large telemetry data.',
    recap: [
      'Variables are labels bound to objects on the heap.',
      'Primitives (int, float, str, bool) are immutable.',
      'Use type() to inspect types and int(), float(), str() to convert.',
    ],
    fallbacks: {
      analogy: 'Imagine luggage tags at an airport. The tag has your name on it, but it is tied with a string to a suitcase. If you take the tag off and tie it to a new backpack, the suitcase didn\'t change, only your tag moved!',
      eli5: 'Variables are like name stickers. You stick the sticker "x" onto a ball that has the number 5 written on it. You can move the sticker to another toy anytime!',
      stepByStep: '1. Python evaluates right-hand side expression. 2. Allocates object on heap. 3. Binds variable name on left to the object reference.',
      socratic: 'If a = [1, 2] and b = a, and then you do b.append(3), what happens to a? Why did modifying b change a?',
    },
  },
  questions: [
    {
      id: 'q_py_1',
      topicId: 'py_1_1_variables_datatypes',
      difficulty: 'easy',
      prompt: 'What will be the output of `type(3.14)` in Python 3?',
      choices: [
        { id: 'c1', text: "<class 'float'>", isCorrect: true, explanation: 'Correct! Numbers with decimal points are represented as float instances.' },
        { id: 'c2', text: "<class 'double'>", isCorrect: false, explanation: "Incorrect. C and Java have 'double', but Python calls its 64-bit floats 'float'." },
        { id: 'c3', text: "<class 'decimal'>", isCorrect: false, explanation: "Incorrect. Decimal requires importing the 'decimal' module." },
      ],
      hint: 'Look at Python\'s built-in floating-point type name.',
    },
    {
      id: 'q_py_2',
      topicId: 'py_1_1_variables_datatypes',
      difficulty: 'medium',
      prompt: 'What is the output of the following Python snippet?\n\n```python\nx = 10\ny = x\nx = 20\nprint(y)\n```',
      choices: [
        { id: 'c1', text: '10', isCorrect: true, explanation: 'Correct! x was rebound to integer 20, while y remains bound to the integer 10.' },
        { id: 'c2', text: '20', isCorrect: false, misconceptionId: 'M_PY_BOX_MODEL', explanation: 'Misconception: Reassigning x does NOT mutate the integer 10 that y points to.' },
      ],
      hint: 'Integers are immutable. Reassigning x = 20 does not alter y.',
    },
    {
      id: 'q_py_3',
      topicId: 'py_1_1_variables_datatypes',
      difficulty: 'medium',
      prompt: 'What is the difference between `a == b` and `a is b` in Python?',
      choices: [
        { id: 'c1', text: '`==` compares value equality; `is` compares memory identity (exact same object).', isCorrect: true, explanation: 'Exact! `==` calls `__eq__` to check content; `is` verifies whether `id(a) == id(b)`.' },
        { id: 'c2', text: '`is` is just an alias for `==` for cleaner syntax.', isCorrect: false, misconceptionId: 'M_PY_IS_VS_EQUAL', explanation: 'Misconception: `is` checks memory address identity, not just equality of values.' },
      ],
      hint: 'Think about two identical cars produced by the same factory: are they the same model (==) or the exact same vehicle (is)?',
    },
    {
      id: 'q_py_4',
      topicId: 'py_1_1_variables_datatypes',
      difficulty: 'hard',
      prompt: 'What will be printed by: `print(bool("False"))`?',
      choices: [
        { id: 'c1', text: 'True', isCorrect: true, explanation: 'Correct! Any non-empty string in Python evaluates to True in boolean context, regardless of text contents.' },
        { id: 'c2', text: 'False', isCorrect: false, explanation: 'Incorrect. Only the empty string `""` evaluates to False. The string `"False"` is non-empty!' },
      ],
      hint: 'Python tests truthiness based on whether a string is empty or non-empty.',
    },
    {
      id: 'q_py_5',
      topicId: 'py_1_1_variables_datatypes',
      difficulty: 'hard',
      prompt: 'Which of the following built-in Python data types is MUTABLE?',
      choices: [
        { id: 'c1', text: 'list', isCorrect: true, explanation: 'Correct! Lists can be modified in-place with `.append()`, `.extend()`, and slice assignment.' },
        { id: 'c2', text: 'tuple', isCorrect: false, explanation: 'Tuples are immutable; once instantiated, their elements cannot be altered.' },
        { id: 'c3', text: 'str', isCorrect: false, explanation: 'Strings are immutable in Python.' },
        { id: 'c4', text: 'int', isCorrect: false, explanation: 'Integers are immutable.' },
      ],
      hint: 'Which data type allows you to append new elements without creating a new object?',
    },
  ],
};

// ==========================================================
// 3. SCIENCE — STAR MODULE: PHYSICS NEWTON'S LAWS
// ==========================================================
const TOPIC_PHYSICS_NEWTON: Topic = {
  id: 'phys_1_1_newtons_laws',
  chapterId: 'phys_chap_1_mechanics',
  title: "1.1 Newton's Laws of Motion",
  subtitle: 'Inertia, F = ma, net forces, and action-reaction pairs across different bodies',
  order: 1,
  estimatedMinutes: 12,
  subtopics: ["First Law (Inertia)", "Second Law (F = ma)", "Third Law (Action-Reaction)", "Free-Body Diagrams"],
  prerequisites: ['Vectors & Scalars', 'Velocity & Acceleration'],
  lesson: {
    objectives: [
      'State and apply Newton\'s Three Laws of Motion to real physical systems',
      'Calculate acceleration from net force and mass using F = ma',
      'Distinguish between balanced equilibrium forces and action-reaction pairs',
      'Construct and solve free-body diagrams in one and two dimensions',
    ],
    keyConcepts: [
      { label: 'First Law (Inertia)', text: 'An object remains at rest or constant velocity unless acted upon by a net external force.' },
      { label: 'Second Law', text: 'Net force equals rate of change of momentum: F_net = m * a.' },
      { label: 'Third Law', text: 'Every action has an equal and opposite reaction acting on DIFFERENT bodies: F_{A→B} = -F_{B→A}.' },
      { label: 'Equilibrium', text: 'Net force = 0 means acceleration is zero (constant velocity or static rest).' },
    ],
    theoryMarkdown: `
Sir Isaac Newton formalized classical mechanics with three fundamental principles:

### 1. First Law: Law of Inertia
$$\\sum \\vec{F} = 0 \\implies \\vec{a} = 0 \\quad (\\vec{v} = \\text{constant})$$
Matter resists changes to its state of motion. Mass is the quantitative measure of inertia.

### 2. Second Law: Fundamental Force Equation
$$\\vec{F}_{\\text{net}} = m \\cdot \\vec{a}$$
Acceleration is directly proportional to net force and inversely proportional to mass. In SI units:
$$1 \\text{ Newton} = 1 \\text{ kg} \\cdot \\text{m/s}^2$$

### 3. Third Law: Action-Reaction Pairs
$$\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}$$
**Crucial Boundary:** Action-reaction pairs **never act on the same object**. They act on two different interacting bodies and therefore never cancel each other out on one body!
    `.trim(),
    formulas: [
      '\\vec{F}_{\\text{net}} = \\sum \\vec{F} = m \\cdot \\vec{a}',
      '\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}',
      'W = m \\cdot g \\quad (g \\approx 9.8 \\text{ m/s}^2)',
    ],
    examples: [
      {
        title: 'Accelerating a Sled',
        description: 'A 20 kg sled is pushed across frictionless ice with a horizontal force of 60 N. Calculate acceleration.',
        mathOrCode: 'F_{\\text{net}} = m \\cdot a \\\\\n60 \\text{ N} = (20 \\text{ kg}) \\cdot a \\\\\na = \\frac{60}{20} = 3 \\text{ m/s}^2',
        steps: [
          'Identify all forces: Gravity and normal force cancel vertically.',
          'Horizontal net force is 60 N.',
          'Apply Second Law: a = F / m = 60 / 20 = 3 m/s².',
        ],
      },
    ],
    visuals: {
      type: 'newton_forces',
      title: "Newton's Force Vector Classifier",
      caption: 'Distinguishes static equilibrium (forces summing to zero on ONE object) from true 3rd Law pairs (forces on TWO DIFFERENT objects).',
    },
    misconceptions: [
      {
        id: 'M_PHYS_ACTION_CANCEL',
        name: 'Action-Reaction Cancellation Fallacy',
        description: 'Believing action-reaction pairs cancel each other out into equilibrium.',
        remedialTip: 'Forces only cancel if they act on the same body! 3rd Law forces act on opposite bodies.',
      },
      {
        id: 'M_PHYS_FORCE_MAINTAINS_VELOCITY',
        name: 'Aristotelian Motion Fallacy',
        description: 'Assuming a continuous force is required to keep an object moving at constant speed.',
        remedialTip: 'Newton\'s First Law: Zero net force means constant velocity! Force is required to ACCELERATE, not to sustain motion in vacuum.',
      },
    ],
    realWorldApp: 'Rocket Propulsion: Exhaust gas pushed downward with force F reacts by pushing the rocket upward with force -F, working even in the vacuum of space!',
    recap: [
      'No net force = no acceleration (velocity is constant).',
      'F_net = m * a.',
      'Action-reaction pairs act on different objects and never cancel on a single body.',
    ],
    fallbacks: {
      analogy: 'Imagine stepping off a canoe onto a dock. As you push forward toward the dock, the canoe pushes backward beneath you. One force pushed you forward; the reaction force pushed the canoe backward!',
      eli5: 'If you push against a wall, the wall pushes right back on your hands with the exact same strength. If you push on a skateboard, it rolls away because the force was on the board!',
      stepByStep: '1. Draw a free body diagram. 2. Sum up all forces in x and y. 3. Set sum F = m * a. 4. Solve for acceleration.',
      socratic: 'If you punch a boxing bag, does your fist exert more force on the bag, or does the bag exert more force on your fist? What does Newton\'s 3rd Law dictate?',
    },
  },
  questions: [
    {
      id: 'q_phys_1',
      topicId: 'phys_1_1_newtons_laws',
      difficulty: 'easy',
      prompt: 'A car is traveling on a straight highway at a constant velocity of 100 km/h. What is the net horizontal force acting on the car?',
      choices: [
        { id: 'c1', text: '0 N (Zero net force)', isCorrect: true, explanation: 'Correct! By Newton\'s First Law, constant velocity means zero acceleration: F_net = m * 0 = 0.' },
        { id: 'c2', text: 'A large positive force equal to engine power', isCorrect: false, misconceptionId: 'M_PHYS_FORCE_MAINTAINS_VELOCITY', explanation: 'Misconception: Engine force balances out friction and air resistance, resulting in zero net force!' },
        { id: 'c3', text: '100 N', isCorrect: false, explanation: 'Speed in km/h does not equal force in Newtons.' },
      ],
      hint: 'Constant velocity means acceleration is zero. What does F = m * a give when a = 0?',
    },
    {
      id: 'q_phys_2',
      topicId: 'phys_1_1_newtons_laws',
      difficulty: 'medium',
      prompt: 'An astronaut with mass 70 kg in deep space experiences an unexpected thruster net force of 210 N. What is their acceleration?',
      choices: [
        { id: 'c1', text: '$3.0 \\text{ m/s}^2$', isCorrect: true, explanation: 'Correct! $a = F / m = 210 / 70 = 3.0 \\text{ m/s}^2$.' },
        { id: 'c2', text: '$0.33 \\text{ m/s}^2$', isCorrect: false, explanation: 'Incorrect. Remember to divide force by mass: a = 210 / 70, not mass / force.' },
        { id: 'c3', text: '$14,700 \\text{ m/s}^2$', isCorrect: false, explanation: 'Incorrect. Do not multiply force by mass!' },
      ],
      hint: 'Use Newton\'s Second Law: $a = F / m$.',
    },
    {
      id: 'q_phys_3',
      topicId: 'phys_1_1_newtons_laws',
      difficulty: 'medium',
      prompt: 'A book rests on a table. The table exerts an upward normal force of 15 N on the book. What is the Newton\'s Third Law reaction partner to this normal force?',
      choices: [
        { id: 'c1', text: 'The downward contact force exerted by the book ON the table.', isCorrect: true, explanation: 'Correct! Force of Table on Book is paired with Force of Book on Table (acting on different objects).' },
        { id: 'c2', text: 'The gravitational pull of Earth on the book.', isCorrect: false, misconceptionId: 'M_PHYS_ACTION_CANCEL', explanation: 'Misconception: Earth\'s gravity acts on the book. Two forces on the same book are balanced equilibrium forces, not a 3rd Law pair!' },
      ],
      hint: 'Newton 3rd Law pairs swap the two interacting bodies: Force of A on B pairs with Force of B on A.',
    },
    {
      id: 'q_phys_4',
      topicId: 'phys_1_1_newtons_laws',
      difficulty: 'hard',
      prompt: 'A 5 kg block is pulled across a floor with a force of 30 N against a constant friction force of 10 N. What is its acceleration?',
      choices: [
        { id: 'c1', text: '$4 \\text{ m/s}^2$', isCorrect: true, explanation: 'Correct! Net force = 30 N - 10 N = 20 N. Acceleration = 20 / 5 = 4 m/s².' },
        { id: 'c2', text: '$6 \\text{ m/s}^2$', isCorrect: false, explanation: 'Incorrect. You forgot to subtract the opposing 10 N friction force!' },
        { id: 'c3', text: '$2 \\text{ m/s}^2$', isCorrect: false, explanation: 'Incorrect calculation.' },
      ],
      hint: 'First calculate the NET force: pulling force minus friction.',
    },
    {
      id: 'q_phys_5',
      topicId: 'phys_1_1_newtons_laws',
      difficulty: 'hard',
      prompt: 'A massive freight train collides head-on with a tiny mosquito. According to Newton\'s Third Law, how does the magnitude of the force exerted by the train on the mosquito compare to the force exerted by the mosquito on the train?',
      choices: [
        { id: 'c1', text: 'They are strictly equal in magnitude ($|F_{\\text{train}}| = |F_{\\text{mosquito}}|$).', isCorrect: true, explanation: 'Correct! Newton\'s Third Law holds universally: forces are equal in magnitude. The mosquito experiences devastating acceleration because its mass is microscopic (a = F/m).' },
        { id: 'c2', text: 'The train exerts a much greater force because of its momentum.', isCorrect: false, explanation: 'Common intuition fallacy! The forces are identical; the resulting accelerations differ vastly due to mass.' },
      ],
      hint: 'Newton\'s Third Law states: for every action, there is an EQUAL and opposite reaction.',
    },
  ],
};

// ==========================================================
// FULL BRANCHES AND CHAPTERS FOR ROADMAP EXPLORER
// ==========================================================
export const ALL_BRANCHES: Branch[] = [
  // --- CODING: PYTHON ---
  {
    id: 'python',
    subjectId: 'coding',
    name: 'Python',
    badge: 'Dynamic & AI',
    description: 'From syntax and memory references to object-oriented patterns and data structures.',
    icon: 'Code2',
    chapters: [
      {
        id: 'py_chap_1_fundamentals',
        branchId: 'python',
        order: 1,
        title: '1. Variables and Data Types',
        description: 'Memory binding, dynamic typing, primitive and composite values.',
        topics: [TOPIC_PYTHON_VARIABLES],
      },
      {
        id: 'py_chap_2_control_flow',
        branchId: 'python',
        order: 2,
        title: '2. Control Flow & Loops',
        description: 'Conditionals, while/for loops, break, continue, and comprehension iterators.',
        topics: [],
      },
      {
        id: 'py_chap_3_functions',
        branchId: 'python',
        order: 3,
        title: '3. Functions and Scope',
        description: 'Parameters, default arguments, closures, namespaces, and recursion.',
        topics: [],
      },
      {
        id: 'py_chap_4_oop',
        branchId: 'python',
        order: 4,
        title: '4. Object-Oriented Python',
        description: 'Classes, dunder methods, inheritance, polymorphism, and composition.',
        topics: [],
      },
    ],
  },

  // --- CODING: C ---
  {
    id: 'c',
    subjectId: 'coding',
    name: 'C',
    badge: 'Systems & Memory',
    description: 'Hardware interaction, manual stack/heap control, pointers, and memory layout.',
    icon: 'Terminal',
    chapters: [
      {
        id: 'c_chap_1_pointers',
        branchId: 'c',
        order: 1,
        title: '1. Pointers and Memory Addresses',
        description: 'Stack frames, address-of operator &, dereferencing, and pointer arithmetic.',
        topics: [],
      },
      {
        id: 'c_chap_2_dynamic_memory',
        branchId: 'c',
        order: 2,
        title: '2. Dynamic Allocation (malloc / free)',
        description: 'Heap lifecycle, avoiding memory leaks, and dangling pointers.',
        topics: [],
      },
    ],
  },

  // --- CODING: C++ ---
  {
    id: 'cpp',
    subjectId: 'coding',
    name: 'C++',
    badge: 'Performance & RAII',
    description: 'Zero-cost abstractions, references, smart pointers, templates, and STL.',
    icon: 'Cpu',
    chapters: [
      {
        id: 'cpp_chap_1_references',
        branchId: 'cpp',
        order: 1,
        title: '1. References vs Pointers & RAII',
        description: 'Non-null aliases, pass-by-reference (&), and deterministic destructors.',
        topics: [],
      },
      {
        id: 'cpp_chap_2_oop_vtable',
        branchId: 'cpp',
        order: 2,
        title: '2. Polymorphism & Vtables',
        description: 'Virtual functions, dynamic dispatch, and class memory layouts.',
        topics: [],
      },
    ],
  },

  // --- CODING: C# ---
  {
    id: 'csharp',
    subjectId: 'coding',
    name: 'C#',
    badge: '.NET & Enterprise',
    description: 'Type safety, managed memory, value vs reference types, and async tasks.',
    icon: 'Hash',
    chapters: [
      {
        id: 'cs_chap_1_types',
        branchId: 'csharp',
        order: 1,
        title: '1. Structs vs Classes',
        description: 'Stack-allocated value types vs heap-allocated reference types in the CLR.',
        topics: [],
      },
      {
        id: 'cs_chap_2_ref_out',
        branchId: 'csharp',
        order: 2,
        title: '2. Parameter Modifiers (ref & out)',
        description: 'Passing by reference explicitly and definite assignment guarantees.',
        topics: [],
      },
    ],
  },

  // --- CODING: JAVA ---
  {
    id: 'java',
    subjectId: 'coding',
    name: 'Java',
    badge: 'JVM & Scalability',
    description: 'Bytecode execution, strict pass-by-value, garbage collection, and concurrency.',
    icon: 'Coffee',
    chapters: [
      {
        id: 'java_chap_1_memory',
        branchId: 'java',
        order: 1,
        title: '1. Strict Pass-by-Value',
        description: 'Why Java passes reference values by copy, and how reassignment behaves.',
        topics: [],
      },
      {
        id: 'java_chap_2_gc',
        branchId: 'java',
        order: 2,
        title: '2. JVM Garbage Collection',
        description: 'Heap generational memory, mark-and-sweep, and GC roots.',
        topics: [],
      },
    ],
  },

  // --- MATHEMATICS: FUNCTIONS (STAR MODULE) ---
  {
    id: 'functions',
    subjectId: 'mathematics',
    name: 'Functions',
    badge: 'Core Foundation',
    description: 'Mappings, domain and range, injective/surjective properties, and visual representations.',
    icon: 'Binary',
    chapters: [
      {
        id: 'math_chap_1_sets_functions',
        branchId: 'functions',
        order: 1,
        title: '1. Sets and Functions',
        description: 'Set theory relations, functional mappings, domain, codomain, and range.',
        topics: [TOPIC_MATH_FUNCTIONS],
      },
      {
        id: 'math_chap_2_polynomial_types',
        branchId: 'functions',
        order: 2,
        title: '2. Types of Functions',
        description: 'Polynomial, rational, trigonometric, exponential, and logarithmic families.',
        topics: [],
      },
      {
        id: 'math_chap_3_inverses',
        branchId: 'functions',
        order: 3,
        title: '3. Inverse & Composite Functions',
        description: 'Bijective requirements for invertibility and function composition f(g(x)).',
        topics: [],
      },
    ],
  },

  // --- MATHEMATICS: CALCULUS ---
  {
    id: 'calculus',
    subjectId: 'mathematics',
    name: 'Differential Calculus',
    badge: 'Rates & Optimization',
    description: 'Limits, continuity, derivatives, differentiation rules, and geometric slopes.',
    icon: 'Compass',
    chapters: [
      {
        id: 'calc_chap_1_derivatives',
        branchId: 'calculus',
        order: 1,
        title: '1. Derivatives & The Chain Rule',
        description: 'Instantaneous rate of change, tangent slopes, and composite derivatives.',
        topics: [],
      },
    ],
  },

  // --- MATHEMATICS: LINEAR ALGEBRA ---
  {
    id: 'linear_algebra',
    subjectId: 'mathematics',
    name: 'Linear Algebra',
    badge: 'Vectors & Matrices',
    description: 'Vector spaces, matrix transformations, determinants, rank, and eigenvalues.',
    icon: 'Layers',
    chapters: [
      {
        id: 'la_chap_1_vectors_matrices',
        branchId: 'linear_algebra',
        order: 1,
        title: '1. Vector Operations & Matrices',
        description: 'Dot products, matrix multiplication non-commutativity, and coordinate transforms.',
        topics: [],
      },
    ],
  },

  // --- SCIENCE: PHYSICS (STAR MODULE) ---
  {
    id: 'physics',
    subjectId: 'science',
    name: 'Physics',
    badge: 'Mechanics & Energy',
    description: 'Newtonian motion, force interactions, energy conservation, and field dynamics.',
    icon: 'Atom',
    chapters: [
      {
        id: 'phys_chap_1_mechanics',
        branchId: 'physics',
        order: 1,
        title: "1. Newton's Laws of Motion",
        description: 'Inertia, F = ma, equilibrium vs action-reaction pairs, and free-body diagrams.',
        topics: [TOPIC_PHYSICS_NEWTON],
      },
      {
        id: 'phys_chap_2_work_energy',
        branchId: 'physics',
        order: 2,
        title: '2. Work, Energy, and Power',
        description: 'Kinetic energy, gravitational potential, and conservative forces.',
        topics: [],
      },
      {
        id: 'phys_chap_3_thermo',
        branchId: 'physics',
        order: 3,
        title: '3. Heat & Thermodynamics',
        description: 'Thermal equilibrium, conduction vs temperature perception, and entropy.',
        topics: [],
      },
    ],
  },

  // --- SCIENCE: CHEMISTRY ---
  {
    id: 'chemistry',
    subjectId: 'science',
    name: 'Chemistry',
    badge: 'Bonding & Reactions',
    description: 'Atomic orbitals, chemical bonds, stoichiometry, and reaction equilibrium.',
    icon: 'FlaskConical',
    chapters: [
      {
        id: 'chem_chap_1_atomic',
        branchId: 'chemistry',
        order: 1,
        title: '1. Atomic Structure & Periodicity',
        description: 'Electron configurations, electronegativity trends, and valence shells.',
        topics: [],
      },
    ],
  },

  // --- SCIENCE: BIOLOGY ---
  {
    id: 'biology',
    subjectId: 'science',
    name: 'Biology',
    badge: 'Cells & Genetics',
    description: 'Cellular respiration, DNA replication, protein synthesis, and ecological systems.',
    icon: 'Dna',
    chapters: [
      {
        id: 'bio_chap_1_cells',
        branchId: 'biology',
        order: 1,
        title: '1. Cell Biology & Membranes',
        description: 'Lipid bilayer, passive/active transport, and organelle compartmentalization.',
        topics: [],
      },
    ],
  },
];

// Helper to look up a topic by ID across all branches
export function findTopicById(topicId: string): { topic: Topic; chapter: Chapter; branch: Branch; subject: SubjectCategory } | null {
  for (const branch of ALL_BRANCHES) {
    for (const chapter of branch.chapters) {
      for (const topic of chapter.topics) {
        if (topic.id === topicId) {
          const subject = SUBJECT_CATEGORIES.find((s) => s.id === branch.subjectId)!;
          return { topic, chapter, branch, subject };
        }
      }
    }
  }
  return null;
}

// Get all topics flat array
export function getAllTopics(): Topic[] {
  const topics: Topic[] = [];
  for (const branch of ALL_BRANCHES) {
    for (const chapter of branch.chapters) {
      topics.push(...chapter.topics);
    }
  }
  return topics;
}
