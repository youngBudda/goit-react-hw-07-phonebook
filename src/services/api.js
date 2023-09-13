import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://65021124736d26322f5cb458.mockapi.io',
});

export const fetchContacts = async () => {
  const { data } = await instance.get('/contacts');
  return data;
};

export const addContact = async contact => {
  const { data } = await instance.post('/contacts', contact);
  return data;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/contacts/${id}`);
  return data;
};
