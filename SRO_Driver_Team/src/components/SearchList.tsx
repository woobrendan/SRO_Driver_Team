import { useMemo, useState, type ReactNode, type ChangeEvent } from "react";

type SearchListProps<T> = {
	items: T[];
	getKey: (item: T) => string;
	renderItem: (item: T) => ReactNode;
	// Fields to match against. Ignored if filterFn is provided.
	searchKeys?: (keyof T)[];
	// Custom matcher. Receives the trimmed, lowercased query.
	filterFn?: (item: T, query: string) => boolean;
	placeholder?: string;
	emptyMessage?: string;
};

const SearchList = <T,>({
	items,
	getKey,
	renderItem,
	searchKeys,
	filterFn,
	placeholder = "Search...",
	emptyMessage = "No results found."
}: SearchListProps<T>) => {
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;

		return items.filter((item) => {
			if (filterFn) return filterFn(item, q);
			if (!searchKeys?.length) return true;
			return searchKeys.some((key) =>
				String(item[key] ?? "")
					.toLowerCase()
					.includes(q)
			);
		});
	}, [items, query, searchKeys, filterFn]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div className="search-list">
			<input
				type="search"
				value={query}
				onChange={handleChange}
				placeholder={placeholder}
				className="search-list__input"
			/>
			<p className="search-list__count">
				{filtered.length} of {items.length}
			</p>

			{filtered.length === 0 ? (
				<p className="search-list__empty">{emptyMessage}</p>
			) : (
				<ul className="search-list__items">
					{filtered.map((item) => (
						<li key={getKey(item)}>{renderItem(item)}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchList;
