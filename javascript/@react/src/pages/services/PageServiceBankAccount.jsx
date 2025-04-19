import "../../assets/styles/pages/PageServiceBankAccount.css";

import React, { useState, useRef } from "react";

const MESSAGES = {
	/**
	 * @param {number} m
	 */
	depositSuccess: (m) =>
		`Le montant de ${m}€ a bien été déposé à votre compte avec succès.`,

	/**
	 * @param {number} m
	 */
	withdrawSuccess: (m) =>
		`Le montant de ${m}€ a bien été retiré de votre compte avec succès.`,

	montantMinimum: `Veuillez entrer un montant d'au moins 0.5€`,

	/**
	 * @param {number} b
	 * @param {number} m
	 * @param {number} d
	 */
	pasAssezDeThune: (b, m, d = Math.abs(b - m)) => [
		`Le solde actuel du compte est de ${b}€. `,
		`Il vous manque ${d}€ pour retirer ${m}€. `,
		"Veuillez ajouter de l'argent à votre compte !",
	],
};

export default function PageServiceBankAccount() {
	let [balance, setBalance] = useState(0);
	let [userAmount, setUserAmount] = useState(
		/** @type {number|undefined} */ (undefined),
	);
	let [message, setMessage] = useState(
		/** @type {Partial<{type: "ok"|"err"; text: string|Array<string>;}>} */ ({}),
	);

	/**
	 * @type {React.RefObject<HTMLInputElement|null>}
	 */
	let userAmountRef = useRef(null);

	const resetInput = () => {
		if (userAmountRef.current) {
			userAmountRef.current.value = "";
		}
		setUserAmount(undefined);
	};

	const deposit = () => {
		if (!userAmount) {
			setMessage({ type: "err", text: MESSAGES.montantMinimum });
			return;
		}

		setBalance((solde) => {
			setMessage({
				type: "ok",
				text: MESSAGES.depositSuccess(userAmount),
			});

			return solde + userAmount;
		});

		resetInput();
	};

	const withdraw = () => {
		if (!userAmount) {
			setMessage({ type: "err", text: MESSAGES.montantMinimum });
			return;
		}

		setBalance((balance) => {
			let newBalance = balance - Math.abs(userAmount);

			if (userAmount <= balance) {
				setMessage({
					type: "ok",
					text: MESSAGES.withdrawSuccess(userAmount),
				});
				return newBalance;
			}

			setMessage({
				type: "err",
				text: MESSAGES.pasAssezDeThune(balance, userAmount),
			});

			return balance;
		});

		if (userAmountRef.current) {
			userAmountRef.current.value = "";
		}
		setUserAmount(undefined);
	};

	const changeUserAmount = () => {
		let amount = Number.parseFloat(userAmountRef.current?.value || "");
		if (!Number.isNaN(amount)) {
			setUserAmount((_) => amount);
		}
	};

	return (
		<div className="page-service-bank-service">
			<h1>Bank Root</h1>

			<div>
				<p>
					Solde : <output>{balance}€</output>
				</p>

				<input
					ref={userAmountRef}
					placeholder="Votre montant"
					type="number"
					name="amount"
					step=".1"
					min="0.5"
					max="20000"
					defaultValue={userAmount}
					onChange={changeUserAmount}
				/>

				<button
					type="button"
					onClick={deposit}
				>
					Déposer
				</button>

				<button
					type="button"
					onClick={withdraw}
				>
					Retirer
				</button>

				<section className="message">
					<p className={message.type}>{message.text}</p>
				</section>
			</div>
		</div>
	);
}
