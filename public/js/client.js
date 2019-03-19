
var state = {
	checkingInterval: 1000,
	lastMessageId: -1,
};

function handleMessages(code, data) {
  var messages = JSON.parse(data);
	for (var i = 0; i < messages.length; i = i + 1) {
		var m = messages[i];
		addMessageToLogs(m);
		state.lastMessageId = m.id;
	}
}

function addMessageToLogs(message) {
  var listEl = document.querySelector('#chatlog');
	var newMessageElement = document.createElement("li");

	var usernameEl = document.createElement('h6');
	usernameEl.appendChild(document.createTextNode(message.username));

	var textEl = document.createElement('p');
	textEl.appendChild(document.createTextNode(message.text));

	newMessageElement.appendChild(usernameEl);
	newMessageElement.appendChild(textEl);

	listEl.appendChild(newMessageElement);
}

function getNewMessages() {
	var url = "/messages?lastSeenId=" + state.lastMessageId;
	ajax({url: url}, handleMessages);
}

function sendMessage(messageData) {
	ajax({
			url: '/messages',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messageData),
		},
		function (code, responseText) {
			console.log('message sent to server', code, responseText);
		}
	)
}

document.querySelector('#sendbutton').addEventListener('click', function (e) {
	e.preventDefault();
	var textEl = document.querySelector('textarea[name="text"]');
	var usernameEl = document.querySelector('input[name="username"]');

	sendMessage({username: usernameEl.value, text: textEl.value});
	textEl.value = "";
});

setInterval(getNewMessages, state.checkingInterval);

