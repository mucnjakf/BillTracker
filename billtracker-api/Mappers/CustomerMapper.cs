using billtracker_api.Dtos;
using billtracker_api.Endpoints.Customers;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

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
			customer.City?.Name ?? "-");
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
			customer.City?.Name ?? "-");
	}
}
