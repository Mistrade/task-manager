import { ContactsContainer, ContactsLayout } from './Contacts.styled';
import { AddContact } from './AddConctact/AddContact';
import { UserModel } from '@api/session-api/session-api.types';
import { FC, useCallback, useState } from 'react';
import { Heading } from '@components/Text/Heading';
import { ContactBlock } from './AddConctact/AddContact.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Switcher } from '@components/Switcher/Switcher';
import styled from 'styled-components';
import { Routes } from 'react-router-dom';
import { Navigate, Route, useLocation } from 'react-router';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { CONTACT_TYPES, useGetContactsListQuery } from '@api/friends-api';
import { ContactsList } from './Render/ContactsList';
import { Loader } from '@components/Loaders/Loader';

export interface ContactsProps {
  userInfo: UserModel;
}

export const Subtitle = styled(Heading.H2)`
  padding-left: 24px;
  margin-bottom: 12px;
`;

const SwitcherList = [
  { title: 'Друзья', type: CONTACT_TYPES.FRIENDS },
  {
    title: 'Входящие заявки',
    type: CONTACT_TYPES.INCOMING,
  },
  { title: 'Исходящие заявки', type: CONTACT_TYPES.OUTGOING },
];

const getInitialLocation = (path: string): CONTACT_TYPES => {
  const pathArr = path.split('/');
  const item = pathArr[2] as CONTACT_TYPES | undefined;
  console.log(item);
  return item || CONTACT_TYPES.FRIENDS;
};

export const Contacts: FC<ContactsProps> = ({ userInfo }) => {
  const navigate = useSearchNavigate();
  const location = useLocation();

  const [switchItem, setSwitchItem] = useState<CONTACT_TYPES>(() =>
    getInitialLocation(location.pathname)
  );

  const changeSwitch = useCallback(
    (type: CONTACT_TYPES) => {
      setSwitchItem(type);
      navigate('/contacts/' + type);
    },
    [setSwitchItem]
  );
  const { data, isFetching } = useGetContactsListQuery(switchItem, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <ContactsContainer>
      <ContactsLayout>
        <AddContact />
        <FlexBlock mt={24}>
          <Subtitle>Список контактов</Subtitle>
        </FlexBlock>
        <ContactBlock direction={'column'} overflow={'hidden'} pt={12}>
          <ScrollVerticalView
            placementStatic={'top'}
            staticContent={
              <FlexBlock pl={24} pr={24}>
                <Switcher
                  switchersList={SwitcherList}
                  onClick={(item) => changeSwitch(item.type)}
                  selected={switchItem}
                />
              </FlexBlock>
            }
            gap={12}
            renderPattern={'top-bottom'}
          >
            <FlexBlock
              direction={'column'}
              height={'100%'}
              gap={12}
              pl={24}
              pr={24}
              pb={24}
            >
              <Loader
                isActive={isFetching}
                title={'Загружаем актуальные данные...'}
              >
                <Routes>
                  <Route
                    index
                    element={
                      <Navigate to={'/contacts/' + CONTACT_TYPES.FRIENDS} />
                    }
                  />
                  <Route
                    path={CONTACT_TYPES.FRIENDS}
                    element={
                      <ContactsList
                        listType={CONTACT_TYPES.FRIENDS}
                        list={data?.data || []}
                        emptyError={
                          <ErrorScreen
                            title={'Вы пока не добавили друзей'}
                            errorType={'BAD_REQUEST'}
                            description={
                              'Воспользуйтесь формой выше, чтобы найти и добавить новых друзей.'
                            }
                          />
                        }
                      />
                    }
                  />
                  <Route
                    path={CONTACT_TYPES.INCOMING}
                    element={
                      <ContactsList
                        listType={CONTACT_TYPES.INCOMING}
                        list={data?.data || []}
                        emptyError={
                          <ErrorScreen
                            title={'Здесь пока пусто...'}
                            errorType={'BAD_REQUEST'}
                            description={
                              'Заявки в друзья, отправленные вам от других пользователей сервиса будут отображаться здесь.'
                            }
                          />
                        }
                      />
                    }
                  />
                  <Route
                    path={CONTACT_TYPES.OUTGOING}
                    element={
                      <ContactsList
                        listType={CONTACT_TYPES.OUTGOING}
                        list={data?.data || []}
                        emptyError={
                          <ErrorScreen
                            title={'Здесь пока пусто...'}
                            errorType={'BAD_REQUEST'}
                            description={
                              'Заявки в друзья, отправленные вами другим пользователям сервиса будут отображаться здесь.'
                            }
                          />
                        }
                      />
                    }
                  />
                  <Route
                    path={'*'}
                    element={
                      <FlexBlock
                        width={'100%'}
                        height={'100%'}
                        justify={'center'}
                        align={'center'}
                      >
                        <ErrorScreen
                          title={'Не удалось найти запрашиваемый ресурс'}
                          errorType={'BAD_REQUEST'}
                          description={
                            'Воспользуйтесь переключателями выше, чтобы перейти в нужный раздел'
                          }
                        />
                      </FlexBlock>
                    }
                  />
                </Routes>
              </Loader>
            </FlexBlock>
          </ScrollVerticalView>
        </ContactBlock>
      </ContactsLayout>
    </ContactsContainer>
  );
};
