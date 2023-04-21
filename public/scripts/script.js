const chatFrom = document.querySelector('.chat-form');
const chatMessages = document.querySelector('.chat-messages');

var socket = io();

// Message from server
socket.on('message', message => {
    outputMessage(message);

    // Scroll down

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit 
chatFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);
});

// Output message to DOM
function outputMessage(message) {
    const ul = document.querySelector('.chat-messages');
    const li = document.createElement('li');
    li.classList.add('chat-message');
    li.innerHTML = `<h4>username <span>9:33</span></h4>
    <p>
        ${message}
    </p>`;
    ul.appendChild(li);
}