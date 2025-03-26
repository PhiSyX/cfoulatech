class Chat {
	// Tous les messages du Chat
	messages = {};

	// Status de la connexion
	sseStatus = "closed";

	// Temps en seconde de reconnexion au Chat
	reconnectionTime = 1;

	constructor() {
		let lastMessageID = this.getLastMessageID();
		this.createServerSentEvent(lastMessageID);
	}

	initEvents() {
		let form = document.querySelector("form");

		form?.addEventListener("submit", (e) => {
			e.preventDefault();

			fetch(form.action, {
				method: "POST",
				body: new FormData(form),
				credentials: "same-origin",
			});

			form.elements.message.value = "";
		});
	}

	createServerSentEvent(sessionID = null) {
		let lastMessageID = sessionID || this.getLastMessageID();

		// EventSource permet de lier le backend et le frontend pour RECEVOIR
		// des données en temps réelle.
		let eventSource = new EventSource(
			`./event-messages.php?lastMessageID=${lastMessageID}`,
		);

		// Le backend va nous envoyer un événement `message` avec des données,
		// dans le cas présent, ces données correspondent à un message de la
		// base de données, représenté sous le format JSON.
		eventSource.addEventListener("message", (evt) => {
			// JSON.parse permet de convertir un JSON qui est en string en un
			// JSON Objet pour pouvoir le manipuler en code JavaScript.
			//
			// evt.data = '{"hello":"world"}'
			//    JSON.parse(evt.data)
			// data = { hello: "world" }
			let data = JSON.parse(evt.data);

			// Ca peut arriver que le serveur envoie des doublons, si c'est le
			// cas, on n'ajoute pas le message dans le DOM.
			if (
				this.messages[data.id_message]?.id_message === data.id_message
			) {
				return;
			}

			this.messages[data.id_message] = data;

			// Sauvegarde l'ID du dernier message dans la session, pour que
			// lorsqu'on recharge la page, nous recevons uniquement les derniers
			// messages à partir de cet ID.
			this.setLastMessageID(data.id_message);

			// Ajout du message dans le DOM...
			this.writeDOM({
				id: data.id_message,
				sender: data.firstname,
				text: data.text,
				timestamp: new Date(data.created_at),
			});
		});

		eventSource.addEventListener("open", () => {
			let lastMessageID = this.getLastMessageID();
			this.sseStatus = `opened with ${lastMessageID}`;
		});

		// Concerne la partie reconnexion au Chat
		eventSource.addEventListener("error", () => {
			eventSource.close();

			let lastMessageID = this.getLastMessageID();

			if (this.sseStatus === `opened with ${lastMessageID}`) {
				setTimeout(
					() => this.createServerSentEvent(),
					this.reconnectionTime * 1000,
				);
			} else {
				this.createServerSentEvent();
			}
		});
	}

	getLastMessageID() {
		let lastMessageID = Number(
			sessionStorage.getItem("chat.lastMessageID"),
		);
		if (!Number.isNaN(lastMessageID)) {
			return lastMessageID;
		}
		return 0;
	}

	setLastMessageID(id) {
		return sessionStorage.setItem("chat.lastMessageID", id);
	}

	writeDOM({ id, sender, timestamp, text }) {
		let messages = document.getElementById("list");
		let newMessage = document.createElement("div");

		newMessage.setAttribute("data-id", id);
		newMessage.className = "message";

		let senderElement = document.createElement("div");
		senderElement.className = "message__sender";
		senderElement.textContent = sender;

		let textElement = document.createElement("div");
		textElement.className = "message__text";
		textElement.textContent = text;

		let timestampElement = document.createElement("div");
		timestampElement.className = "message__timestamp";
		if (timestamp.getDate() === new Date().getDate()) {
			let h = timestamp.getHours();
			if (h < 10) {
				h = `0${h}`
			}
			let m = timestamp.getMinutes();
			if (m < 10) {
				m = `0${m}`
			}
			let s = timestamp.getSeconds();
			if (s < 10) {
				s = `0${s}`
			}
			timestampElement.textContent = `Aujourd'hui à ${h}:${m}:${s}`;
		} else {
			timestampElement.textContent = timestamp;
		}

		newMessage.append(senderElement, textElement, timestampElement);

		messages?.appendChild(newMessage);

		messages.scrollTo({
			top: messages.scrollHeight,
			behavior: "smooth",
		});
	}
}

let chat = new Chat();

chat.initEvents();
