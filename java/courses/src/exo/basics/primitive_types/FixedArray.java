package exo.basics.primitive_types;

public class FixedArray
{
	public static void main(String[] args)
	{
		int[] ages = {25, 30, 28};
		System.out.println("Premier âge: " + ages[0]);
		System.out.println("Dernier âge: " + ages[ages.length - 1]);
		ages[1] = 35;

		System.out.println("Nombre d'âges: " + ages.length);

		for (int i = 0; i < ages.length; i++) {
			System.out.println("Âge " + i + ": " + ages[i]);
		}

		for (int age : ages) {
			System.out.println("Âge : " + age);
		}

		char[] java;
		java = new char[]{'j', 'a', 'v', 'a'};

		System.out.println("Premier prénom: " + java[0]);
		System.out.println("Deuxième prénom: " + java[1]);

		int[][] multiArr = {{10, 20}, {30, 40}};
		System.out.println(multiArr[1][1]);
		System.out.println(multiArr[0][1]);
		System.out.println(multiArr[1][0]);
	}
}
