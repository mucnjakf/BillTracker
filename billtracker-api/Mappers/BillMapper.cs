using billtracker_api.Dtos;
using billtracker_api.Endpoints.Customers.Bills;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class BillMapper
{
	internal static CustomerBillTableDto ToCustomerBillTableDto(this Bill bill)
	{
		return new(bill.Id, bill.Date, bill.BillNumber, bill.Total);
	}
}
