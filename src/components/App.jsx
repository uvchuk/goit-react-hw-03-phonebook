import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { nanoid } from 'nanoid';

class PhoneBook extends Component {
  state = {
    contacts: [],
    name: '',
  };

  getContactName = evt => {
    this.setState({
      name: evt.target.value,
    });
  };

  handleCreateContact = evt => {
    evt.preventDefault();
    const contact = {
      id: nanoid(),
      name: this.state.name,
    };
    this.state.contacts.push(contact);
    this.setState({
      name: '',
    });
  };

  render() {
    return (
      <>
        <Section title={'Phonebook'}>
          <ContactForm
            getContactName={this.getContactName}
            typedName={this.state.name}
            handleCreateContact={this.handleCreateContact}
          ></ContactForm>
        </Section>
        {this.state.contacts.length > 0 && (
          <Section title={'Contacts'}>
            <ContactList contacts={this.state.contacts}></ContactList>
          </Section>
        )}
      </>
    );
  }
}

export default PhoneBook;
