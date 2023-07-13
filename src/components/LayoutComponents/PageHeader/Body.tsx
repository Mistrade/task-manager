import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import React, { FC, useMemo } from 'react';
import { toast } from 'react-toastify';

import { currentColor } from '@src/common/constants/constants';
import { SERVICES_TITLES } from '@src/common/constants/defaultConstants';
import { SERVICES_NAMES } from '@src/common/constants/enums';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { AppLogoIcon } from '@components/Icons/AppIcon/AppLogoIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';
import { CutText } from '@components/Text/Text';

import {
  PlannerContentContainer,
  PlannerLayoutContainer,
  PlannerOptionPanelContainer,
} from '@planner/styled';

import { HeaderLinkStyled } from './Link.styled.';
import { MainHeaderUserInfo } from './UserInfo';
import { NavigationContainer } from './index.styled';

interface NavigationArrayItem {
  title: string;
  path: string;
  serviceName: SERVICES_NAMES;
}

const Nav = React.memo(
  () => {
    const layout = useAppSelector(plannerSelectLayout);

    const NavigationArray: Array<NavigationArrayItem> = useMemo(
      () => [
        {
          title: SERVICES_TITLES.planner,
          path: `/${SERVICES_NAMES.PLANNER}/${layout}`,
          serviceName: SERVICES_NAMES.PLANNER,
        },
        {
          title: SERVICES_TITLES.friends,
          path: `/${SERVICES_NAMES.FRIENDS}`,
          serviceName: SERVICES_NAMES.FRIENDS,
        },
        {
          title: SERVICES_TITLES.faq,
          path: `/faq`,
          serviceName: SERVICES_NAMES.FAQ,
        },
      ],
      [layout]
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
