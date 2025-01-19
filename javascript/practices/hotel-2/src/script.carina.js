// @ts-nocheck

class Hotel {
	#rooms;

	constructor() {
	  this.#rooms = [];
	}
	//push is a native function  and used to add an element to an array
	// number, type, price inside the constructor is not reference to the object itself but is just to show the parameters
	addRoom(number, type, price) {
	  let newRoom = new Room(number, type, price);
	  this.#rooms.push(newRoom);
	  return newRoom;
	}
	listAllRooms() {
	  return this.#rooms;
	}
	listAvailableRooms() {
	  return this.#rooms.filter(
		// Avec filter, la fonction anonyme doit retourner une valeur de type bool
		(room) => room.getStatus()
	  );
	}
	deleteRoom(number) {
	  this.#rooms = this.#rooms.filter((room) => room.getNumber() !== number);
	  return true;
	}
	modifyRoom(number, type, price) {
		let room = this.#rooms.find((room) => {
			return room.getNumber() === number;
		});
		room.setNumber(number);
		room.setType(type);
		room.setPrice(price);
		return room;
	}
	freeRoom(number) {
		let room = this.#rooms.find((room) => {
			return room.getNumber() === number;
		});
		room.setStatus(true);
		return true;
	}

	bookRoom(number) {
		let room = this.#rooms.find((room) => {
			return room.getNumber() === number;
		});
		room.setStatus(false);
	  return true;
	}
	searchRooms(type, maxPrice) {
	  return this.#rooms.filter(
		(room) => room.getType() === type && room.getPrice() <= maxPrice
	  );


	  //version avec le boucle for
	  // let rooms = []

	  // for (let room of this.#rooms) {
	  //   if (room.getType() === type && room.getPrice() <= maxPrice) {
	  //     rooms.push(room);
	  //   }
	  // }

	  // return rooms;
	}

	/** Mike */
	#allRoomTypes = ["single", "double"];

	getAllRoomTypes()
	{
		return this.#allRoomTypes;
	}
}

class Room {

	constructor(number, type, price) {
	  this.number = number;
	  this.type = type;
	  this.price = price;
	  /**
	   * true = free
	   * false = booked
	   */
	  this.status = true;
	  this.nights = 1;
	}
	//setter
	setNumber(number) {
	  this.number = number;
	}

	setNights(nights) {
		this.nights = nights;
	}

	setType(type) {
	  this.type = type;
	}

	setPrice(price) {
	  this.price = price;
	}

	setStatus(status) {
	  this.status = status;
	}
	//getter
	getNumber() {
	  return this.number;
	}

	getNights() {
		return this.nights;
	}

	getType() {
	  return this.type;
	}

	getPrice() {
	  return this.price * this.nights;
	}
	getUnitPrice(){
		return this.price;
	}
	getStatus() {
	  return this.status;
	}
}







/** Mike */





class HotelX
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

	modifyRoom(number, price, type) {
		let room = this.#rooms.find((r) => r.getNumber() === number);
		if (!room) {
			return null;
		}

		room.setNumber(number);
		room.setPrice(price);
		room.setType(type);

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

class RoomX {
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

	setNumber(number)
	{
		this.#number = number;
	}

	getUnitPrice()
	{
		return this.#price;
	}

	getPrice()
	{
		return this.#price * this.getNights();
	}

	setPrice(price)
	{
		this.#price = price;
	}

	getType()
	{
		return this.#type;
	}

	setType(type)
	{
		this.#type = type;
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
