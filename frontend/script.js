const API_URL = "http://127.0.0.1:8000";

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const clearButton = document.getElementById("clearButton");
const newChatButton = document.getElementById("newChatButton");
const typingIndicator = document.getElementById("typingIndicator");

let conversationHistory = [];


/* =========================
   ADD MESSAGE
========================= */

function addMessage(message, role) {

    const wrapper = document.createElement("div");

    wrapper.classList.add(
        "message",
        role === "user"
            ? "user-message"
            : "assistant-message"
    );


    const avatar = document.createElement("div");

    avatar.classList.add("avatar");

    avatar.textContent =
        role === "user"
            ? "YOU"
            : "AI";


    const content = document.createElement("div");

    content.classList.add("message-content");


    const name = document.createElement("div");

    name.classList.add("message-name");

    name.textContent =
        role === "user"
            ? "You"
            : "AI Assistant";


    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    bubble.textContent = message;


    content.appendChild(name);
    content.appendChild(bubble);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);

    chatMessages.appendChild(wrapper);

    scrollToBottom();
}


/* =========================
   SCROLL
========================= */

function scrollToBottom() {

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* =========================
   TYPING
========================= */

function showTyping() {

    typingIndicator.classList.remove("hidden");

    scrollToBottom();
}


function hideTyping() {

    typingIndicator.classList.add("hidden");
}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage() {

    const message =
        messageInput.value.trim();


    if (!message) {
        return;
    }


    addMessage(message, "user");


    conversationHistory.push({
        role: "user",
        content: message
    });


    messageInput.value = "";

    messageInput.style.height = "auto";

    sendButton.disabled = true;

    showTyping();


    try {

        const response = await fetch(
            `${API_URL}/chat`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message,
                    history: conversationHistory
                })
            }
        );


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const data = await response.json();


        hideTyping();


        addMessage(
            data.response,
            "assistant"
        );


        conversationHistory.push({
            role: "assistant",
            content: data.response
        });


    } catch (error) {

        hideTyping();

        console.error(error);

        addMessage(
            "Sorry, something went wrong while contacting the AI server.",
            "assistant"
        );

    } finally {

        sendButton.disabled = false;

        messageInput.focus();

    }
}


/* =========================
   CLEAR CHAT
========================= */

function clearChat() {

    conversationHistory = [];

    chatMessages.innerHTML = "";

    addMessage(
        "Chat cleared. What would you like to talk about?",
        "assistant"
    );
}


/* =========================
   EVENTS
========================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


clearButton.addEventListener(
    "click",
    clearChat
);


newChatButton.addEventListener(
    "click",
    clearChat
);


messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================
   AUTO RESIZE TEXTAREA
========================= */

messageInput.addEventListener(
    "input",
    function() {

        this.style.height = "auto";

        this.style.height =
            `${Math.min(this.scrollHeight, 150)}px`;

    }
);
