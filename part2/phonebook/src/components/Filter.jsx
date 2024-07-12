const Filter = ({ search, onChange }) => {
  const searchFunction = (
    <input value={search} onChange={(e) => onChange(e.target.value)} />
  );

  return <div>filter shown with {searchFunction}</div>;
};

export default Filter;
