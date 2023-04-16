import { ServicesNames } from '@redux/reducers/global';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { FRIENDS_ROUTES } from '@src/common/constants';

import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FiltersIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { SendFriendRequestForm } from '@pages/Friends/AddConctact/SendFriendRequestForm';
import { FriendsList } from '@pages/Friends/Tabs/FriendsList';
import { FriendRequestList } from '@pages/Friends/Tabs/Requests/FriendRequestList';

import { PlannerLayoutContainer } from '@planner/Planner.styled';

import { FRIEND_REQUESTS_TYPES } from '@api/friends-api';


export const FriendsLayouts = () => {
  return (
    <PlannerLayoutContainer>
      <FlexBlock width={'100%'} height={'100%'} direction={'column'}>
        <ScrollVerticalView
          staticContent={
            <FlexBlock gap={12}>
              <SendFriendRequestForm />
              <EmptyButtonStyled>
                <FiltersIcon size={24} />
                Фильтры
              </EmptyButtonStyled>
            </FlexBlock>
          }
          placementStatic={'top'}
          renderPattern={'top-bottom'}
        >
          <Routes>
            <Route
              index
              element={
                <Navigate
                  to={`/${ServicesNames.FRIENDS}/${FRIENDS_ROUTES.FRIENDS_LIST}`}
                />
              }
            />
            <Route
              path={FRIENDS_ROUTES.FRIENDS_LIST}
              element={<FriendsList />}
            />
            <Route
              path={FRIENDS_ROUTES.OUTGOING_REQUESTS}
              element={
                <FriendRequestList
                  requestType={FRIEND_REQUESTS_TYPES.OUTGOING}
                />
              }
            />
            <Route
              path={FRIENDS_ROUTES.INCOMING_REQUESTS}
              element={
                <FriendRequestList
                  requestType={FRIEND_REQUESTS_TYPES.INCOMING}
                />
              }
            />
            <Route
              path={'*'}
              element={
                <CenteredContainer>
                  <ErrorScreen
                    title={'Неизвестный URL-адрес'}
                    errorType={'ERR_FORBIDDEN'}
                    description={
                      'Воспользуйтесь навигацией слева, для перехода в нужный раздел'
                    }
                  />
                </CenteredContainer>
              }
            />
          </Routes>
        </ScrollVerticalView>
      </FlexBlock>
    </PlannerLayoutContainer>
  );
};