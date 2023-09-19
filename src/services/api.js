import axios from 'axios';

const API = axios.create({
  baseURL: 'https://65021124736d26322f5cb458.mockapi.io',
});

export const getContacts = async () => {
  const { data } = await API.get('/contacts');
  return data;
};

export const addContact = async contact => {
  const { data } = await API.post('/contacts', contact);
  return data;
};

export const deleteContact = async id => {
  const { data } = await API.delete(`/contacts/${id}`);
  return data;
};
