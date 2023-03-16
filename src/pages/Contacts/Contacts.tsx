import { ContactsContainer, ContactsLayout } from './Contacts.styled';
import { AddContact } from './AddConctact/AddContact';
import { UserModel } from '../../store/api/session-api/session-api.types';
import { FC } from 'react';

export interface ContactsProps {
  userInfo: UserModel;
}

export const Contacts: FC<ContactsProps> = ({ userInfo }) => {
  return (
    <ContactsContainer>
      <ContactsLayout>
        <AddContact />
      </ContactsLayout>
    </ContactsContainer>
  );
};
