import { nanoid } from 'nanoid';
import { Phonebook } from '../components/Phonebook/Phonebook';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import { Section } from '../components/Section/Section';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/contactsSelectors';
// import { addContact, deleteContact } from 'redux/contacts/contactsSlice';
import { updateFilter } from 'redux/filter/filterSlice';
import {
  addContacts,
  deleteContacts,
  fetchContacts,
} from 'redux/contacts/contactsOperations';

import { Box } from '../components/Box';
import { useEffect } from 'react';
import { Loader } from './Loader/Loader';
// ==============================

export const App = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContact = newUser => {
    const uniqUserSearch = contacts.find(({ name }) => name === newUser.name);
    uniqUserSearch
      ? alert(`${uniqUserSearch.name} is already in contacts`)
      : dispatch(addContacts({ ...newUser, id: nanoid() }));
  };

  const onDeleteContact = e => {
    const deleteById = e.target.closest('li[data-id]').dataset.id;
    dispatch(deleteContacts(deleteById));
  };

  const onChangeFilter = e => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <Box
      bg="background"
      my={6}
      mx="auto"
      py={5}
      px={6}
      maxWidth="500px"
      borderRadius="normal"
      border="normal"
    >
      <Section title="Phonebook">
        <Phonebook onAddContact={onAddContact} />
        {error && <p>{error}</p>}
      </Section>

      <Section title="Contacts">
        <Filter onChangeFilter={onChangeFilter} />
        <ContactList onDeleteContact={onDeleteContact} />
      </Section>
      {isLoading && <Loader />}
    </Box>
  );
};
