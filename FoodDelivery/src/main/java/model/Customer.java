package model;

import java.util.ArrayList;

public class Customer extends User{
	
	private CustomerType type;
	private int points;
	private String basketId; 
	private ArrayList<String> orders = new ArrayList<String>(); // id porudzbina

}
