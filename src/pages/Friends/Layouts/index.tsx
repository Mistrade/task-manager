import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import {
  ERROR_DESCRIPTIONS,
  ERROR_TITLES,
  ERROR_TYPES,
  FRIENDS_ROUTES,
} from '@src/common/constants/enums';

import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FiltersIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';

import { SendFriendRequestForm } from '@pages/Friends/Add/SendFriendRequestForm';
import { FriendsList } from '@pages/Friends/Tabs/FriendsList';
import { IncomingRequestList } from '@pages/Friends/Tabs/Requests/IncomingRequestsList';
import { OutgoingRequestList } from '@pages/Friends/Tabs/Requests/OutgoingRequestList';

import { PlannerLayoutContainer } from '@planner/Planner.styled';

export const FriendsLayouts = () => {
  return (
    <PlannerLayoutContainer>
      <FlexBlock width={'100%'} height={'100%'} direction={'column'}>
        <VerticalScroll
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
            <Route index element={<FriendsList />} />
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
                    title={ERROR_TITLES.NOT_FOUND_URL}
                    errorType={ERROR_TYPES.ERR_FORBIDDEN}
                    description={ERROR_DESCRIPTIONS.NAVIGATION_LEFT}
                  />
                </CenteredContainer>
              }
            />
          </Routes>
        </VerticalScroll>
      </FlexBlock>
    </PlannerLayoutContainer>
  );
};
