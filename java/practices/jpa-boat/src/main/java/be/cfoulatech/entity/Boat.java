package be.cfoulatech.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "boats")
public class Boat
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(nullable = false, name = "longueur_metres")
	private Double height;

	@Column(nullable = false, name = "largeur_metres")
	private Double width;

	@Column(nullable = false, length = 50)
	private String type;

	public Boat()
	{
	}

	public Boat(String name, Double height, Double width, String type)
	{
		this.name = name;
		this.height = height;
		this.width = width;
		this.type = type;
	}

	public Integer getId()
	{
		return id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public Double getHeight()
	{
		return height;
	}

	public void setHeight(Double height)
	{
		this.height = height;
	}

	public Double getWidth()
	{
		return width;
	}

	public void setWidth(Double width)
	{
		this.width = width;
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

	@Override
	public String toString()
	{
		return "Boat{" +
			"id=" + id +
			", name='" + name + '\'' +
			", height=" + height +
			", width=" + width +
			", type='" + type + '\'' +
			'}';
	}
}
