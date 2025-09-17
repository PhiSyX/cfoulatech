import { ResultPipe } from './result-pipe';

describe('ResultPipe', () => {
	it('Vérifier qu’une note ≥ 10 → Admis', () => {
		const pipe = new ResultPipe();
		expect(pipe.transform(10)).toBe("Admis");
		expect(pipe.transform(16)).toBe("Admis");
	});

	it('Vérifier qu’une note < 10 → Ajourné', () => {
		const pipe = new ResultPipe();
		expect(pipe.transform(8)).toBe("Ajourné");
	});
});
