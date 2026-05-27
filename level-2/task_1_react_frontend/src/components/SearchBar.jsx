import { Search } from 'lucide-react';

export default function SearchBar({ query, resultCount, onQueryChange }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="theme-text text-xl font-extrabold">
          Inventory list
        </h2>
        <p className="theme-muted text-sm">
          {resultCount} matching items
        </p>
      </div>

      <label className="relative block w-full md:max-w-sm">
        <span className="sr-only">Search products</span>
        <Search
          className="theme-soft pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          size={18}
        />
        <input
          className="input w-full pl-10"
          type="search"
          placeholder="Search by name"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
    </div>
  );
}
