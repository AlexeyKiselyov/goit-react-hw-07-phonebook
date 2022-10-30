import PropTypes from 'prop-types';
import { VscTrash, VscAccount } from 'react-icons/vsc';

import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contactsSelectors';
import { selectFilter } from 'redux/filter/filterSelectors';

import { Contact, Ul, Button } from './ContactList.styled';
// ===========================

export const ContactList = ({ onDeleteContact }) => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filterContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return contacts.length === 0 ? (
    <p>Your phonebook is empty</p>
  ) : (
    <Ul>
      {!filter
        ? contacts.map(({ name, number, id }) => (
            <Contact key={id} data-id={id}>
              <VscAccount size="15" />
              <p>
                {name}: {number}
              </p>
              <Button
                type="button"
                name="deleteBtn"
                onClick={e => onDeleteContact(e)}
              >
                Delete
                <VscTrash />
              </Button>
            </Contact>
          ))
        : filterContacts.map(({ name, number, id }) => (
            <Contact key={id} data-id={id}>
              <VscAccount />
              <span>
                {name}: {number}
              </span>
              <Button
                type="button"
                name="deleteBtn"
                onClick={e => onDeleteContact(e)}
              >
                Delete
                <VscTrash />
              </Button>
            </Contact>
          ))}
    </Ul>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};
