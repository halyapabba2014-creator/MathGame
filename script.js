// ===== Application State =====
const appState = {
    currentTopic: null,
    currentLesson: null,
    currentStep: 0,
    completedLessons: JSON.parse(localStorage.getItem('completedLessons') || '[]'),
    progress: JSON.parse(localStorage.getItem('lessonProgress') || '{}'),
    fontSize: localStorage.getItem('fontSize') || 'normal',
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false'
};

// ===== Topic Definitions =====
const topics = {
    'basics': {
        title: 'Math Basics',
        icon: '🔢',
        description: 'What numbers are and how to count',
        lessons: [
            { id: 'what-are-numbers', title: 'What Are Numbers?', icon: '123', description: 'Learn what numbers mean' },
            { id: 'counting', title: 'Counting Objects', icon: '🔢', description: 'Count things around you' },
            { id: 'comparing', title: 'More or Less', icon: '⚖️', description: 'Compare amounts' }
        ]
    },
    'numbers': {
        title: 'Numbers',
        icon: '123',
        description: 'Whole numbers, number lines, and more',
        lessons: [
            { id: 'whole-numbers', title: 'Whole Numbers', icon: '1️⃣', description: 'Numbers 0, 1, 2, 3...' },
            { id: 'number-line', title: 'Number Line', icon: '📏', description: 'See numbers in order' },
            { id: 'even-odd', title: 'Even and Odd', icon: '🔢', description: 'Learn about even and odd numbers' }
        ]
    },
    // Split into individual operation topics
    'addition': {
        title: 'Addition',
        icon: '➕',
        description: 'Putting amounts together',
        lessons: [
            { id: 'adding-objects', title: 'Adding with Objects', icon: '🍎', description: 'Add by counting objects' },
            { id: 'addition-facts', title: 'Addition Facts', icon: '🧠', description: 'Quick addition practice' },
            { id: 'real-life-add', title: 'Real Life Adding', icon: '🛒', description: 'Adding in everyday life' }
        ]
    },
    'subtraction': {
        title: 'Subtraction',
        icon: '➖',
        description: 'Taking away from an amount',
        lessons: [
            { id: 'taking-away', title: 'Taking Away', icon: '🍪', description: 'Subtract by removing objects' },
            { id: 'subtraction-facts', title: 'Subtraction Facts', icon: '🧠', description: 'Quick subtraction practice' },
            { id: 'real-life-subtract', title: 'Real Life Subtracting', icon: '🧺', description: 'Subtracting in stories' }
        ]
    },
    'multiplication': {
        title: 'Multiplication',
        icon: '✖️',
        description: 'Groups and repeated addition',
        lessons: [
            { id: 'repeated-addition', title: 'Repeated Addition', icon: '📦', description: 'See multiplication as groups' },
            { id: 'grouping', title: 'Grouping Objects', icon: '🧱', description: 'Count faster using groups' },
            { id: 'times-tables', title: 'Times Tables (Beginner)', icon: '🧠', description: 'Easy multiplication facts' }
        ]
    },
    'division': {
        title: 'Division',
        icon: '➗',
        description: 'Sharing equally',
        lessons: [
            { id: 'sharing', title: 'Sharing Equally', icon: '🍎', description: 'Split items fairly' },
            { id: 'division-facts', title: 'Division Facts', icon: '🧠', description: 'Easy division practice' },
            { id: 'real-life-division', title: 'Real Life Sharing', icon: '👫', description: 'Sharing in stories' }
        ]
    },
    // Split fractions and decimals
    'fractions': {
        title: 'Fractions',
        icon: '🍕',
        description: 'Parts of a whole',
        lessons: [
            { id: 'parts-whole', title: 'Parts of a Whole', icon: '🍕', description: 'What fractions mean' },
            { id: 'visual-fractions', title: 'Visual Fractions', icon: '📊', description: 'See fractions as pictures' },
            { id: 'fraction-of-number', title: 'Fraction of a Number', icon: '🧠', description: 'Half, third, quarter of a number' }
        ]
    },
    'decimals': {
        title: 'Decimals',
        icon: '0️⃣.0️⃣',
        description: 'Numbers with a dot (point)',
        lessons: [
            { id: 'simple-decimals', title: 'Simple Decimals', icon: '🔢', description: '0.5, 1.5, 2.0...' },
            { id: 'decimal-add', title: 'Adding Decimals', icon: '➕', description: 'Add easy decimals like halves' },
            { id: 'money-decimals', title: 'Money as Decimals', icon: '💰', description: 'Coins and prices' }
        ]
    },
    // More standalone topics
    'place-value': {
        title: 'Place Value',
        icon: '🏠',
        description: 'Ones, tens, hundreds',
        lessons: [
            { id: 'tens-ones', title: 'Ones and Tens', icon: '🔟', description: 'Understand 14 = 1 ten + 4 ones' },
            { id: 'hundreds', title: 'Hundreds', icon: '💯', description: 'Bigger numbers' },
            { id: 'make-number', title: 'Make a Number', icon: '🧩', description: 'Build numbers from parts' }
        ]
    },
    'patterns': {
        title: 'Patterns',
        icon: '🧩',
        description: 'Find what comes next',
        lessons: [
            { id: 'patterns-next', title: 'What Comes Next?', icon: '➡️', description: 'Spot simple patterns' },
            { id: 'skip-counting', title: 'Skip Counting', icon: '⏭️', description: 'Count by 2s, 5s, 10s' },
            { id: 'growing-patterns', title: 'Growing Patterns', icon: '🌱', description: 'Patterns that increase' }
        ]
    },
    'geometry': {
        title: 'Geometry',
        icon: '📐',
        description: 'Shapes and space',
        lessons: [
            { id: 'shapes-2d', title: '2D Shapes', icon: '⬜', description: 'Flat shapes' },
            { id: 'shapes-3d', title: '3D Shapes', icon: '📦', description: 'Solid shapes' },
            { id: 'area-perimeter', title: 'Area and Perimeter', icon: '📐', description: 'Size and distance around' }
        ]
    },
    // Split measurements
    'length': {
        title: 'Length',
        icon: '📏',
        description: 'How long something is',
        lessons: [
            { id: 'length', title: 'Length Basics', icon: '📏', description: 'Longer and shorter' },
            { id: 'estimate-length', title: 'Estimate Length', icon: '👀', description: 'Guess then check' },
            { id: 'ruler-basics', title: 'Using a Ruler', icon: '📐', description: 'Simple ruler practice' }
        ]
    },
    'weight': {
        title: 'Weight',
        icon: '⚖️',
        description: 'How heavy something is',
        lessons: [
            { id: 'weight', title: 'Weight Basics', icon: '⚖️', description: 'Heavier and lighter' },
            { id: 'estimate-weight', title: 'Estimate Weight', icon: '👀', description: 'Guess then check' },
            { id: 'grams-kilos', title: 'Grams and Kilograms', icon: '🧠', description: 'Basic units' }
        ]
    },
    'time': {
        title: 'Time',
        icon: '⏰',
        description: 'Minutes and hours',
        lessons: [
            { id: 'time', title: 'Time Basics', icon: '⏰', description: 'Minutes, hours, days' },
            { id: 'clock-reading', title: 'Reading a Clock', icon: '🕒', description: 'Simple times' },
            { id: 'time-add', title: 'Adding Time', icon: '➕', description: 'Minutes and hours together' }
        ]
    },
    'money': {
        title: 'Money',
        icon: '💰',
        description: 'Coins, notes, and prices',
        lessons: [
            { id: 'coins', title: 'Coins', icon: '🪙', description: 'Count coins' },
            { id: 'simple-prices', title: 'Simple Prices', icon: '🏷️', description: 'Add prices' },
            { id: 'change', title: 'Making Change', icon: '🧾', description: 'Find the difference' }
        ]
    },
    'word-problems': {
        title: 'Word Problems',
        icon: '📝',
        description: 'Real-life math stories',
        lessons: [
            { id: 'simple-stories', title: 'Simple Stories', icon: '📖', description: 'Math in stories' },
            { id: 'find-numbers', title: 'Finding Numbers', icon: '🔍', description: 'Pick out important numbers' },
            { id: 'step-by-step', title: 'Step-by-Step Solving', icon: '👣', description: 'Solve problems one step at a time' }
        ]
    }
};

function renderTopicsGrid() {
    const grid = document.getElementById('topicsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    Object.keys(topics).forEach((topicId) => {
        const topic = topics[topicId];
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.dataset.topic = topicId;
        card.innerHTML = `
            <div class="topic-icon">${topic.icon || '📘'}</div>
            <h3>${topic.title}</h3>
            <p>${topic.description || 'Learn step by step'}</p>
        `;
        grid.appendChild(card);
    });
}

// ===== Lesson Content =====
const lessonContent = {
    // Math Basics
    'what-are-numbers': {
        steps: [
            {
                type: 'visual',
                title: 'What Are Numbers?',
                content: 'Numbers help us count things!',
                visual: { type: 'objects', count: 5, object: '🍎' },
                explanation: 'Numbers tell us "how many". If you have 3 apples, the number 3 tells us how many apples you have.'
            },
            {
                type: 'example',
                title: 'Let\'s Count Together',
                content: 'Look at these apples. How many do you see?',
                visual: { type: 'objects', count: 4, object: '🍎' },
                answer: 4
            },
            {
                type: 'practice',
                title: 'Your Turn!',
                questions: [
                    { question: 'How many stars do you see? ⭐⭐⭐', answer: 3 },
                    { question: 'Count the hearts: ❤️❤️❤️❤️❤️', answer: 5 },
                    { question: 'How many circles? ⭕⭕⭕⭕', answer: 4 },
                    { question: 'Count the squares: ⬜⬜⬜', answer: 3 },
                    { question: 'How many triangles? 🔺🔺🔺🔺🔺🔺', answer: 6 },
                    { question: 'Count the diamonds: 💎💎💎💎💎💎💎', answer: 7 },
                    { question: 'How many moons? 🌙🌙🌙🌙', answer: 4 },
                    { question: 'Count the suns: ☀️☀️☀️', answer: 3 },
                    { question: 'How many flowers? 🌸🌸🌸🌸🌸', answer: 5 },
                    { question: 'Count the balloons: 🎈🎈🎈🎈🎈🎈🎈🎈', answer: 8 }
                ]
            }
        ]
    },
    'counting': {
        steps: [
            {
                type: 'visual',
                title: 'Counting Objects',
                content: 'We count by saying: 1, 2, 3, 4, 5...',
                visual: { type: 'objects', count: 6, object: '🔵' },
                explanation: 'When we count, we point to each object and say a number. Start with 1 and go up!'
            },
            {
                type: 'practice',
                title: 'Practice Counting',
                questions: [
                    { question: 'Count the circles: ⭕⭕⭕', answer: 3 },
                    { question: 'How many squares? ⬜⬜⬜⬜', answer: 4 },
                    { question: 'Count the stars: ⭐⭐⭐⭐⭐', answer: 5 },
                    { question: 'How many hearts? ❤️❤️❤️❤️❤️❤️', answer: 6 },
                    { question: 'Count the dots: 🔵🔵🔵🔵🔵🔵🔵', answer: 7 },
                    { question: 'How many triangles? 🔺🔺🔺🔺', answer: 4 },
                    { question: 'Count the diamonds: 💎💎💎💎💎', answer: 5 },
                    { question: 'How many circles? ⭕⭕⭕⭕⭕⭕⭕⭕', answer: 9 },
                    { question: 'Count the stars: ⭐⭐⭐⭐⭐⭐⭐⭐⭐', answer: 10 },
                    { question: 'How many squares? ⬜⬜⬜⬜⬜⬜⬜⬜', answer: 8 }
                ]
            }
        ]
    },
    'comparing': {
        steps: [
            {
                type: 'visual',
                title: 'More or Less',
                content: 'We can compare numbers to see which is bigger or smaller',
                visual: { type: 'objects', count: 5, object: '🔵' },
                explanation: 'If you have 5 balls and your friend has 3 balls, you have MORE. Your friend has LESS.'
            },
            {
                type: 'practice',
                title: 'Which is More?',
                questions: [
                    { question: 'Which is more: 4 or 2? (answer with the bigger number)', answer: 4 },
                    { question: 'Which is less: 1 or 5? (answer with the smaller number)', answer: 1 },
                    { question: 'Which is more: 7 or 3? (answer with the bigger number)', answer: 7 },
                    { question: 'Which is less: 2 or 6? (answer with the smaller number)', answer: 2 },
                    { question: 'Which is more: 9 or 5? (answer with the bigger number)', answer: 9 },
                    { question: 'Which is less: 4 or 8? (answer with the smaller number)', answer: 4 },
                    { question: 'Which is more: 10 or 6? (answer with the bigger number)', answer: 10 },
                    { question: 'Which is less: 3 or 7? (answer with the smaller number)', answer: 3 },
                    { question: 'Which is more: 8 or 4? (answer with the bigger number)', answer: 8 },
                    { question: 'Which is less: 1 or 9? (answer with the smaller number)', answer: 1 }
                ]
            }
        ]
    },
    // Numbers
    'whole-numbers': {
        steps: [
            {
                type: 'visual',
                title: 'Whole Numbers',
                content: 'Whole numbers are: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10...',
                visual: { type: 'objects', count: 7, object: '🔢' },
                explanation: 'Whole numbers are complete numbers without any parts. They go on forever!'
            },
            {
                type: 'practice',
                title: 'Practice',
                questions: [
                    { question: 'Is 5 a whole number? (answer 1 for yes, 0 for no)', answer: 1 },
                    { question: 'What comes after 3?', answer: 4 },
                    { question: 'What comes after 7?', answer: 8 },
                    { question: 'What comes before 5?', answer: 4 },
                    { question: 'What comes after 9?', answer: 10 },
                    { question: 'What comes before 2?', answer: 1 },
                    { question: 'Is 0 a whole number? (answer 1 for yes, 0 for no)', answer: 1 },
                    { question: 'What comes after 6?', answer: 7 },
                    { question: 'What comes before 8?', answer: 7 },
                    { question: 'What number is between 4 and 6?', answer: 5 }
                ]
            }
        ]
    },
    'number-line': {
        steps: [
            {
                type: 'visual',
                title: 'Number Line',
                content: 'A number line shows numbers in order from left to right',
                visual: { type: 'numberline', start: 0, end: 10 },
                explanation: 'On a number line, smaller numbers are on the left, bigger numbers are on the right. 0 is at the start!'
            },
            {
                type: 'practice',
                title: 'Number Line Practice',
                questions: [
                    { question: 'On a number line, which number comes after 2?', answer: 3 },
                    { question: 'Which number is bigger on a number line: 6 or 4?', answer: 6 },
                    { question: 'Which number comes after 5?', answer: 6 },
                    { question: 'Which number is smaller: 3 or 7?', answer: 3 },
                    { question: 'Which number comes before 8?', answer: 7 },
                    { question: 'Which number is bigger: 9 or 5?', answer: 9 },
                    { question: 'Which number comes after 0?', answer: 1 },
                    { question: 'Which number is smaller: 2 or 6?', answer: 2 },
                    { question: 'Which number comes before 4?', answer: 3 },
                    { question: 'Which number is between 4 and 6?', answer: 5 }
                ]
            }
        ]
    },
    // Addition & Subtraction
    'adding-objects': {
        steps: [
            {
                type: 'visual',
                title: 'Adding Means Putting Together',
                content: 'When we add, we put things together!',
                visual: { type: 'addition', a: 2, b: 3, object: '🍎' },
                explanation: 'If you have 2 apples and get 3 more, you add them: 2 + 3 = 5 apples total!'
            },
            {
                type: 'example',
                title: 'Example: Adding',
                content: 'Sarah has 3 cookies. Tom gives her 2 more. How many cookies does Sarah have now?',
                visual: { type: 'addition', a: 3, b: 2, object: '🍪' },
                answer: 5,
                explanation: '3 cookies + 2 cookies = 5 cookies'
            },
            {
                type: 'practice',
                title: 'Try Adding!',
                questions: [
                    { question: '2 + 2 = ?', answer: 4 },
                    { question: '1 + 3 = ?', answer: 4 },
                    { question: '4 + 1 = ?', answer: 5 },
                    { question: '3 + 3 = ?', answer: 6 },
                    { question: '2 + 4 = ?', answer: 6 },
                    { question: '5 + 2 = ?', answer: 7 },
                    { question: '1 + 6 = ?', answer: 7 },
                    { question: '3 + 4 = ?', answer: 7 },
                    { question: '2 + 5 = ?', answer: 7 },
                    { question: '4 + 4 = ?', answer: 8 }
                ]
            }
        ]
    },
    'taking-away': {
        steps: [
            {
                type: 'visual',
                title: 'Taking Away (Subtraction)',
                content: 'When we subtract, we take things away!',
                visual: { type: 'subtraction', total: 5, take: 2, object: '🍎' },
                explanation: 'If you have 5 apples and eat 2, you take away 2: 5 - 2 = 3 apples left!'
            },
            {
                type: 'practice',
                title: 'Practice Taking Away',
                questions: [
                    { question: '5 - 2 = ?', answer: 3 },
                    { question: '4 - 1 = ?', answer: 3 },
                    { question: '6 - 3 = ?', answer: 3 },
                    { question: '7 - 2 = ?', answer: 5 },
                    { question: '8 - 4 = ?', answer: 4 },
                    { question: '9 - 3 = ?', answer: 6 },
                    { question: '10 - 5 = ?', answer: 5 },
                    { question: '6 - 1 = ?', answer: 5 },
                    { question: '8 - 2 = ?', answer: 6 },
                    { question: '7 - 4 = ?', answer: 3 }
                ]
            }
        ]
    },
    'real-life-add': {
        steps: [
            {
                type: 'example',
                title: 'Real Life: Adding Money',
                content: 'You have 2 coins. Your friend gives you 3 more coins. How many coins do you have?',
                visual: { type: 'addition', a: 2, b: 3, object: '🪙' },
                answer: 5,
                explanation: '2 coins + 3 coins = 5 coins total!'
            },
            {
                type: 'practice',
                title: 'Real Life Practice',
                questions: [
                    { question: 'You have 3 toys. You get 2 more. How many toys?', answer: 5 },
                    { question: 'There are 4 birds. 3 more come. How many birds?', answer: 7 },
                    { question: 'Mom has 5 apples. She buys 3 more. How many apples?', answer: 8 },
                    { question: 'You have 2 books. You get 4 more. How many books?', answer: 6 },
                    { question: 'There are 6 cars. 2 more arrive. How many cars?', answer: 8 },
                    { question: 'You have 1 cookie. You get 5 more. How many cookies?', answer: 6 },
                    { question: 'There are 3 flowers. 4 more grow. How many flowers?', answer: 7 },
                    { question: 'You have 4 pencils. You get 3 more. How many pencils?', answer: 7 },
                    { question: 'There are 2 cats. 6 more come. How many cats?', answer: 8 },
                    { question: 'You have 5 stickers. You get 2 more. How many stickers?', answer: 7 }
                ]
            }
        ]
    },
    // Multiplication & Division
    'repeated-addition': {
        steps: [
            {
                type: 'visual',
                title: 'Repeated Addition (Multiplication)',
                content: 'Multiplication is adding the same number many times!',
                visual: { type: 'multiplication', groups: 3, perGroup: 2, object: '🍎' },
                explanation: '3 groups of 2 apples = 2 + 2 + 2 = 6 apples. We write this as 3 × 2 = 6'
            },
            {
                type: 'practice',
                title: 'Practice Multiplication',
                questions: [
                    { question: '2 × 3 = ? (2 groups of 3)', answer: 6 },
                    { question: '3 × 2 = ? (3 groups of 2)', answer: 6 },
                    { question: '2 × 4 = ? (2 groups of 4)', answer: 8 },
                    { question: '4 × 2 = ? (4 groups of 2)', answer: 8 },
                    { question: '3 × 3 = ? (3 groups of 3)', answer: 9 },
                    { question: '2 × 5 = ? (2 groups of 5)', answer: 10 },
                    { question: '5 × 2 = ? (5 groups of 2)', answer: 10 },
                    { question: '3 × 4 = ? (3 groups of 4)', answer: 12 },
                    { question: '4 × 3 = ? (4 groups of 3)', answer: 12 },
                    { question: '2 × 6 = ? (2 groups of 6)', answer: 12 }
                ]
            }
        ]
    },
    'sharing': {
        steps: [
            {
                type: 'visual',
                title: 'Sharing Equally (Division)',
                content: 'Division means sharing things equally!',
                visual: { type: 'division', total: 6, groups: 2, object: '🍎' },
                explanation: 'If you have 6 apples and share them with 1 friend, you each get 3 apples. 6 ÷ 2 = 3'
            },
            {
                type: 'practice',
                title: 'Practice Sharing',
                questions: [
                    { question: '8 ÷ 2 = ? (share 8 things between 2 people)', answer: 4 },
                    { question: '6 ÷ 3 = ? (share 6 things between 3 people)', answer: 2 },
                    { question: '10 ÷ 2 = ? (share 10 things between 2 people)', answer: 5 },
                    { question: '9 ÷ 3 = ? (share 9 things between 3 people)', answer: 3 },
                    { question: '12 ÷ 4 = ? (share 12 things between 4 people)', answer: 3 },
                    { question: '8 ÷ 4 = ? (share 8 things between 4 people)', answer: 2 },
                    { question: '15 ÷ 3 = ? (share 15 things between 3 people)', answer: 5 },
                    { question: '6 ÷ 2 = ? (share 6 things between 2 people)', answer: 3 },
                    { question: '10 ÷ 5 = ? (share 10 things between 5 people)', answer: 2 },
                    { question: '12 ÷ 3 = ? (share 12 things between 3 people)', answer: 4 }
                ]
            }
        ]
    },
    // Add default lessons for remaining topics
    'even-odd': {
        steps: [
            {
                type: 'visual',
                title: 'Even and Odd Numbers',
                content: 'Even numbers can be divided into pairs. Odd numbers have one left over!',
                visual: { type: 'objects', count: 6, object: '🔵' },
                explanation: 'Even numbers: 2, 4, 6, 8, 10... (can make pairs). Odd numbers: 1, 3, 5, 7, 9... (one left over)'
            },
            {
                type: 'practice',
                title: 'Practice Even and Odd',
                questions: [
                    { question: 'Is 4 even or odd? (answer 1 for even, 0 for odd)', answer: 1 },
                    { question: 'Is 5 even or odd? (answer 1 for even, 0 for odd)', answer: 0 },
                    { question: 'Is 2 even or odd? (answer 1 for even, 0 for odd)', answer: 1 },
                    { question: 'Is 7 even or odd? (answer 1 for even, 0 for odd)', answer: 0 },
                    { question: 'Is 8 even or odd? (answer 1 for even, 0 for odd)', answer: 1 },
                    { question: 'Is 3 even or odd? (answer 1 for even, 0 for odd)', answer: 0 },
                    { question: 'Is 10 even or odd? (answer 1 for even, 0 for odd)', answer: 1 },
                    { question: 'Is 9 even or odd? (answer 1 for even, 0 for odd)', answer: 0 },
                    { question: 'Is 6 even or odd? (answer 1 for even, 0 for odd)', answer: 1 },
                    { question: 'Is 1 even or odd? (answer 1 for even, 0 for odd)', answer: 0 }
                ]
            }
        ]
    },
    'grouping': {
        steps: [
            {
                type: 'visual',
                title: 'Grouping Objects',
                content: 'We can put objects into groups!',
                visual: { type: 'multiplication', groups: 4, perGroup: 3, object: '🍎' },
                explanation: 'Grouping helps us count faster. 4 groups of 3 apples = 12 apples total!'
            },
            {
                type: 'practice',
                title: 'Practice Grouping',
                questions: [
                    { question: '3 groups of 2 = ?', answer: 6 },
                    { question: '2 groups of 4 = ?', answer: 8 },
                    { question: '4 groups of 2 = ?', answer: 8 },
                    { question: '3 groups of 3 = ?', answer: 9 },
                    { question: '5 groups of 2 = ?', answer: 10 },
                    { question: '2 groups of 5 = ?', answer: 10 },
                    { question: '4 groups of 3 = ?', answer: 12 },
                    { question: '3 groups of 4 = ?', answer: 12 },
                    { question: '6 groups of 2 = ?', answer: 12 },
                    { question: '2 groups of 6 = ?', answer: 12 }
                ]
            }
        ]
    },
    'parts-whole': {
        steps: [
            {
                type: 'visual',
                title: 'Parts of a Whole',
                content: 'Fractions show parts of a whole thing!',
                visual: { type: 'fraction', whole: 4, parts: 1, object: '🍕' },
                explanation: 'If you cut a pizza into 4 pieces and eat 1 piece, you ate 1 out of 4 pieces. That\'s 1/4!'
            },
            {
                type: 'practice',
                title: 'Practice Fractions',
                questions: [
                    { question: 'If a pizza is cut into 2 pieces and you eat 1, what fraction? (answer 1 for 1/2, 2 for 2/1)', answer: 1 },
                    { question: 'If a cake is cut into 4 pieces and you eat 1, what fraction? (answer 1 for 1/4, 4 for 4/1)', answer: 1 },
                    { question: 'Half of 8 is?', answer: 4 },
                    { question: 'Half of 10 is?', answer: 5 },
                    { question: 'Half of 6 is?', answer: 3 },
                    { question: 'One quarter of 8 is?', answer: 2 },
                    { question: 'One quarter of 12 is?', answer: 3 },
                    { question: 'One third of 9 is?', answer: 3 },
                    { question: 'One third of 6 is?', answer: 2 },
                    { question: 'Half of 12 is?', answer: 6 }
                ]
            }
        ]
    },
    'visual-fractions': {
        steps: [
            {
                type: 'visual',
                title: 'Visual Fractions',
                content: 'We can see fractions as pictures!',
                visual: { type: 'fraction', whole: 8, parts: 3, object: '🍕' },
                explanation: 'Look at the picture: 3 out of 8 pieces are colored. That\'s 3/8 of the whole!'
            },
            {
                type: 'practice',
                title: 'Practice Visual Fractions',
                questions: [
                    { question: 'If 2 out of 4 pieces are colored, what fraction? (answer 2)', answer: 2 },
                    { question: 'If 1 out of 2 pieces are colored, what fraction? (answer 1)', answer: 1 },
                    { question: 'If 3 out of 6 pieces are colored, what fraction? (answer 3)', answer: 3 },
                    { question: 'If 2 out of 6 pieces are colored, what fraction? (answer 2)', answer: 2 },
                    { question: 'If 4 out of 8 pieces are colored, what fraction? (answer 4)', answer: 4 },
                    { question: 'If 1 out of 4 pieces are colored, what fraction? (answer 1)', answer: 1 },
                    { question: 'If 5 out of 10 pieces are colored, what fraction? (answer 5)', answer: 5 },
                    { question: 'If 3 out of 9 pieces are colored, what fraction? (answer 3)', answer: 3 },
                    { question: 'If 2 out of 8 pieces are colored, what fraction? (answer 2)', answer: 2 },
                    { question: 'If 4 out of 12 pieces are colored, what fraction? (answer 4)', answer: 4 }
                ]
            }
        ]
    },
    'simple-decimals': {
        steps: [
            {
                type: 'visual',
                title: 'Simple Decimals',
                content: 'Decimals are numbers with a dot (point)!',
                visual: { type: 'objects', count: 5, object: '🔵' },
                explanation: '0.5 means half. 1.5 means one and a half. The dot separates whole numbers from parts!'
            },
            {
                type: 'practice',
                title: 'Practice Decimals',
                questions: [
                    { question: 'What is 0.5 + 0.5?', answer: 1 },
                    { question: 'What is 1.0 + 0.5?', answer: 1.5 },
                    { question: 'What is 2.0 + 0.5?', answer: 2.5 },
                    { question: 'What is 0.5 + 0.5 + 0.5?', answer: 1.5 },
                    { question: 'What is 1.0 + 1.0?', answer: 2 },
                    { question: 'What is 0.5 + 1.0?', answer: 1.5 },
                    { question: 'What is 2.5 + 0.5?', answer: 3 },
                    { question: 'What is 1.5 + 1.5?', answer: 3 },
                    { question: 'What is 0.5 + 2.0?', answer: 2.5 },
                    { question: 'What is 3.0 + 0.5?', answer: 3.5 }
                ]
            }
        ]
    },
    'shapes-2d': {
        steps: [
            {
                type: 'visual',
                title: '2D Shapes (Flat Shapes)',
                content: '2D shapes are flat - like drawings on paper!',
                visual: { type: 'objects', count: 5, object: '⬜' },
                explanation: 'Circle ⭕, Square ⬜, Triangle 🔺, Rectangle ⬛ - these are all flat 2D shapes!'
            },
            {
                type: 'practice',
                title: 'Practice 2D Shapes',
                questions: [
                    { question: 'How many sides does a triangle have?', answer: 3 },
                    { question: 'How many sides does a square have?', answer: 4 },
                    { question: 'How many sides does a rectangle have?', answer: 4 },
                    { question: 'How many sides does a pentagon have?', answer: 5 },
                    { question: 'How many corners does a triangle have?', answer: 3 },
                    { question: 'How many corners does a square have?', answer: 4 },
                    { question: 'A circle has how many sides? (answer 0)', answer: 0 },
                    { question: 'How many sides does a hexagon have?', answer: 6 },
                    { question: 'How many corners does a rectangle have?', answer: 4 },
                    { question: 'How many sides does an octagon have?', answer: 8 }
                ]
            }
        ]
    },
    'shapes-3d': {
        steps: [
            {
                type: 'visual',
                title: '3D Shapes (Solid Shapes)',
                content: '3D shapes are solid - you can hold them!',
                visual: { type: 'objects', count: 4, object: '📦' },
                explanation: 'Cube 📦, Sphere ⚪, Cylinder, Cone - these are 3D shapes you can touch and hold!'
            },
            {
                type: 'practice',
                title: 'Practice 3D Shapes',
                questions: [
                    { question: 'A cube has how many faces?', answer: 6 },
                    { question: 'A sphere has how many faces? (answer 0)', answer: 0 },
                    { question: 'A cube has how many corners?', answer: 8 },
                    { question: 'A rectangular box has how many faces?', answer: 6 },
                    { question: 'A pyramid has how many faces? (triangular pyramid)', answer: 4 },
                    { question: 'A cube has how many edges?', answer: 12 },
                    { question: 'A sphere has how many corners? (answer 0)', answer: 0 },
                    { question: 'A cylinder has how many flat faces?', answer: 2 },
                    { question: 'A cone has how many flat faces?', answer: 1 },
                    { question: 'A rectangular box has how many corners?', answer: 8 }
                ]
            }
        ]
    },
    'area-perimeter': {
        steps: [
            {
                type: 'visual',
                title: 'Area and Perimeter',
                content: 'Area = how much space inside. Perimeter = distance around!',
                visual: { type: 'objects', count: 9, object: '⬜' },
                explanation: 'Area is like how many tiles fit inside. Perimeter is like how long the fence around it is!'
            },
            {
                type: 'practice',
                title: 'Practice Area and Perimeter',
                questions: [
                    { question: 'A square with side 2 has area? (2 × 2)', answer: 4 },
                    { question: 'A square with side 3 has area? (3 × 3)', answer: 9 },
                    { question: 'A square with side 4 has perimeter? (4 + 4 + 4 + 4)', answer: 16 },
                    { question: 'A rectangle 2 by 3 has area? (2 × 3)', answer: 6 },
                    { question: 'A rectangle 3 by 4 has area? (3 × 4)', answer: 12 },
                    { question: 'A square with side 5 has area? (5 × 5)', answer: 25 },
                    { question: 'A rectangle 2 by 5 has perimeter? (2+2+5+5)', answer: 14 },
                    { question: 'A square with side 6 has area? (6 × 6)', answer: 36 },
                    { question: 'A rectangle 4 by 5 has area? (4 × 5)', answer: 20 },
                    { question: 'A square with side 7 has perimeter? (7+7+7+7)', answer: 28 }
                ]
            }
        ]
    },
    'length': {
        steps: [
            {
                type: 'visual',
                title: 'Length',
                content: 'Length tells us how long something is!',
                visual: { type: 'objects', count: 5, object: '📏' },
                explanation: 'We measure length in units like: centimeters (cm), meters (m), inches, feet!'
            },
            {
                type: 'practice',
                title: 'Practice Length',
                questions: [
                    { question: 'Which is longer: 5 cm or 3 cm? (answer the bigger number)', answer: 5 },
                    { question: 'Which is shorter: 2 m or 4 m? (answer the smaller number)', answer: 2 },
                    { question: 'Which is longer: 10 cm or 7 cm? (answer the bigger number)', answer: 10 },
                    { question: 'Which is shorter: 6 m or 9 m? (answer the smaller number)', answer: 6 },
                    { question: 'Which is longer: 8 cm or 5 cm? (answer the bigger number)', answer: 8 },
                    { question: 'Which is shorter: 3 m or 7 m? (answer the smaller number)', answer: 3 },
                    { question: 'Which is longer: 12 cm or 9 cm? (answer the bigger number)', answer: 12 },
                    { question: 'Which is shorter: 4 m or 11 m? (answer the smaller number)', answer: 4 },
                    { question: 'Which is longer: 15 cm or 10 cm? (answer the bigger number)', answer: 15 },
                    { question: 'Which is shorter: 5 m or 8 m? (answer the smaller number)', answer: 5 }
                ]
            }
        ]
    },
    'weight': {
        steps: [
            {
                type: 'visual',
                title: 'Weight',
                content: 'Weight tells us how heavy something is!',
                visual: { type: 'objects', count: 3, object: '⚖️' },
                explanation: 'We measure weight in units like: grams (g), kilograms (kg), pounds, ounces!'
            },
            {
                type: 'practice',
                title: 'Practice Weight',
                questions: [
                    { question: 'Which is heavier: 5 kg or 3 kg? (answer the bigger number)', answer: 5 },
                    { question: 'Which is lighter: 2 kg or 4 kg? (answer the smaller number)', answer: 2 },
                    { question: 'Which is heavier: 10 kg or 7 kg? (answer the bigger number)', answer: 10 },
                    { question: 'Which is lighter: 6 kg or 9 kg? (answer the smaller number)', answer: 6 },
                    { question: 'Which is heavier: 8 kg or 5 kg? (answer the bigger number)', answer: 8 },
                    { question: 'Which is lighter: 3 kg or 7 kg? (answer the smaller number)', answer: 3 },
                    { question: 'Which is heavier: 12 kg or 9 kg? (answer the bigger number)', answer: 12 },
                    { question: 'Which is lighter: 4 kg or 11 kg? (answer the smaller number)', answer: 4 },
                    { question: 'Which is heavier: 15 kg or 10 kg? (answer the bigger number)', answer: 15 },
                    { question: 'Which is lighter: 5 kg or 8 kg? (answer the smaller number)', answer: 5 }
                ]
            }
        ]
    },
    'time': {
        steps: [
            {
                type: 'visual',
                title: 'Time',
                content: 'Time tells us when things happen!',
                visual: { type: 'objects', count: 12, object: '⏰' },
                explanation: 'We measure time in: seconds, minutes, hours, days! 60 seconds = 1 minute. 60 minutes = 1 hour.'
            },
            {
                type: 'practice',
                title: 'Practice Time',
                questions: [
                    { question: 'How many minutes in 1 hour?', answer: 60 },
                    { question: 'How many seconds in 1 minute?', answer: 60 },
                    { question: 'How many hours in 1 day?', answer: 24 },
                    { question: '30 minutes + 30 minutes = ? hours', answer: 1 },
                    { question: '15 minutes + 15 minutes = ? minutes', answer: 30 },
                    { question: 'How many minutes in 2 hours?', answer: 120 },
                    { question: '45 minutes + 15 minutes = ? hours', answer: 1 },
                    { question: 'How many seconds in 2 minutes?', answer: 120 },
                    { question: '20 minutes + 40 minutes = ? hours', answer: 1 },
                    { question: 'How many minutes in 3 hours?', answer: 180 }
                ]
            }
        ]
    },
    'simple-stories': {
        steps: [
            {
                type: 'example',
                title: 'Math in Stories',
                content: 'Sarah has 3 apples. She buys 2 more. How many apples does Sarah have now?',
                visual: { type: 'addition', a: 3, b: 2, object: '🍎' },
                answer: 5,
                explanation: 'Start with 3 apples, add 2 more: 3 + 2 = 5 apples!'
            },
            {
                type: 'practice',
                title: 'Solve the Stories',
                questions: [
                    { question: 'Tom has 4 toys. He gets 3 more. How many toys?', answer: 7 },
                    { question: 'Emma has 5 cookies. She eats 2. How many left?', answer: 3 },
                    { question: 'There are 6 birds. 4 more come. How many birds?', answer: 10 },
                    { question: 'You have 8 stickers. You give away 3. How many left?', answer: 5 },
                    { question: 'Mom has 7 flowers. She picks 2 more. How many flowers?', answer: 9 },
                    { question: 'There are 10 books. 4 are read. How many left?', answer: 6 },
                    { question: 'You have 5 coins. You find 4 more. How many coins?', answer: 9 },
                    { question: 'There are 9 cars. 3 leave. How many cars?', answer: 6 },
                    { question: 'You have 6 pencils. You get 4 more. How many pencils?', answer: 10 },
                    { question: 'There are 12 cookies. You eat 5. How many left?', answer: 7 }
                ]
            }
        ]
    },
    'find-numbers': {
        steps: [
            {
                type: 'example',
                title: 'Finding Important Numbers',
                content: 'Read the story: "Sarah has 5 apples. Tom has 3 apples. How many apples do they have together?" The important numbers are 5 and 3!',
                visual: { type: 'addition', a: 5, b: 3, object: '🍎' },
                answer: 8,
                explanation: 'Look for numbers in the story: 5 and 3. Then add them: 5 + 3 = 8!'
            },
            {
                type: 'practice',
                title: 'Find the Numbers',
                questions: [
                    { question: 'Story: "3 cats and 4 dogs". How many animals? (3+4)', answer: 7 },
                    { question: 'Story: "5 books and 2 more books". How many books? (5+2)', answer: 7 },
                    { question: 'Story: "8 cookies, eat 3". How many left? (8-3)', answer: 5 },
                    { question: 'Story: "6 birds and 3 more birds". How many birds? (6+3)', answer: 9 },
                    { question: 'Story: "10 toys, give away 4". How many left? (10-4)', answer: 6 },
                    { question: 'Story: "7 flowers and 2 more flowers". How many flowers? (7+2)', answer: 9 },
                    { question: 'Story: "9 stickers, use 5". How many left? (9-5)', answer: 4 },
                    { question: 'Story: "4 coins and 6 more coins". How many coins? (4+6)', answer: 10 },
                    { question: 'Story: "12 cookies, eat 7". How many left? (12-7)', answer: 5 },
                    { question: 'Story: "8 pencils and 3 more pencils". How many pencils? (8+3)', answer: 11 }
                ]
            }
        ]
    },
    'step-by-step': {
        steps: [
            {
                type: 'example',
                title: 'Step-by-Step Solving',
                content: 'Problem: "You have 5 apples. You eat 2. How many left?" Step 1: Start with 5. Step 2: Take away 2. Step 3: 5 - 2 = 3!',
                visual: { type: 'subtraction', total: 5, take: 2, object: '🍎' },
                answer: 3,
                explanation: 'Always solve problems step by step: 1) Find the numbers, 2) Decide what to do (add/subtract), 3) Calculate!'
            },
            {
                type: 'practice',
                title: 'Solve Step-by-Step',
                questions: [
                    { question: 'Step 1: You have 6. Step 2: Add 3. What is the answer?', answer: 9 },
                    { question: 'Step 1: You have 8. Step 2: Subtract 2. What is the answer?', answer: 6 },
                    { question: 'Step 1: You have 5. Step 2: Add 4. What is the answer?', answer: 9 },
                    { question: 'Step 1: You have 10. Step 2: Subtract 3. What is the answer?', answer: 7 },
                    { question: 'Step 1: You have 7. Step 2: Add 2. What is the answer?', answer: 9 },
                    { question: 'Step 1: You have 9. Step 2: Subtract 4. What is the answer?', answer: 5 },
                    { question: 'Step 1: You have 4. Step 2: Add 5. What is the answer?', answer: 9 },
                    { question: 'Step 1: You have 11. Step 2: Subtract 6. What is the answer?', answer: 5 },
                    { question: 'Step 1: You have 3. Step 2: Add 7. What is the answer?', answer: 10 },
                    { question: 'Step 1: You have 12. Step 2: Subtract 5. What is the answer?', answer: 7 }
                ]
            }
        ]
    }
};

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    applyFontSize();
    showSection('home');
});

function initializeApp() {
    // Load saved progress
    loadProgress();
    renderTopicsGrid();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            showSection(section);
        });
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Topic cards (event delegation because cards are generated dynamically)
    const topicsGrid = document.getElementById('topicsGrid');
    if (topicsGrid) {
        topicsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.topic-card');
            if (!card) return;
            const topic = card.dataset.topic;
            showLessons(topic);
        });
    }

    // Search
    const searchInput = document.getElementById('topicSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterTopics(e.target.value);
        });

        // Press Enter to open the first matching topic
        searchInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const firstVisible = Array.from(document.querySelectorAll('.topic-card'))
                .find(card => card.style.display !== 'none');
            if (firstVisible) {
                const topicId = firstVisible.dataset.topic;
                showLessons(topicId);
                searchInput.blur();
            }
        });
    }

    // Back buttons
    const backToTopics = document.getElementById('backToTopics');
    if (backToTopics) {
        backToTopics.addEventListener('click', () => {
            showSection('home');
        });
    }

    const backToLessons = document.getElementById('backToLessons');
    if (backToLessons) {
        backToLessons.addEventListener('click', () => {
            if (appState.currentTopic) {
                showLessons(appState.currentTopic);
            } else {
                showSection('home');
            }
        });
    }

    // Lesson navigation
    const nextStepBtn = document.getElementById('nextStepBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const completeLessonBtn = document.getElementById('completeLessonBtn');

    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            nextStep();
        });
    }

    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            previousStep();
        });
    }

    if (completeLessonBtn) {
        completeLessonBtn.addEventListener('click', () => {
            completeLesson();
        });
    }

    // Font size toggle
    const fontSizeBtn = document.getElementById('fontSizeBtn');
    if (fontSizeBtn) {
        fontSizeBtn.addEventListener('click', toggleFontSize);
    }
}

// ===== Section Management =====
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });

    // Load section data
    if (sectionId === 'progress') {
        loadProgressDisplay();
    }
}

// ===== Topics and Lessons =====
function showLessons(topicId) {
    appState.currentTopic = topicId;
    const topic = topics[topicId];
    
    if (!topic) return;

    const topicTitle = document.getElementById('topicTitle');
    if (topicTitle) {
        topicTitle.textContent = topic.title;
    }

    const lessonsGrid = document.getElementById('lessonsGrid');
    if (!lessonsGrid) return;

    lessonsGrid.innerHTML = '';

    // Topic-level practice (always 20 questions, tailored to the topic)
    const topicPracticeCard = document.createElement('div');
    topicPracticeCard.className = 'lesson-card';
    topicPracticeCard.innerHTML = `
        <div class="lesson-icon">🧠</div>
        <h3>Practice this Topic (20 Questions)</h3>
        <p>Quick practice mixed from this topic’s lessons</p>
    `;
    topicPracticeCard.addEventListener('click', () => startTopicPractice(topicId));
    lessonsGrid.appendChild(topicPracticeCard);

    topic.lessons.forEach((lesson, index) => {
        const lessonCard = document.createElement('div');
        const isCompleted = appState.completedLessons.includes(lesson.id);
        const isLocked = index > 0 && !appState.completedLessons.includes(topic.lessons[index - 1].id);

        lessonCard.className = `lesson-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
        
        if (!isLocked) {
            lessonCard.addEventListener('click', () => {
                startLesson(lesson.id);
            });
        }

        lessonCard.innerHTML = `
            <div class="lesson-icon">${lesson.icon}</div>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            ${isCompleted ? '<div style="margin-top: 10px; color: var(--success-color);">✓ Completed</div>' : ''}
            ${isLocked ? '<div style="margin-top: 10px; color: var(--text-secondary);">🔒 Locked</div>' : ''}
        `;

        lessonsGrid.appendChild(lessonCard);
    });

    showSection('lessons');
}

function startTopicPractice(topicId) {
    appState.currentLesson = `topic-practice:${topicId}`;
    appState.currentStep = 0;

    const topic = topics[topicId];
    const topicTitle = topic ? topic.title : 'Topic Practice';

    lessonContent[appState.currentLesson] = {
        steps: [
            {
                type: 'practice',
                title: `${topicTitle} — Practice (20 Questions)`,
                questions: generateTopicPracticeQuestions(topicId, 20)
            }
        ]
    };

    displayLessonStep();
    showSection('lesson');
}

function generateTopicPracticeQuestions(topicId, count = 20) {
    const topic = topics[topicId];
    const lessonIds = topic?.lessons?.map(l => l.id) || [];
    if (!lessonIds.length) return generatePracticeQuestions('adding-objects', count);

    const questions = [];
    const seen = new Set();

    // Build 20 by sampling from lesson-specific generators so the questions match the topic.
    while (questions.length < count) {
        const lessonId = pickOne(lessonIds);
        const q = generatePracticeQuestions(lessonId, 1)[0];
        if (!q) continue;

        const key = `${q.question}::${q.answer}`;
        if (seen.has(key)) continue;
        seen.add(key);
        questions.push(q);
    }

    return questions;
}

function startLesson(lessonId) {
    appState.currentLesson = lessonId;
    appState.currentStep = 0;

    if (!lessonContent[lessonId]) {
        // Generate default lesson content if not found
        generateDefaultLesson(lessonId);
    }

    // Every time a user starts learning a lesson, generate a fresh set of practice questions.
    // This keeps practice engaging and ensures there are always 20 questions per lesson.
    refreshLessonPracticeQuestions(lessonId, 20);

    displayLessonStep();
    showSection('lesson');
}

function refreshLessonPracticeQuestions(lessonId, count = 20) {
    const content = lessonContent[lessonId];
    if (!content || !Array.isArray(content.steps)) return;

    content.steps.forEach((step) => {
        if (step && step.type === 'practice') {
            step.questions = generatePracticeQuestions(lessonId, count);
        }
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function repeatEmoji(emoji, count) {
    return Array.from({ length: count }, () => emoji).join('');
}

function generatePracticeQuestions(lessonId, count = 20) {
    const questions = [];

    const push = (question, answer) => {
        questions.push({ question, answer });
    };

    // Common helpers
    const makeAddition = (maxA, maxB) => {
        const a = randomInt(0, maxA);
        const b = randomInt(0, maxB);
        push(`${a} + ${b} = ?`, a + b);
    };

    const makeSubtraction = (maxTotal) => {
        const total = randomInt(0, maxTotal);
        const take = randomInt(0, total);
        push(`${total} - ${take} = ?`, total - take);
    };

    const makeMultiplication = (maxA, maxB) => {
        const a = randomInt(0, maxA);
        const b = randomInt(0, maxB);
        push(`${a} × ${b} = ?`, a * b);
    };

    const makeDivision = (maxGroups, maxPerGroup) => {
        const groups = randomInt(2, maxGroups);
        const perGroup = randomInt(1, maxPerGroup);
        const total = groups * perGroup;
        push(`${total} ÷ ${groups} = ? (share ${total} things between ${groups} people)`, perGroup);
    };

    while (questions.length < count) {
        switch (lessonId) {
            // Math Basics
            case 'what-are-numbers':
            case 'counting': {
                const emojis = ['⭐', '❤️', '🔵', '🍎', '🌸', '🎈', '🍪', '🪙', '🧸', '🟦'];
                const n = randomInt(1, 10);
                const emoji = pickOne(emojis);
                push(`Count them: ${repeatEmoji(emoji, n)}`, n);
                break;
            }
            case 'comparing': {
                const a = randomInt(0, 20);
                let b = randomInt(0, 20);
                while (b === a) b = randomInt(0, 20);
                const askMore = Math.random() < 0.5;
                if (askMore) {
                    push(`Which is more: ${a} or ${b}? (answer the bigger number)`, Math.max(a, b));
                } else {
                    push(`Which is less: ${a} or ${b}? (answer the smaller number)`, Math.min(a, b));
                }
                break;
            }

            // Numbers
            case 'whole-numbers': {
                const mode = pickOne(['after', 'before', 'between']);
                if (mode === 'after') {
                    const n = randomInt(0, 19);
                    push(`What comes after ${n}?`, n + 1);
                } else if (mode === 'before') {
                    const n = randomInt(1, 20);
                    push(`What comes before ${n}?`, n - 1);
                } else {
                    const n = randomInt(1, 19);
                    push(`What number is between ${n} and ${n + 2}?`, n + 1);
                }
                break;
            }
            case 'number-line': {
                const mode = pickOne(['after', 'before', 'bigger', 'smaller', 'between']);
                if (mode === 'after') {
                    const n = randomInt(0, 19);
                    push(`On a number line, which number comes after ${n}?`, n + 1);
                } else if (mode === 'before') {
                    const n = randomInt(1, 20);
                    push(`On a number line, which number comes before ${n}?`, n - 1);
                } else if (mode === 'bigger') {
                    const a = randomInt(0, 20);
                    let b = randomInt(0, 20);
                    while (b === a) b = randomInt(0, 20);
                    push(`Which number is bigger on a number line: ${a} or ${b}?`, Math.max(a, b));
                } else if (mode === 'smaller') {
                    const a = randomInt(0, 20);
                    let b = randomInt(0, 20);
                    while (b === a) b = randomInt(0, 20);
                    push(`Which number is smaller on a number line: ${a} or ${b}?`, Math.min(a, b));
                } else {
                    const n = randomInt(1, 19);
                    push(`Which number is between ${n} and ${n + 2} on the number line?`, n + 1);
                }
                break;
            }

            // Addition & Subtraction
            case 'adding-objects': {
                makeAddition(10, 10);
                break;
            }
            case 'addition-facts': {
                makeAddition(20, 20);
                break;
            }
            case 'taking-away': {
                makeSubtraction(20);
                break;
            }
            case 'subtraction-facts': {
                makeSubtraction(30);
                break;
            }
            case 'real-life-add': {
                const items = [
                    { item: 'apples', emoji: '🍎' },
                    { item: 'cookies', emoji: '🍪' },
                    { item: 'coins', emoji: '🪙' },
                    { item: 'toys', emoji: '🧸' },
                    { item: 'stickers', emoji: '⭐' },
                    { item: 'flowers', emoji: '🌸' },
                ];
                const { item, emoji } = pickOne(items);
                const a = randomInt(0, 10);
                const b = randomInt(0, 10);
                push(`You have ${a} ${item} ${repeatEmoji(emoji, Math.min(a, 10))}. You get ${b} more. How many ${item} now?`, a + b);
                break;
            }
            case 'real-life-subtract': {
                const items = [
                    { item: 'apples', emoji: '🍎' },
                    { item: 'cookies', emoji: '🍪' },
                    { item: 'coins', emoji: '🪙' },
                    { item: 'toys', emoji: '🧸' },
                    { item: 'stickers', emoji: '⭐' },
                    { item: 'flowers', emoji: '🌸' },
                ];
                const { item, emoji } = pickOne(items);
                const total = randomInt(0, 15);
                const take = randomInt(0, total);
                push(`You have ${total} ${item} ${repeatEmoji(emoji, Math.min(total, 10))}. You use ${take}. How many ${item} left?`, total - take);
                break;
            }

            // Multiplication & Division
            case 'repeated-addition': {
                makeMultiplication(6, 6);
                break;
            }
            case 'times-tables': {
                makeMultiplication(10, 10);
                break;
            }
            case 'sharing': {
                makeDivision(6, 6);
                break;
            }
            case 'division-facts': {
                makeDivision(10, 10);
                break;
            }
            case 'real-life-division': {
                const total = randomInt(2, 10) * 2;
                const groups = pickOne([2, 3, 4, 5]);
                const t = groups * randomInt(1, 6);
                push(`You have ${t} cookies. Share them equally between ${groups} people. How many each?`, t / groups);
                break;
            }
            case 'even-odd': {
                const n = randomInt(0, 30);
                push(`Is ${n} even or odd? (answer 1 for even, 0 for odd)`, n % 2 === 0 ? 1 : 0);
                break;
            }
            case 'grouping': {
                const groups = randomInt(2, 6);
                const perGroup = randomInt(1, 6);
                push(`${groups} groups of ${perGroup} = ?`, groups * perGroup);
                break;
            }

            // Fractions & Decimals (numeric-only answers because the input is a number field)
            case 'parts-whole': {
                const mode = pickOne(['half', 'third', 'quarter']);
                if (mode === 'half') {
                    const n = randomInt(2, 30) * 2;
                    push(`Half of ${n} is?`, n / 2);
                } else if (mode === 'third') {
                    const n = randomInt(2, 20) * 3;
                    push(`One third of ${n} is?`, n / 3);
                } else {
                    const n = randomInt(2, 15) * 4;
                    push(`One quarter of ${n} is?`, n / 4);
                }
                break;
            }
            case 'fraction-of-number': {
                const mode = pickOne(['half', 'third', 'quarter']);
                if (mode === 'half') {
                    const n = randomInt(2, 40) * 2;
                    push(`Half of ${n} is?`, n / 2);
                } else if (mode === 'third') {
                    const n = randomInt(2, 30) * 3;
                    push(`One third of ${n} is?`, n / 3);
                } else {
                    const n = randomInt(2, 20) * 4;
                    push(`One quarter of ${n} is?`, n / 4);
                }
                break;
            }
            case 'visual-fractions': {
                const denom = pickOne([2, 3, 4, 5, 6, 8, 10, 12]);
                const num = randomInt(1, denom - 1);
                push(`If ${num} out of ${denom} pieces are colored, how many pieces are colored?`, num);
                break;
            }
            case 'simple-decimals': {
                // Use halves to keep beginner-friendly decimals.
                const pool = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
                const a = pickOne(pool);
                const b = pickOne(pool);
                const sum = a + b;
                push(`What is ${a} + ${b}?`, sum);
                break;
            }
            case 'decimal-add': {
                const pool = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
                const a = pickOne(pool);
                const b = pickOne(pool);
                push(`Add: ${a} + ${b} = ?`, a + b);
                break;
            }
            case 'money-decimals': {
                const pool = [0.5, 1.0, 1.5, 2.0, 2.5];
                const a = pickOne(pool);
                const b = pickOne(pool);
                push(`Price A: ${a.toFixed(2)} + Price B: ${b.toFixed(2)} = ?`, a + b);
                break;
            }

            // Place value
            case 'tens-ones': {
                const tens = randomInt(1, 9);
                const ones = randomInt(0, 9);
                const mode = pickOne(['compose', 'tens', 'ones']);
                if (mode === 'compose') push(`${tens} tens and ${ones} ones makes what number?`, tens * 10 + ones);
                else if (mode === 'tens') push(`In ${tens * 10 + ones}, how many tens?`, tens);
                else push(`In ${tens * 10 + ones}, how many ones?`, ones);
                break;
            }
            case 'hundreds': {
                const hundreds = randomInt(1, 9);
                const tens = randomInt(0, 9);
                const ones = randomInt(0, 9);
                const n = hundreds * 100 + tens * 10 + ones;
                const mode = pickOne(['hundreds', 'tens', 'ones']);
                if (mode === 'hundreds') push(`In ${n}, how many hundreds?`, hundreds);
                else if (mode === 'tens') push(`In ${n}, how many tens?`, tens);
                else push(`In ${n}, how many ones?`, ones);
                break;
            }
            case 'make-number': {
                const tens = randomInt(0, 9);
                const ones = randomInt(0, 9);
                push(`Make the number: ${tens} tens and ${ones} ones`, tens * 10 + ones);
                break;
            }

            // Patterns
            case 'patterns-next': {
                const step = pickOne([1, 2, 5, 10]);
                const start = randomInt(0, 20);
                push(`Pattern: ${start}, ${start + step}, ${start + 2 * step}, __. What comes next?`, start + 3 * step);
                break;
            }
            case 'skip-counting': {
                const step = pickOne([2, 5, 10]);
                const k = randomInt(0, 10);
                push(`Skip count by ${step}: ${k * step}, ${(k + 1) * step}, __. What comes next?`, (k + 2) * step);
                break;
            }
            case 'growing-patterns': {
                const step = pickOne([2, 3, 4]);
                const start = randomInt(1, 10);
                push(`Growing pattern: ${start}, ${start + step}, ${start + 2 * step}, __. Next?`, start + 3 * step);
                break;
            }

            // Measurements / money add-ons
            case 'estimate-length': {
                // Still numeric-only: simple compare/estimate prompts
                const a = randomInt(1, 30);
                let b = randomInt(1, 30);
                while (b === a) b = randomInt(1, 30);
                push(`Which is longer (guess): ${a} cm or ${b} cm? (answer the bigger number)`, Math.max(a, b));
                break;
            }
            case 'ruler-basics': {
                const a = randomInt(1, 20);
                push(`If a pencil is ${a} cm long, what number do you read on the ruler?`, a);
                break;
            }
            case 'estimate-weight': {
                const a = randomInt(1, 30);
                let b = randomInt(1, 30);
                while (b === a) b = randomInt(1, 30);
                push(`Which is heavier (guess): ${a} kg or ${b} kg? (answer the bigger number)`, Math.max(a, b));
                break;
            }
            case 'grams-kilos': {
                const a = randomInt(1, 20);
                let b = randomInt(1, 20);
                while (b === a) b = randomInt(1, 20);
                push(`Which is heavier: ${a} kg or ${b} kg? (answer the bigger number)`, Math.max(a, b));
                break;
            }
            case 'clock-reading': {
                const hour = randomInt(1, 12);
                // numeric-only: answer hour
                push(`If the clock shows ${hour}:00, what is the hour number?`, hour);
                break;
            }
            case 'time-add': {
                const a = randomInt(1, 5) * 10;
                const b = randomInt(1, 5) * 10;
                push(`${a} minutes + ${b} minutes = ? minutes`, a + b);
                break;
            }
            case 'coins': {
                const a = randomInt(1, 5);
                const b = randomInt(1, 5);
                push(`You have ${a} coins and get ${b} more. How many coins total?`, a + b);
                break;
            }
            case 'simple-prices': {
                const a = pickOne([1, 2, 3, 4, 5]);
                const b = pickOne([1, 2, 3, 4, 5]);
                push(`Price ${a} + price ${b} = ?`, a + b);
                break;
            }
            case 'change': {
                const total = pickOne([5, 10, 20]);
                const cost = randomInt(1, total);
                push(`You have ${total}. You spend ${cost}. How much change?`, total - cost);
                break;
            }

            // Geometry
            case 'shapes-2d': {
                const shapes = [
                    { name: 'triangle', sides: 3, corners: 3 },
                    { name: 'square', sides: 4, corners: 4 },
                    { name: 'rectangle', sides: 4, corners: 4 },
                    { name: 'pentagon', sides: 5, corners: 5 },
                    { name: 'hexagon', sides: 6, corners: 6 },
                    { name: 'octagon', sides: 8, corners: 8 },
                    { name: 'circle', sides: 0, corners: 0 },
                ];
                const s = pickOne(shapes);
                const askSides = Math.random() < 0.5;
                if (askSides) push(`How many sides does a ${s.name} have?`, s.sides);
                else push(`How many corners does a ${s.name} have?`, s.corners);
                break;
            }
            case 'shapes-3d': {
                const shapes3d = [
                    { name: 'cube', faces: 6, edges: 12, corners: 8 },
                    { name: 'rectangular box', faces: 6, edges: 12, corners: 8 },
                    { name: 'sphere', faces: 0, edges: 0, corners: 0 },
                    { name: 'triangular pyramid', faces: 4, edges: 6, corners: 4 },
                    { name: 'cylinder', flatFaces: 2, corners: 0 },
                    { name: 'cone', flatFaces: 1, corners: 1 },
                ];
                const s = pickOne(shapes3d);
                const ask = pickOne(['faces', 'edges', 'corners', 'flatFaces']);
                if (ask === 'faces' && s.faces !== undefined) push(`A ${s.name} has how many faces?`, s.faces);
                else if (ask === 'edges' && s.edges !== undefined) push(`A ${s.name} has how many edges?`, s.edges);
                else if (ask === 'corners' && s.corners !== undefined) push(`A ${s.name} has how many corners?`, s.corners);
                else if (ask === 'flatFaces' && s.flatFaces !== undefined) push(`A ${s.name} has how many flat faces?`, s.flatFaces);
                else push(`A cube has how many faces?`, 6);
                break;
            }
            case 'area-perimeter': {
                const isSquare = Math.random() < 0.5;
                const askArea = Math.random() < 0.6;
                if (isSquare) {
                    const s = randomInt(1, 10);
                    if (askArea) push(`A square with side ${s} has area? (${s} × ${s})`, s * s);
                    else push(`A square with side ${s} has perimeter? (${s}+${s}+${s}+${s})`, 4 * s);
                } else {
                    const w = randomInt(1, 10);
                    const h = randomInt(1, 10);
                    if (askArea) push(`A rectangle ${w} by ${h} has area? (${w} × ${h})`, w * h);
                    else push(`A rectangle ${w} by ${h} has perimeter? (2×(${w}+${h}))`, 2 * (w + h));
                }
                break;
            }

            // Measurements
            case 'length': {
                const a = randomInt(1, 30);
                let b = randomInt(1, 30);
                while (b === a) b = randomInt(1, 30);
                const askLonger = Math.random() < 0.5;
                if (askLonger) push(`Which is longer: ${a} cm or ${b} cm? (answer the bigger number)`, Math.max(a, b));
                else push(`Which is shorter: ${a} m or ${b} m? (answer the smaller number)`, Math.min(a, b));
                break;
            }
            case 'weight': {
                const a = randomInt(1, 30);
                let b = randomInt(1, 30);
                while (b === a) b = randomInt(1, 30);
                const askHeavier = Math.random() < 0.5;
                if (askHeavier) push(`Which is heavier: ${a} kg or ${b} kg? (answer the bigger number)`, Math.max(a, b));
                else push(`Which is lighter: ${a} kg or ${b} kg? (answer the smaller number)`, Math.min(a, b));
                break;
            }
            case 'time': {
                const mode = pickOne(['minInHour', 'secInMin', 'hoursInDay', 'minutesInHours', 'addMinutes']);
                if (mode === 'minInHour') push('How many minutes in 1 hour?', 60);
                else if (mode === 'secInMin') push('How many seconds in 1 minute?', 60);
                else if (mode === 'hoursInDay') push('How many hours in 1 day?', 24);
                else if (mode === 'minutesInHours') {
                    const h = randomInt(2, 6);
                    push(`How many minutes in ${h} hours?`, h * 60);
                } else {
                    const a = randomInt(1, 5) * 10;
                    const b = randomInt(1, 5) * 10;
                    push(`${a} minutes + ${b} minutes = ? minutes`, a + b);
                }
                break;
            }

            // Word Problems
            case 'simple-stories':
            case 'find-numbers':
            case 'step-by-step': {
                const isAdd = Math.random() < 0.5;
                const a = randomInt(0, 20);
                const b = randomInt(0, 20);
                if (isAdd) {
                    push(`Story: "You have ${a} things and get ${b} more." What is ${a}+${b}?`, a + b);
                } else {
                    const total = randomInt(0, 20);
                    const take = randomInt(0, total);
                    push(`Story: "You have ${total} things and give away ${take}." What is ${total}-${take}?`, total - take);
                }
                break;
            }

            default: {
                // Safe fallback: simple addition/subtraction
                if (Math.random() < 0.5) makeAddition(10, 10);
                else makeSubtraction(20);
                break;
            }
        }
    }

    return questions.slice(0, count);
}

function displayLessonStep() {
    const lessonId = appState.currentLesson;
    const content = lessonContent[lessonId];
    if (!content) return;

    const step = content.steps[appState.currentStep];
    if (!step) return;

    // Safety: ensure practice always has exactly 20 questions.
    // (Also protects older saved content or any future lesson edits.)
    if (step.type === 'practice') {
        if (!Array.isArray(step.questions) || step.questions.length !== 20) {
            if (lessonId && lessonId.startsWith('topic-practice:')) {
                const topicId = lessonId.split(':')[1];
                step.questions = generateTopicPracticeQuestions(topicId, 20);
            } else {
                step.questions = generatePracticeQuestions(lessonId, 20);
            }
        }
    }

    const lessonContentDiv = document.getElementById('lessonContent');
    const progressFill = document.getElementById('lessonProgressFill');
    const progressText = document.getElementById('lessonProgressText');
    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');
    const completeBtn = document.getElementById('completeLessonBtn');

    // Update progress
    const totalSteps = content.steps.length;
    const progress = ((appState.currentStep + 1) / totalSteps) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `Step ${appState.currentStep + 1} of ${totalSteps}`;

    // Show/hide navigation buttons
    if (prevBtn) prevBtn.style.display = appState.currentStep > 0 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = appState.currentStep < totalSteps - 1 ? 'block' : 'none';
    if (completeBtn) completeBtn.style.display = appState.currentStep === totalSteps - 1 ? 'block' : 'none';

    // Generate content based on step type
    if (lessonContentDiv) {
        lessonContentDiv.innerHTML = generateStepContent(step);
    }
}

function generateStepContent(step) {
    let html = `<h2 style="margin-bottom: 20px;">${step.title}</h2>`;

    if (step.type === 'visual') {
        html += `<p class="explanation-text">${step.content}</p>`;
        html += generateVisual(step.visual);
        if (step.explanation) {
            html += `<div class="explanation-text" style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">${step.explanation}</div>`;
        }
    } else if (step.type === 'example') {
        html += `<div class="guided-example">`;
        html += `<p style="font-size: 1.2rem; margin-bottom: 15px;">${step.content}</p>`;
        html += generateVisual(step.visual);
        if (step.answer !== undefined) {
            html += `<p style="margin-top: 15px; font-weight: bold; font-size: 1.3rem;">Answer: ${step.answer}</p>`;
        }
        if (step.explanation) {
            html += `<p style="margin-top: 10px;">${step.explanation}</p>`;
        }
        html += `</div>`;
    } else if (step.type === 'practice') {
        html += `<div class="practice-section">`;
        html += `<h3 style="margin-bottom: 20px;">${step.title}</h3>`;
        html += `<div style="margin-bottom: 14px; color: var(--text-secondary); font-weight: 600;">Questions: ${Array.isArray(step.questions) ? step.questions.length : 0}</div>`;
        step.questions.forEach((q, index) => {
            html += `<div class="practice-question" data-answer="${q.answer}">`;
            html += `<p style="font-size: 1.2rem; margin-bottom: 10px;">${q.question}</p>`;
            html += `<input type="number" step="any" class="practice-input" data-question="${index}" placeholder="Your answer">`;
            html += `<div class="feedback" id="feedback-${index}" style="display: none;"></div>`;
            html += `</div>`;
        });
        html += `</div>`;
        
        // Add event listeners for practice inputs
        setTimeout(() => {
            document.querySelectorAll('.practice-input').forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        checkPracticeAnswer(input);
                    }
                });
                input.addEventListener('blur', () => {
                    checkPracticeAnswer(input);
                });
            });
        }, 100);
    }

    return html;
}

function generateVisual(visual) {
    if (!visual) return '';

    let html = '<div class="visual-container">';

    if (visual.type === 'objects') {
        for (let i = 0; i < visual.count; i++) {
            html += `<div class="math-object">${visual.object}</div>`;
        }
    } else if (visual.type === 'addition') {
        // Show first group
        for (let i = 0; i < visual.a; i++) {
            html += `<div class="math-object">${visual.object}</div>`;
        }
        html += '<div style="width: 100%; text-align: center; font-size: 2rem; margin: 10px 0;">+</div>';
        // Show second group
        for (let i = 0; i < visual.b; i++) {
            html += `<div class="math-object">${visual.object}</div>`;
        }
        html += '<div style="width: 100%; text-align: center; font-size: 2rem; margin: 10px 0;">=</div>';
        // Show result
        for (let i = 0; i < (visual.a + visual.b); i++) {
            html += `<div class="math-object">${visual.object}</div>`;
        }
    } else if (visual.type === 'subtraction') {
        // Show total
        for (let i = 0; i < visual.total; i++) {
            html += `<div class="math-object">${visual.object}</div>`;
        }
        html += '<div style="width: 100%; text-align: center; font-size: 2rem; margin: 10px 0;">-</div>';
        html += `<div style="width: 100%; text-align: center; margin: 10px 0;">Take away ${visual.take}</div>`;
        html += '<div style="width: 100%; text-align: center; font-size: 2rem; margin: 10px 0;">=</div>';
        // Show result
        for (let i = 0; i < (visual.total - visual.take); i++) {
            html += `<div class="math-object">${visual.object}</div>`;
        }
    } else if (visual.type === 'multiplication') {
        // Show groups
        for (let g = 0; g < visual.groups; g++) {
            html += '<div style="display: flex; gap: 10px; margin-bottom: 10px; justify-content: center;">';
            for (let i = 0; i < visual.perGroup; i++) {
                html += `<div class="math-object">${visual.object}</div>`;
            }
            html += '</div>';
        }
        html += `<div style="width: 100%; text-align: center; font-size: 1.5rem; margin: 10px 0;">${visual.groups} groups × ${visual.perGroup} = ${visual.groups * visual.perGroup}</div>`;
    } else if (visual.type === 'division') {
        // Show total
        html += '<div style="margin-bottom: 15px;">Total: ';
        for (let i = 0; i < visual.total; i++) {
            html += `<span style="font-size: 2rem;">${visual.object}</span>`;
        }
        html += '</div>';
        html += `<div style="width: 100%; text-align: center; font-size: 1.5rem; margin: 10px 0;">Share ${visual.total} between ${visual.groups} people</div>`;
        html += '<div style="width: 100%; text-align: center; font-size: 1.5rem; margin: 10px 0;">=</div>';
        const perPerson = Math.floor(visual.total / visual.groups);
        html += `<div style="width: 100%; text-align: center; font-size: 1.5rem; margin: 10px 0;">Each person gets ${perPerson}</div>`;
    } else if (visual.type === 'numberline') {
        html += '<div style="width: 100%; padding: 20px; background: white; border-radius: 8px; margin: 20px 0;">';
        html += '<div style="display: flex; justify-content: space-between; align-items: center; position: relative;">';
        for (let i = visual.start; i <= visual.end; i++) {
            html += `<div style="text-align: center; flex: 1;"><div style="width: 20px; height: 20px; background: var(--primary-color); border-radius: 50%; margin: 0 auto 5px;"></div><div style="font-size: 1.2rem; font-weight: bold;">${i}</div></div>`;
        }
        html += '</div>';
        html += '</div>';
    }

    html += '</div>';
    return html;
}

function checkPracticeAnswer(input) {
    const questionDiv = input.closest('.practice-question');
    const correctAnswer = parseFloat(questionDiv.dataset.answer);
    const userAnswer = parseFloat(input.value);
    const feedbackDiv = questionDiv.querySelector('.feedback');

    if (!Number.isFinite(userAnswer)) return;

    const isCorrect = Number.isFinite(correctAnswer)
        ? Math.abs(userAnswer - correctAnswer) < 1e-9
        : false;

    if (isCorrect) {
        feedbackDiv.textContent = '✓ Correct! Great job!';
        feedbackDiv.className = 'feedback correct';
        feedbackDiv.style.display = 'block';
        input.style.borderColor = 'var(--success-color)';
    } else {
        feedbackDiv.textContent = `Not quite. Try again! The answer is ${correctAnswer}.`;
        feedbackDiv.className = 'feedback incorrect';
        feedbackDiv.style.display = 'block';
        input.style.borderColor = 'var(--danger-color)';
    }
}

function nextStep() {
    const lessonId = appState.currentLesson;
    const content = lessonContent[lessonId];
    if (!content) return;

    if (appState.currentStep < content.steps.length - 1) {
        appState.currentStep++;
        displayLessonStep();
    }
}

function previousStep() {
    if (appState.currentStep > 0) {
        appState.currentStep--;
        displayLessonStep();
    }
}

function completeLesson() {
    const lessonId = appState.currentLesson;
    if (lessonId && lessonId.startsWith('topic-practice:')) {
        alert('✅ Practice complete! Great job!');
        if (appState.currentTopic) showLessons(appState.currentTopic);
        else showSection('home');
        return;
    }

    if (!appState.completedLessons.includes(lessonId)) {
        appState.completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(appState.completedLessons));
    }

    alert('🎉 Lesson completed! Great job!');
    
    if (appState.currentTopic) {
        showLessons(appState.currentTopic);
    } else {
        showSection('home');
    }
}

function generateDefaultLesson(lessonId) {
    const meta = getLessonMeta(lessonId);

    // Generate a beginner-friendly default lesson if content doesn't exist
    lessonContent[lessonId] = {
        steps: [
            {
                type: 'visual',
                title: meta.title,
                content: meta.content,
                visual: meta.visual,
                explanation: meta.explanation
            },
            ...(meta.example ? [{
                type: 'example',
                title: meta.example.title,
                content: meta.example.content,
                visual: meta.example.visual,
                answer: meta.example.answer,
                explanation: meta.example.explanation
            }] : []),
            {
                type: 'practice',
                title: 'Practice (20 Questions)',
                questions: generatePracticeQuestions(lessonId, 20)
            }
        ]
    };
    displayLessonStep();
    showSection('lesson');
}

function getLessonMeta(lessonId) {
    const fallback = {
        title: 'Practice',
        content: 'Let’s practice step by step.',
        visual: { type: 'objects', count: 5, object: '🔵' },
        explanation: 'Try a few questions. It’s okay to make mistakes.',
        example: null
    };

    const map = {
        'addition-facts': {
            title: 'Addition Facts',
            content: 'Addition means putting together.',
            visual: { type: 'addition', a: 2, b: 3, object: '🍎' },
            explanation: 'Count all objects to find the total.',
            example: {
                title: 'Example',
                content: 'You have 4 apples. You get 1 more. How many apples now?',
                visual: { type: 'addition', a: 4, b: 1, object: '🍎' },
                answer: 5,
                explanation: '4 + 1 = 5'
            }
        },
        'subtraction-facts': {
            title: 'Subtraction Facts',
            content: 'Subtraction means taking away.',
            visual: { type: 'subtraction', total: 5, take: 2, object: '🍪' },
            explanation: 'Start with the total, then remove some.',
            example: {
                title: 'Example',
                content: 'You have 6 cookies. You eat 2. How many left?',
                visual: { type: 'subtraction', total: 6, take: 2, object: '🍪' },
                answer: 4,
                explanation: '6 - 2 = 4'
            }
        },
        'times-tables': {
            title: 'Times Tables (Beginner)',
            content: 'Multiplication is groups of the same size.',
            visual: { type: 'multiplication', groups: 3, perGroup: 2, object: '🍎' },
            explanation: '3 groups of 2 means 2 + 2 + 2.',
            example: {
                title: 'Example',
                content: '2 groups of 4. How many total?',
                visual: { type: 'multiplication', groups: 2, perGroup: 4, object: '🍎' },
                answer: 8,
                explanation: '4 + 4 = 8, so 2 × 4 = 8'
            }
        },
        'division-facts': {
            title: 'Division Facts',
            content: 'Division is sharing equally.',
            visual: { type: 'division', total: 8, groups: 2, object: '🍎' },
            explanation: 'If we share 8 apples between 2 people, each gets 4.',
            example: {
                title: 'Example',
                content: 'Share 12 cookies between 3 friends. How many each?',
                visual: { type: 'division', total: 12, groups: 3, object: '🍪' },
                answer: 4,
                explanation: '12 ÷ 3 = 4'
            }
        },
        'fraction-of-number': {
            title: 'Fraction of a Number',
            content: 'Fractions can mean “part of a number”.',
            visual: { type: 'fraction', whole: 8, parts: 4, object: '🍕' },
            explanation: 'Half of a number means split into 2 equal parts.',
            example: {
                title: 'Example',
                content: 'Half of 10 is?',
                visual: { type: 'objects', count: 10, object: '🔵' },
                answer: 5,
                explanation: '10 split into 2 equal groups is 5 and 5.'
            }
        },
        'decimal-add': {
            title: 'Adding Decimals',
            content: 'Decimals are numbers with a dot (point).',
            visual: { type: 'objects', count: 5, object: '🔵' },
            explanation: 'We’ll practice easy decimals like 0.5 and 1.0.',
            example: {
                title: 'Example',
                content: '0.5 + 0.5 = ?',
                visual: { type: 'objects', count: 2, object: '½' },
                answer: 1,
                explanation: 'Two halves make one whole.'
            }
        },
        'money-decimals': {
            title: 'Money as Decimals',
            content: 'Money often uses decimals, like 1.50.',
            visual: { type: 'objects', count: 3, object: '🪙' },
            explanation: 'We’ll add simple prices.',
            example: {
                title: 'Example',
                content: '1.00 + 0.50 = ?',
                visual: { type: 'objects', count: 2, object: '💰' },
                answer: 1.5,
                explanation: 'One dollar and fifty cents is 1.50.'
            }
        },
        'tens-ones': {
            title: 'Ones and Tens',
            content: 'Numbers are made of ones and tens.',
            visual: { type: 'objects', count: 10, object: '🧱' },
            explanation: '14 means 1 ten and 4 ones.',
            example: {
                title: 'Example',
                content: 'In 23, how many tens? (answer with the number of tens)',
                visual: { type: 'objects', count: 2, object: '🔟' },
                answer: 2,
                explanation: '23 has 2 tens and 3 ones.'
            }
        },
        'hundreds': {
            title: 'Hundreds',
            content: 'Hundreds are bigger than tens.',
            visual: { type: 'objects', count: 3, object: '💯' },
            explanation: '100 is one hundred.',
            example: {
                title: 'Example',
                content: 'How many hundreds are in 300? (answer with the number of hundreds)',
                visual: { type: 'objects', count: 3, object: '💯' },
                answer: 3,
                explanation: '300 has 3 hundreds.'
            }
        },
        'make-number': {
            title: 'Make a Number',
            content: 'We can build numbers from tens and ones.',
            visual: { type: 'objects', count: 1, object: '🔟' },
            explanation: 'Example: 2 tens and 5 ones makes 25.',
            example: {
                title: 'Example',
                content: '3 tens and 2 ones makes what number?',
                visual: { type: 'objects', count: 3, object: '🔟' },
                answer: 32,
                explanation: '30 + 2 = 32'
            }
        },
        'patterns-next': {
            title: 'What Comes Next?',
            content: 'Patterns repeat or grow.',
            visual: { type: 'objects', count: 4, object: '🔵' },
            explanation: 'We look for what changes each time.',
            example: {
                title: 'Example',
                content: 'Pattern: 2, 4, 6, __. What comes next?',
                visual: { type: 'objects', count: 3, object: '➕2' },
                answer: 8,
                explanation: 'We add 2 each time.'
            }
        },
        'skip-counting': {
            title: 'Skip Counting',
            content: 'Skip counting means counting by the same number.',
            visual: { type: 'numberline', start: 0, end: 10 },
            explanation: 'We can count by 2s, 5s, or 10s.',
            example: {
                title: 'Example',
                content: 'Count by 5s: 0, 5, 10, __. What comes next?',
                visual: { type: 'objects', count: 3, object: '5️⃣' },
                answer: 15,
                explanation: 'Add 5 each time.'
            }
        },
        'growing-patterns': {
            title: 'Growing Patterns',
            content: 'Some patterns get bigger each step.',
            visual: { type: 'objects', count: 3, object: '🌱' },
            explanation: 'We look at how much it grows.',
            example: {
                title: 'Example',
                content: 'Pattern: 1, 3, 5, __. What comes next?',
                visual: { type: 'objects', count: 3, object: '➕2' },
                answer: 7,
                explanation: 'Add 2 each time.'
            }
        },
        'estimate-length': {
            title: 'Estimate Length',
            content: 'Estimating means making a smart guess.',
            visual: { type: 'objects', count: 1, object: '📏' },
            explanation: 'We guess, then we can check later.',
            example: null
        },
        'ruler-basics': {
            title: 'Using a Ruler',
            content: 'A ruler helps measure length.',
            visual: { type: 'objects', count: 1, object: '📏' },
            explanation: 'We’ll practice simple measuring questions.',
            example: null
        },
        'estimate-weight': {
            title: 'Estimate Weight',
            content: 'Estimating weight means guessing heavy or light.',
            visual: { type: 'objects', count: 1, object: '⚖️' },
            explanation: 'We guess, then we can check later.',
            example: null
        },
        'grams-kilos': {
            title: 'Grams and Kilograms',
            content: 'Grams (g) are small. Kilograms (kg) are bigger.',
            visual: { type: 'objects', count: 2, object: '⚖️' },
            explanation: 'We’ll use simple comparisons.',
            example: null
        },
        'clock-reading': {
            title: 'Reading a Clock',
            content: 'Clocks show time.',
            visual: { type: 'objects', count: 1, object: '🕒' },
            explanation: 'We’ll practice simple hour and half-hour questions.',
            example: null
        },
        'time-add': {
            title: 'Adding Time',
            content: 'We can add minutes together.',
            visual: { type: 'objects', count: 1, object: '⏰' },
            explanation: 'We’ll practice easy additions like 10 + 20 minutes.',
            example: null
        },
        'coins': {
            title: 'Coins',
            content: 'Coins have values. We can count them.',
            visual: { type: 'objects', count: 4, object: '🪙' },
            explanation: 'We’ll practice adding simple coin values.',
            example: null
        },
        'simple-prices': {
            title: 'Simple Prices',
            content: 'Prices can be added together.',
            visual: { type: 'objects', count: 1, object: '🏷️' },
            explanation: 'We’ll practice adding simple prices.',
            example: null
        },
        'change': {
            title: 'Making Change',
            content: 'Change means the difference between two amounts.',
            visual: { type: 'objects', count: 1, object: '🧾' },
            explanation: 'We’ll practice simple subtraction with money.',
            example: null
        },
        'real-life-subtract': {
            title: 'Real Life Subtracting',
            content: 'Subtraction happens in real life when we use something up.',
            visual: { type: 'subtraction', total: 8, take: 3, object: '🍎' },
            explanation: 'Start with the total, then take away.',
            example: null
        },
        'real-life-division': {
            title: 'Real Life Sharing',
            content: 'Division happens when we share equally.',
            visual: { type: 'division', total: 10, groups: 2, object: '🍪' },
            explanation: 'Share fairly so everyone gets the same.',
            example: null
        }
    };

    return map[lessonId] || fallback;
}

// ===== Search and Filter =====
function filterTopics(searchTerm) {
    const term = searchTerm.toLowerCase();
    let visibleCount = 0;

    document.querySelectorAll('.topic-card').forEach(card => {
        const topicId = card.dataset.topic;
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';

        // Also search lesson names/descriptions (so searches like "addition", "shapes", "time" work).
        const lessonText = (topics[topicId]?.lessons || [])
            .map(l => `${l.title} ${l.description}`)
            .join(' ')
            .toLowerCase();

        const match = !term || title.includes(term) || desc.includes(term) || lessonText.includes(term);
        if (match) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const noResults = document.getElementById('searchNoResults');
    if (noResults) {
        noResults.style.display = term && visibleCount === 0 ? 'block' : 'none';
    }
}

// ===== Progress =====
function loadProgress() {
    // Load saved progress from localStorage
    const saved = localStorage.getItem('lessonProgress');
    if (saved) {
        appState.progress = JSON.parse(saved);
    }
}

function loadProgressDisplay() {
    const completed = document.getElementById('completedLessons');
    const mastered = document.getElementById('masteredTopics');
    const time = document.getElementById('practiceTime');

    if (completed) {
        completed.textContent = appState.completedLessons.length;
    }

    if (mastered) {
        // Count unique topics mastered
        const topicsMastered = new Set();
        appState.completedLessons.forEach(lessonId => {
            Object.keys(topics).forEach(topicId => {
                if (topics[topicId].lessons.some(l => l.id === lessonId)) {
                    topicsMastered.add(topicId);
                }
            });
        });
        mastered.textContent = topicsMastered.size;
    }

    if (time) {
        const savedTime = localStorage.getItem('practiceTime') || '0';
        time.textContent = savedTime + ' min';
    }
}

// ===== Font Size =====
function toggleFontSize() {
    const sizes = ['normal', 'small', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(appState.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    appState.fontSize = sizes[nextIndex];
    localStorage.setItem('fontSize', appState.fontSize);
    applyFontSize();
}

function applyFontSize() {
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    if (appState.fontSize !== 'normal') {
        document.body.classList.add(`font-${appState.fontSize}`);
    }
}
