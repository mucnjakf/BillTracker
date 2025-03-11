namespace billtracker_api.Bills;

internal sealed record BillListDto(int Id, string Date, string BillNumber, decimal Total);
