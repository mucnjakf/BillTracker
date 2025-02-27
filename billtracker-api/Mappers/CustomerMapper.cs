using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class CustomerMapper
{
	internal static CustomerTableDto ToCustomerTableDto(this Customer customer)
	{
		return new(
			customer.Name,
			customer.Surname,
			customer.Email,
			customer.Telephone,
			customer.City?.Name ?? "-");
	}
}
