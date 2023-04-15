import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { CompleteIcon } from '@components/Icons/Icons';
import { TelegramLogoIcon } from '@components/Icons/SocialNetworkIcons/Telegram';
import { TwoPeopleIcon } from '@components/Icons/UserIcons/UserIcons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { FriendsList } from '@pages/Friends/Tabs/FriendsList';
import { LinkSolid } from '@planner/Header/ModeSwitch/Item';
import {
  PlannerContainer,
  PlannerContentContainer,
  PlannerLayoutContainer,
  PlannerOptionPanelContainer,
} from '@planner/Planner.styled';
import { ServicesNames } from '@redux/reducers/global';
import { currentColor } from '@src/common/constants';
import { getPath } from '@src/common/functions';
import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

export enum FRIENDS_ROUTES {
  'FRIENDS_LIST' = 'my_friends',
  'OUTGOING_REQUESTS' = 'outgoing',
  'INCOMING_REQUESTS' = 'incoming',
}

export const FRIENDS_ROUTES_PAGE_NAMES: {
  [key in FRIENDS_ROUTES]: {
    title: string;
    icon: ReactNode;
  };
} = {
  my_friends: { title: 'Список друзей', icon: <TwoPeopleIcon size={24} /> },
  outgoing: {
    title: 'Исходящие заявки',
    icon: <TelegramLogoIcon size={24} color={currentColor} />,
  },
  incoming: {
    title: 'Входящие заявки',
    icon: <CompleteIcon size={24} color={currentColor} />,
  },
};

export const FriendsPage = () => {
  return (
    <PlannerContainer>
      <PlannerContentContainer>
        <PlannerOptionPanelContainer>
          <FlexBlock direction={'column'} gap={8}>
            {Object.values(FRIENDS_ROUTES).map((item) => (
              <LinkSolid
                key={item}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                }}
                icon={FRIENDS_ROUTES_PAGE_NAMES[item].icon}
                title={FRIENDS_ROUTES_PAGE_NAMES[item].title}
                to={getPath(ServicesNames.FRIENDS, item)}
              />
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
            <Route
              path={FRIENDS_ROUTES.FRIENDS_LIST}
              element={<FriendsList />}
            />
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
