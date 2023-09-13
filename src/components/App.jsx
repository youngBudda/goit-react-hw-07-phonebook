import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setFilter } from 'redux/Slice';
import {
  addContactThunk,
  deleteContactThunk,
  getContactsThunk,
} from 'redux/operation';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectFilteredContacts,
  selectLoading,
} from 'redux/selector';

import Form from '../components/Form/Form';
import ContactList from '../components/ContactList/ContactList';
import Section from '../components/Section/Section';
import Filter from '../components/Filter/Filter';
import Loader from '../components/Loader/Loader';
import Notification from './Notification/Notification';

export function App() {
  const items = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const filterValue = useSelector(selectFilter);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
    //     .unwrap().catch((error)=>{
    // toast.error(error.message);
    // })
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;
    toast.info(error);
  }, [error]);

  const onDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  const onAddContact = contactData => {
    const checkedContact = items.find(
      contact => contactData.name === contact.name
    );
    if (checkedContact) {
      toast.info(`${contactData.name} is already in your contacts`);
      return;
    } else {
      dispatch(addContactThunk(contactData));
    }
  };

  const onFilter = filterData => {
    dispatch(setFilter(filterData));
  };

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <Section>
      <h1>
        <span>☎︎ </span>Phonebook
      </h1>
      <Form onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={onFilter} filter={filterValue} />
      {isLoading && <Loader />}
      {items.length > 0 && !isLoading && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      )}
      <Notification />
    </Section>
  );
}
