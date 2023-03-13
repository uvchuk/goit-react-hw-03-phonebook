import { Component } from 'react';
import './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  getValue = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  resetStateValues = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form
        onSubmit={evt => {
          this.props.createContact(evt, this.state.name, this.state.number);
          this.resetStateValues();
        }}
      >
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.getValue}
            value={this.state.name}
          />
        </label>
        <label>
          <p>Number</p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.getValue}
            value={this.state.number}
          />
        </label>
        <button type="submit">Add to contact</button>
      </form>
    );
  }
}
