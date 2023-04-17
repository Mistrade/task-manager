import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { FRIENDS_ROUTES, SERVICES_NAMES } from '@src/common/constants';

import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FiltersIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { SendFriendRequestForm } from '@pages/Friends/AddConctact/SendFriendRequestForm';
import { FriendsList } from '@pages/Friends/Tabs/FriendsList';
import { IncomingRequestList } from '@pages/Friends/Tabs/Requests/IncomingRequestsList';
import { OutgoingRequestList } from '@pages/Friends/Tabs/Requests/OutgoingRequestList';

import { PlannerLayoutContainer } from '@planner/Planner.styled';

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
                  to={`/${SERVICES_NAMES.FRIENDS}/${FRIENDS_ROUTES.FRIENDS_LIST}`}
                />
              }
            />
            <Route
              path={FRIENDS_ROUTES.FRIENDS_LIST}
              element={<FriendsList />}
            />
            <Route
              path={FRIENDS_ROUTES.OUTGOING_REQUESTS}
              element={<OutgoingRequestList />}
            />
            <Route
              path={FRIENDS_ROUTES.INCOMING_REQUESTS}
              element={<IncomingRequestList />}
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
