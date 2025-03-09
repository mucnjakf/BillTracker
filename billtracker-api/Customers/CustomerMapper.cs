namespace billtracker_api.Customers;

internal static class CustomerMapper
{
	internal static CustomerTableDto ToCustomerTableDto(this Customer customer)
	{
		return new(
			customer.Id,
			customer.Name,
			customer.Surname,
			customer.Email,
			customer.Telephone,
			customer.City?.Name ?? "-",
			customer.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}

	internal static CustomerDto ToCustomerDto(this Customer customer)
	{
		return new(
			customer.Id,
			customer.Guid,
			customer.Name,
			customer.Surname,
			customer.Email,
			customer.Telephone,
			customer.CityId ?? 0,
			customer.City?.Name ?? "-",
			customer.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}
}
