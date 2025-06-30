package basics.klass;

public class ObjectClass extends InheritClass
{
	public int field1;
	private int field2;

	public ObjectClass(int field1, int field2, int field3)
	{
		super(field3);
		this.field1 = field1;
		this.field2 = field2;
	}

	public void tryPrivateAccess()
	{
//		System.out.println(this.field4);
	}
}

class InheritClass
{
	protected int field3;
	private int field4;

	InheritClass(int field3)
	{
		this.field3 = field3;
	}
}
