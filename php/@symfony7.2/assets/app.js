import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';
import {Like} from "./scripts/like.js";

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

document.addEventListener('DOMContentLoaded', () => {
	const $likes = document.querySelectorAll('form[data-action="like"]');

	Array.from($likes)
		.map(Like.fromElement)
		.forEach((like) => like.addEventListeners());
});
