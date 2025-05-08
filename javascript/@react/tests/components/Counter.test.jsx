import { describe, test } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "../../src/components/Counter";

describe("Counter component", () => {
	test("renders with default values", ({ expect }) => {
		render(<Counter />);

		// Check if the counter is displayed with initial value 0
		expect(screen.getByText(/compteur:/i)).toBeInTheDocument();
		expect(screen.getByText("0")).toBeInTheDocument();

		// Check if buttons are present
		expect(screen.getByText(/incrémenter/i)).toBeInTheDocument();
		expect(screen.getByText(/décrémenter/i)).toBeInTheDocument();
	});

	test("increments the counter when increment button is clicked", ({
		expect,
	}) => {
		render(<Counter initialValue={5} />);

		// Initial value should be 5
		expect(screen.getByText("5")).toBeInTheDocument();

		// Click increment button
		fireEvent.click(screen.getByText(/incrémenter/i));

		// Value should be incremented to 6
		expect(screen.getByText("6")).toBeInTheDocument();
	});

	test("decrements the counter when decrement button is clicked", ({
		expect,
	}) => {
		render(<Counter initialValue={5} />);

		// Initial value should be 5
		expect(screen.getByText("5")).toBeInTheDocument();

		// Click decrement button
		fireEvent.click(screen.getByText(/décrémenter/i));

		// Value should be decremented to 4
		expect(screen.getByText("4")).toBeInTheDocument();
	});

	test("respects min and max boundaries", ({ expect }) => {
		render(
			<Counter
				initialValue={5}
				min={0}
				max={10}
			/>,
		);

		// Initial value should be 5
		expect(screen.getByText("5")).toBeInTheDocument();

		// Click increment button multiple times to reach max
		for (let i = 0; i < 10; i++) {
			fireEvent.click(screen.getByText(/incrémenter/i));
		}

		// Value should be capped at 10
		expect(screen.getByText("10")).toBeInTheDocument();

		// Click decrement button multiple times to reach min
		for (let i = 0; i < 20; i++) {
			fireEvent.click(screen.getByText(/décrémenter/i));
		}

		// Value should be capped at 0
		expect(screen.getByText("0")).toBeInTheDocument();
	});

	test("updates value when range input is changed", ({ expect }) => {
		render(
			<Counter
				initialValue={5}
				min={0}
				max={10}
			/>,
		);

		// Initial value should be 5
		expect(screen.getByText("5")).toBeInTheDocument();

		// Change range input value
		fireEvent.change(screen.getByRole("slider"), { target: { value: 8 } });

		// Value should be updated to 8
		expect(screen.getByText("8")).toBeInTheDocument();
	});
});
