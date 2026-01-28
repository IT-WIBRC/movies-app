function Search({ searchItem, setSearchItem }) {
  return (
    <div className="search">
      <label htmlFor="search">
        <img src="/search.svg" alt="Search icon" />
        <input
          type="search"
          aria-label="Search bar for movies"
          placeholder="Search through 300+ movies online"
          id="search"
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)}
        />
      </label>
    </div>
  );
}

export default Search;
