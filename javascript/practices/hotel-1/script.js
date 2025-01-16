// @ts-nocheck

/**
 * Classe correspondante une chambre d'hotel
 */
class HotelRoom
{
	/**
	 * Numéro de la chambre
	 */
	#number;

	/**
	 * Prix de la chambre
	 */
	#price;

	/**
	 * Nombre de nuits à passer dans la chambre d'hotel
	 */
	#nights = 1;

	/**
	 * Construit l'objet de la classe HotelRoom
	 * Le prix peut être évolutif, il n'y a pas besoin de le passer en paramètre
	 */
	constructor(number)
	{
		this.#number = number;
	}

	/**
	 * Récupère le prix unitaire.
	 */
	getPrice()
	{
		return this.#price;
	}

	/**
	 * Récupère le prix par nuits.
	 */
	getPriceByNights()
	{
		return this.#price * this.#nights;
	}

	/**
	 * Définie le prix d'une chambre d'hotel
	 */
	setPrice(price)
	{
		this.#price = price;
	}

	/**
	 * Définie le nombre de nuits
	 */
	setNights(number)
	{
		this.#nights = number;
	}
}

let room1 = new HotelRoom("42");
room1.setPrice(123);
