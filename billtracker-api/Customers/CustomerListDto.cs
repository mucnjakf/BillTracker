namespace billtracker_api.Customers;

internal sealed record CustomerListDto(
	int Id, 
	string Name, 
	string Surname, 
	string Email);
