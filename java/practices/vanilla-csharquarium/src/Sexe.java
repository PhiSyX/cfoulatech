enum Sexe
{
	MALE, FEMELLE;

	@Override
	public String toString()
	{
		return this == MALE ? "Mâle" : "Femelle";
	}
}
