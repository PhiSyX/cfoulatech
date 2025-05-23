import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:5173/");
});

test.describe("Pokemon", () => {
	test("Simulation d'une attaque", async ({ page }) => {
		let $pokemon = await page.$("article.pokemon-detail:nth-child(1)");
		await $pokemon?.click();
		await page.getByText("Lancer le combat").click({ delay: 500 });
		let $attackerFighter = await page.$("#battle-screen .fighter:last-of-type");
		let $attackerAttackBtn = await $attackerFighter?.$("button:nth-child(1)");
		let $attackerAttackPower = await $attackerAttackBtn?.$("span");
		let $defenderFighter = await page.$("#battle-screen .fighter:first-of-type");
		let $defenderProgress = await $defenderFighter?.$("meter");
		let progressValue = await $defenderProgress?.getAttribute("value");
		let attackPowerTitle = (await $attackerAttackPower?.getAttribute("title"))?.slice("Puissance ".length);
		await $attackerAttackBtn?.click();
		let newProgressValue = await $defenderProgress?.getAttribute("value");
		// @ts-expect-error
		expect(Math.round(Number.parseFloat(newProgressValue))).toBe(
			// @ts-expect-error
			Math.round(Number.parseFloat(progressValue) - Number.parseFloat(attackPowerTitle)),
		);
	});
});
