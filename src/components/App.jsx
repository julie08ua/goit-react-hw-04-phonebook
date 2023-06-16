import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

const STORAGE_KEY = 'contacts';

export const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const savedContactsState = localStorage.getItem(STORAGE_KEY);

        if (savedContactsState !== null) {
            setContacts(JSON.parse(savedContactsState));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    const formSubmit = data => {
        const checkName = contacts.find(
                ({name}) => name.toLowerCase() === data.name.toLowerCase()
        )
        
        if (checkName) {
            alert(`${data.name} is already in contacts.`);
        } else {
            setContacts( [...contacts, data] );
          }
    };

    const deleteContact = id => {
        setContacts(contacts.filter(contact => contact.id !== id),
        );
    };

    const changeFilter = ({target}) => {
        setFilter( target.value );
    };

    const visibleContact = contacts.filter(({name}) =>
        name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <section>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={formSubmit} />

            <h2>Contacts:</h2>
            <Filter value={filter} changeFilter={changeFilter} />
            {contacts.length > 0 && (
                <ContactsList
                    contacts={visibleContact}
                    deleteContact={deleteContact}
                />
            )}
        </section>
    );
}