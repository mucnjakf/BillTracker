using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Pagination;

internal sealed class PagedList<T>
{
	public IEnumerable<T> Items { get; private set; }

	public int PageNumber { get; private set; }

	public int PageSize { get; private set; }

	public int TotalPages { get; private set; }

	public int TotalCount { get; private set; }

	public bool HasPrevious => PageNumber > 1;

	public bool HasNext => PageNumber < TotalPages;

	private PagedList(IEnumerable<T> items, int pageNumber, int pageSize, int totalCount)
	{
		Items = items;
		PageNumber = pageNumber;
		PageSize = pageSize;
		TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
		TotalCount = totalCount;
	}

	public static async Task<PagedList<T>> ToPagedListAsync(IQueryable<T> source, int pageNumber, int pageSize)
	{
		var totalCount = await source.CountAsync();
		var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

		return new(items, pageNumber, pageSize, totalCount);
	}
}
