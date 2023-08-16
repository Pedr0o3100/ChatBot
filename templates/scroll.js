const chatBox = document.getElementById('message-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', () => {
    const question = userInput.value;
    if (question.trim() !== '') {
        appendUserMessage(question);
        getUserAnswer(question);
        userInput.value = '';
        scrollToBottom();
    }
});

userInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    }
});

function appendBotMessage(message) {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message bot';
    chatMessage.textContent = message;
    chatBox.appendChild(chatMessage);
}

function appendUserMessage(message) {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message user';
    chatMessage.textContent = message;
    chatBox.appendChild(chatMessage);
}

function getUserAnswer(question) {
    fetch('/get_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `question=${encodeURIComponent(question)}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.answer !== 'Carregando a resposta...') {
            appendBotMessage(data.answer);
            scrollToBottom();
        }
    })
    .catch(error => {
        console.error('Erro ao obter resposta:', error);
        appendBotMessage('Desculpe, ocorreu um erro ao obter a resposta.');
        scrollToBottom();
    });
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}
