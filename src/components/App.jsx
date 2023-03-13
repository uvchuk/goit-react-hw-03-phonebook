import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Contact } from './Contact/Contact';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  getValue = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  createContact = (evt, name, number) => {
    evt.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.checkInContacts(contact.name))
      return alert(`${contact.name} is already in contacts`);
    // this.state.contacts.push(contact);
    // this.forceUpdate();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  checkInContacts = name => {
    return this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  filteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  removeContact = key => {
    // this.state.contacts.find((contact, index) => {
    //   if (contact.id === key) this.state.contacts.splice(index, 1);
    // });
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== key
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    return (
      <>
        <Section title={'Phonebook'}>
          <ContactForm createContact={this.createContact}></ContactForm>
        </Section>
        {this.state.contacts.length > 0 && (
          <Section title={'Contacts'}>
            <Filter getValue={this.getValue} setValue={this.state}></Filter>
            <ContactList>
              <Contact
                contacts={
                  this.state.filter === ''
                    ? this.state.contacts
                    : this.filteredContacts()
                }
                removeContact={this.removeContact}
              ></Contact>
            </ContactList>
          </Section>
        )}
      </>
    );
  }
}

export default PhoneBook;
