class Hotel
{
	/**
	 * @type {Array<Room>}
	 */
	#rooms = [];

	#allRoomTypes = ["single", "double"];

	addRoom(...args)
	{
		if (this.#hasRoom(args[0])) {
			return null;
		}

		let room = new Room(...args);
		this.#rooms.push(room);
		return room;
	}

	bookRoom(selectedRoom)
	{
		let room = this.#rooms.find((r) => r.getNumber() === selectedRoom.getNumber());

		if (!room) {
			return false;
		}

		room.setStatus(false);
		return true;
	}

	freeRoom(selectedRoom)
	{
		let room = this.#rooms.find((r) => r.getNumber() === selectedRoom.getNumber());

		if (!room) {
			return false;
		}

		room.setStatus(true);
		return true;
	}

	deleteRoom(selectedRoom)
	{
		this.#rooms = this.#rooms.filter((r) => r.getNumber() !== selectedRoom.getNumber());
		return true;
	}

	#hasRoom(number) {
		return this.#rooms.some((room) => room.getNumber() === number);
	}

	listAllRooms()
	{
		return this.#rooms;
	}

	listAvailableRooms()
	{
		return this.#rooms.filter((room) => room.getStatus())
	}

	getAllRoomTypes()
	{
		return this.#allRoomTypes;
	}
}

class Room {
	#number;
	#price;
	#type;
	#status;
	#nights;

	constructor(number, price, type) {
		this.#number = number;
		this.#price = price;
		this.#type = type;
		/**
		 * true  = disponible
		 * false = réservé
		 */
		this.#status = true;
		this.#nights = 1;
	}

	getNumber()
	{
		return this.#number;
	}

	getPrice()
	{
		return this.#price * this.getNights();
	}

	getType()
	{
		return this.#type;
	}

	getStatus()
	{
		return this.#status;
	}

	setStatus(status)
	{
		this.#status = status;
	}

	getNights()
	{
		return this.#nights;
	}
}
