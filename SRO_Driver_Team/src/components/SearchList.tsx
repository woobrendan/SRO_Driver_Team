import { useMemo, useState, type ReactNode, type ChangeEvent } from "react";
import "../styling/list.css";

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
	onItemClick?: (item: T) => void;
	getTitle?: (item: T) => string;
	sortFn?: (a: T, b: T) => number;
	onAdd?: () => void;
	addLabel?: string;
};

const SearchList = <T,>({
	items,
	getKey,
	renderItem,
	searchKeys,
	filterFn,
	placeholder = "Search...",
	emptyMessage = "No results found.",
	onItemClick,
	getTitle,
	sortFn,
	onAdd,
	addLabel = "Add"
}: SearchListProps<T>) => {
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();

		const matches = !q
			? items
			: items.filter((item) => {
					if (filterFn) return filterFn(item, q);
					if (!searchKeys?.length) return true;
					return searchKeys.some((key) =>
						String(item[key] ?? "")
							.toLowerCase()
							.includes(q)
					);
				});

		return sortFn ? [...matches].sort(sortFn) : matches;
	}, [items, query, searchKeys, filterFn, sortFn]);

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
			{onAdd && (
				<button type="button" className="search-list__add" onClick={onAdd}>
					{addLabel}
				</button>
			)}

			{filtered.length === 0 ? (
				<p className="search-list__empty">{emptyMessage}</p>
			) : (
				<ul className="search-list__items">
					{filtered.map((item) => (
						<li key={getKey(item)}>
							<button
								type="button"
								className="search-list__card"
								onClick={() => onItemClick?.(item)}
								title={getTitle?.(item)}
							>
								{renderItem(item)}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchList;
