import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {Input, Button,Text} from './ContactForm.styled';
import { useState } from 'react';

export const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
      case 'name':
        setName(value);
        break;
      
      case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }};

    const handleSubmit = e => {
        e.preventDefault();

        const id = nanoid();
        onSubmit({ name, number, id });
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <Text>Name</Text>
                <Input
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                />
            </label>

            <label>
                <Text>Number</Text>
                <Input
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                    />
            </label>
                
            <Button type="submit">Add contact</Button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};