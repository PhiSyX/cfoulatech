package exo.klass;

import java.util.Scanner;

public class SimpleCalc
{
	public static void main(String[] args)
	{
		displayTitle();

		Scanner scan = new Scanner(System.in);

		System.out.print("Opérand gauche: ");
		int leftOp = Integer.parseInt(scan.nextLine());
		System.out.print("Opérand droit : ");
		int rightOp = Integer.parseInt(scan.nextLine());

		System.out.printf("Le résultat de %d + %d = %d%n", leftOp, rightOp, add(leftOp, rightOp));

		scan.close();
	}

	public static int add(int l, int r)
	{
		return l + r;
	}

	public static void displayTitle()
	{
		System.out.println("=== Calculatrice Simple ===");
	}
}
