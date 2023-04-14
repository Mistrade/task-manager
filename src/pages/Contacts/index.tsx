import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import {
  PlannerContainer,
  PlannerContentContainer,
  PlannerLayoutContainer,
  PlannerNavLink,
  PlannerOptionPanelContainer,
} from '@planner/Planner.styled';
import { ServicesNames } from '@redux/reducers/global';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

export enum FRIENDS_ROUTES {
  'FRIENDS_LIST' = 'my_friends',
  'OUTGOING_REQUESTS' = 'outgoing',
  'INCOMING_REQUESTS' = 'incoming',
}

export const FRIENDS_ROUTES_PAGE_NAMES: { [key in FRIENDS_ROUTES]: string } = {
  my_friends: 'Список друзей',
  outgoing: 'Исходящие заявки',
  incoming: 'Входящие заявки',
};

export const FriendsPage = () => {
  return (
    <PlannerContainer>
      <PlannerContentContainer>
        <PlannerOptionPanelContainer>
          <FlexBlock direction={'column'} gap={8}>
            {Object.values(FRIENDS_ROUTES).map((item) => (
              <PlannerNavLink
                key={item}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                }}
                to={item}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {FRIENDS_ROUTES_PAGE_NAMES[item]}
              </PlannerNavLink>
            ))}
          </FlexBlock>
        </PlannerOptionPanelContainer>
        <PlannerLayoutContainer>
          <Routes>
            <Route
              index
              element={
                <Navigate
                  to={`/${ServicesNames.FRIENDS}/${FRIENDS_ROUTES.FRIENDS_LIST}`}
                />
              }
            />
            <Route path={FRIENDS_ROUTES.FRIENDS_LIST} element={'Друзья'} />
            <Route
              path={FRIENDS_ROUTES.OUTGOING_REQUESTS}
              element={'Исходящие заявки'}
            />
            <Route
              path={FRIENDS_ROUTES.INCOMING_REQUESTS}
              element={'Входящие заявки'}
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
        </PlannerLayoutContainer>
      </PlannerContentContainer>
    </PlannerContainer>
  );
};
