import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts;
export const selectContactById = state => state.contacts.contactById;
export const selectFilter = state => state.filter.filter;
export const selectStatus = state => state.contacts.status;
export const selectError = state => state.contacts.error;
export const selectLocation = state => state.contacts.location;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
