import { selectFilter } from 'redux/filter/filterSelectors';

export const selectContacts = state => state.contacts.contacts;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectFilterContacts = () => {
  return selectContacts.filter(({ name }) =>
    name.toLowerCase().includes(selectFilter.toLowerCase())
  );
};
