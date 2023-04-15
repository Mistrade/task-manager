import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { AppLogoIcon } from '@components/Icons/AppIcon/AppLogoIcon';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';
import {
  PlannerContentContainer,
  PlannerLayoutContainer,
  PlannerOptionPanelContainer,
} from '@planner/Planner.styled';
import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { selectUserInfo } from '@redux/reducers/session/session-selectors';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { currentColor } from '@src/common/constants';
import React, { FC, useMemo } from 'react';
import { toast } from 'react-toastify';
import { HeaderLinkStyled } from './HeaderLink.styled.';
import { NavigationContainer } from './MainHeader.styled';
import { MainHeaderUserInfo } from './MainHeaderUserInfo';

interface NavigationArrayItem {
  title: string;
  path: string;
  serviceName: ServicesNames;
}

const Nav = React.memo(
  () => {
    const userInfo = useAppSelector(selectUserInfo);
    const layout = useAppSelector(plannerSelectLayout);
    const status = useAppSelector(plannerSelectStatus);

    const NavigationArray: Array<NavigationArrayItem> = useMemo(
      () => [
        {
          title: 'Мои дела',
          path: userInfo
            ? `/${ServicesNames.PLANNER}/${layout}/${status}`
            : `/${ServicesNames.PLANNER}`,
          serviceName: ServicesNames.PLANNER,
        },
        {
          title: 'Мои контакты',
          path: `/${ServicesNames.FRIENDS}`,
          serviceName: ServicesNames.FRIENDS,
        },
      ],
      [layout, status]
    );

    return (
      <NavigationContainer>
        {NavigationArray.map((nav) => (
          <HeaderLinkStyled
            className={({ isActive }) => (isActive ? 'active' : '')}
            key={nav.path}
            to={nav.path}
            title={nav.title}
          >
            {nav.title}
          </HeaderLinkStyled>
        ))}
      </NavigationContainer>
    );
  },
  () => true
);

export const MainHeaderBody: FC = React.memo(
  () => {
    return (
      <FlexBlock
        height={'100%'}
        width={'100%'}
        align={'center'}
        flex={'1 0 auto'}
        direction={'row'}
        justify={'flex-start'}
      >
        <PlannerContentContainer style={{ padding: 0 }}>
          <PlannerOptionPanelContainer style={{ justifyContent: 'center' }}>
            <EmptyButtonStyled
              onClick={() =>
                toast('Добро пожаловать в Онлайн Планировщик дел!')
              }
            >
              <AppLogoIcon size={30} />
              <Heading.H1 style={{ color: currentColor, fontSize: 16 }}>
                White Planner{' '}
                <CutText
                  fontSize={16}
                  style={{ fontStyle: 'normal', fontWeight: 'normal' }}
                >
                  (Beta version)
                </CutText>
              </Heading.H1>
            </EmptyButtonStyled>
          </PlannerOptionPanelContainer>
          <PlannerLayoutContainer>
            <FlexBlock flex={'1 0 70%'}>
              <Nav />
            </FlexBlock>
            <FlexBlock flex={'1 0 30%'}>
              <MainHeaderUserInfo />
            </FlexBlock>
          </PlannerLayoutContainer>
        </PlannerContentContainer>
      </FlexBlock>
    );
  },
  () => true
);
