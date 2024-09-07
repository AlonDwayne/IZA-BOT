let state = 0; // 0: Get Name, 1: Choose Course, 2: Choose Module, 3: Choose Content, 4: Chat Options
let name = '';
let selectedCourse = '';

const courses = {
    1: ['Operations Research', 'Further Discrete', 'Linear Algebra', 'Advanced Calculus'],
    2: ['Data Structures', 'Algorithms', 'Computer Networks', 'Database Systems']
};

const modulesContent = {
    'Operations Research': ['Module timetable', 'Module outline', 'Lecture info'],
    'Further Discrete': ['Module timetable', 'Module outline', 'Lecture info'],
    'Linear Algebra': ['Module timetable', 'Module outline', 'Lecture info'],
    'Advanced Calculus': ['Module timetable', 'Module outline', 'Lecture info'],
    'Data Structures': ['Module timetable', 'Module outline', 'Lecture info'],
    'Algorithms': ['Module timetable', 'Module outline', 'Lecture info'],
    'Computer Networks': ['Module timetable', 'Module outline', 'Lecture info'],
    'Database Systems': ['Module timetable', 'Module outline', 'Lecture info']
};

function sendMessage() {
    const input = document.getElementById('input').value.trim();
    const botResponse = document.getElementById('bot-response');
    const messageSection = document.getElementById('message-section');

    let response = '';

    if (state === 0) {
        // Get user name
        name = input;
        response = `Hello, ${name}! Please choose a course:\n1. Mathematics course\n2. Computer Science course`;
        state = 1;
    } else if (state === 1) {
        // Course selection
        const courseNumber = parseInt(input);
        if (courseNumber === 1 || courseNumber === 2) {
            selectedCourse = courseNumber === 1 ? 'Mathematics' : 'Computer Science';
            response = `You chose ${selectedCourse}. Please choose a module:\n${courses[courseNumber].map((mod, i) => `${i + 1}. ${mod}`).join('\n')}`;
            state = 2;
        } else {
            response = 'Invalid choice. Please enter 1 or 2.';
        }
    } else if (state === 2) {
        // Module selection
        const moduleNumber = parseInt(input);
        const module = courses[state === 2 && selectedCourse === 'Mathematics' ? 1 : 2][moduleNumber - 1];
        if (module) {
            response = `You chose ${module}. Please choose content:\n1. Module timetable\n2. Module outline\n3. Lecture info`;
            state = 3;
        } else {
            response = 'Invalid choice. Please enter a valid module number.';
        }
    } else if (state === 3) {
        // Content selection
        const contentNumber = parseInt(input);
        const module = courses[selectedCourse === 'Mathematics' ? 1 : 2][parseInt(input) - 1];
        const content = modulesContent[module] && modulesContent[module][contentNumber - 1];
        if (content) {
            const links = {
                'Module timetable': 'https://example.com/timetable',
                'Module outline': 'https://example.com/outline',
                'Lecture info': 'https://example.com/lecture-info'
            };
            response = `Here are the links for ${content}:\n${links[content]}`;
            response += `\n\n1. Close chat\n2. Continue chat`;
            state = 4;
        } else {
            response = 'Invalid choice. Please enter 1, 2, or 3.';
        }
    } else if (state === 4) {
        // Chat options after content
        const optionNumber = parseInt(input);
        if (optionNumber === 1) {
            // Close chat
            response = `Hello!, my name is IZA-BOT. What is your name?`;
            state = 0;
        } else if (optionNumber === 2) {
            // Continue chat
            response = `Please choose a course:\n1. Mathematics course\n2. Computer Science course`;
            state = 1;
        } else {
            response = 'Invalid choice. Please enter 1 or 2.';
        }
    }

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message';
    userMessage.id = 'user';
    userMessage.innerHTML = `<span id="user-response">${input}</span>`;
    messageSection.appendChild(userMessage);

    // Display bot response
    botResponse.textContent = response;
    const botMessage = document.createElement('div');
    botMessage.className = 'message';
    botMessage.id = 'bot';
    botMessage.innerHTML = `<span id="bot-response">${response}</span>`;
    messageSection.appendChild(botMessage);

    // Clear input field
    document.getElementById('input').value = '';

    // Scroll to the bottom
    messageSection.scrollTop = messageSection.scrollHeight;
}
