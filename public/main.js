const socket = io(),
  DISPLAY = document.getElementById("display"),
  INPUT_MSG = document.getElementById("message"),
  BTN_MSG = document.getElementById("send-btn"),
  USERNAME = prompt("Write your username");

// functions

const newUser = (user) => {
  socket.emit("new user", user);
};

const showMessage = (message) => {
  DISPLAY.innerHTML += message;
};

const sendMessage = () => {
  socket.emit("chat message", {
    username: USERNAME,
    message: INPUT_MSG.value,
  });

  INPUT_MSG.value = "";
};

socket.on("chat message", (data) => {
  const user = { username: data.username, message: data.message };
  if (user.username !== USERNAME) showMessage(messageBubble(user));
  else showMessage(myMessageBubble(user.message));
});

// message templates

const messageBubble = (user) => {
  return `
  <div class="message-bubble">
    <div class="username">${user.username}</div>
    <div class="message-content">${user.message}</div>
  </div>
  `;
};

const myMessageBubble = (message) => {
  return `
  <div class="me">
    <div class="message-bubble">
      <div class="username">Me</div>
      <div class="message-content">
        ${message}
      </div>
    </div>
  </div>
  `;
};

// initializations

BTN_MSG.addEventListener("click", sendMessage);
window.addEventListener("keyup", (event) => {
  if (event.key === 'Enter') sendMessage();
});
