export const Filter = ({ getValue, setValue }) => {
  return (
    <label>
      <p>Find contacts by name</p>
      <input
        name="filter"
        type="text"
        onChange={getValue}
        value={setValue.filter}
      />
    </label>
  );
};
