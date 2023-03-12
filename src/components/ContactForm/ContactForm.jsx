import './ContactForm.module.css';

export const ContactForm = ({
  handleCreateContact,
  getContactName,
  typedName,
}) => {
  return (
    <form onSubmit={handleCreateContact}>
      <label>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={getContactName}
          value={typedName}
        />
      </label>
      <button type="submit">Add to contact</button>
    </form>
  );
};
