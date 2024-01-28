import axios from 'axios';

axios.defaults.baseURL = 'https://65aecb4d1dfbae409a758f43.mockapi.io';

export const getContacts = async () => {
  const contacts = await axios.get('/API/contacts');

  return contacts;
};

export const getContactById = async contactId => {
  const contacts = await axios.get(`/API/contacts/${contactId}`);

  return contacts;
};

export const postContact = async ({ name, phone, avatar, ...arg }) => {
  const contact = await axios.post('/API/contacts', {
    name,
    phone,
    avatar: !avatar ? 'https://i.ibb.co/2ShmK52/nobody.png' : avatar,
    ...arg,
  });

  return contact;
};

export const delContact = async contactId => {
  const contact = await axios.delete(`/API/contacts/${contactId}`);

  return contact;
};
