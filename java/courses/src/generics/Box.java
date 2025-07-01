package generics;

public class Box<T>
{
	private T val;

	public void put(T objet)
	{
		this.val = objet;
	}

	public T get()
	{
		return val;
	}
}

class BoxTest
{
	public static void main(String[] args)
	{
		Box<String> boxText = new Box<>();
		boxText.put("Hello");
		String str = boxText.get();
		Box<Integer> boxNumber = new Box<>();
		boxNumber.put(42);
		Integer num = boxNumber.get();
		System.out.println(str);
		System.out.println(num);
	}
}
