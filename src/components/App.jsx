import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Contact } from './Contact/Contact';

const SAVED_CONTACTS = 'saved_contacts';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(SAVED_CONTACTS);
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      if (parsedContacts.length > 0) {
        this.setState(() => ({
          contacts: parsedContacts,
        }));
      }
    }
  }

  componentDidUpdate() {
    localStorage.setItem(SAVED_CONTACTS, JSON.stringify(this.state.contacts));
  }

  getValue({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  createContact = (evt, name, number) => {
    evt.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.checkInContacts(contact.name))
      return alert(`${contact.name} is already in contacts`);
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
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== key
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    return (
      <>
        <Section title={'Phonebook'}>
          <ContactForm
            createContact={this.createContact}
            getValue={this.getValue}
          ></ContactForm>
        </Section>
        {this.state.contacts.length > 0 && (
          <Section title={'Contacts'}>
            <Filter
              getValue={this.getValue.bind(this)}
              setValue={this.state}
            ></Filter>
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
