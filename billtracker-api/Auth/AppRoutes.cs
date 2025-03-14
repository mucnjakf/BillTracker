namespace billtracker_api.Auth;

internal static class AppRoutes
{
	private const string Base = "/api";

	internal const string Auth = $"{Base}/auth";
	internal const string Customers = $"{Base}/customers";
	internal const string Bills = $"{Base}/bills";
	internal const string Items = $"{Base}/items";
	internal const string Products = $"{Base}/products";
	internal const string Categories = $"{Base}/categories";
	internal const string SubCategories = $"{Base}/subcategories";
	internal const string Sellers = $"{Base}/sellers";
	internal const string Cities = $"{Base}/cities";
}
