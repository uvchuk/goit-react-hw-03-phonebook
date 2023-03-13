export const Contact = ({ contacts, removeContact }) => {
  return contacts.map(({ id, name, number }) => (
    <li key={id}>
      <span>
        {name}: {number}
      </span>
      <button
        onClick={() => {
          removeContact(id);
        }}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
};
