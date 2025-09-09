import { PricePipe } from './price-pipe';

describe('PricePipe', () => {
	let pipe: PricePipe;

	beforeEach(() => {
		pipe = new PricePipe();
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it("should format 19.9 to 19.90€", () => {
		expect(pipe.transform(19.9)).toBe('19.90€');
	});

	it("should format 0 to 0.00€", () => {
		expect(pipe.transform(0)).toBe('0.00€');
	});

	it("should format 999.99 to 999.99€", () => {
		expect(pipe.transform(999.99)).toBe('999.99€');
	});
});
