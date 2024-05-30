interface SearchFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm(props: SearchFormProps) {
  return (
    <form onSubmit={props.onSubmit} id="search-form" className="p-4 w-full">
      <input
        id="album-search-input"
        type="text"
        className="w-full p-2 border border-slate-400"
        placeholder="Search for an album cover"
        required
      />
      <button type="submit" className="bg-gray-800 text-white p-2 w-full mt-2">
        Search
      </button>
    </form>
  );
}
