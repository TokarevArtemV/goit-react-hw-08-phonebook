import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setTokenContactsInstance = token =>
  (contactsInstance.defaults.headers.common.Authorization = `Bearer ${token}`);

export const clearTokenContactsInstance = () =>
  (contactsInstance.defaults.headers.common.Authorization = '');

export const getContacts = async () => {
  const contacts = await contactsInstance.get('/contacts');

  return contacts;
};

export const postContact = async dataContacts => {
  const contact = await contactsInstance.post('/contacts', dataContacts);

  return contact;
};

export const delContact = async contactId => {
  const contact = await contactsInstance.delete(`/contacts/${contactId}`);

  return contact;
};
