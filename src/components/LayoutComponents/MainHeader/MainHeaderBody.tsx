import React, { FC, useContext, useMemo } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { MainHeaderUserInfo } from './MainHeaderUserInfo';
import { HeaderLinkStyled } from './HeaderLink.styled.';
import { NavigationContainer } from './MainHeader.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { AppLogoIcon } from '@components/Icons/AppIcon/AppLogoIcon';
import { toast } from 'react-toastify';
import { Heading } from '@components/Text/Heading';
import { currentColor } from '@src/common/constants';
import { UserInfoContext } from '@src/Context/userInfo.context';
import { ServicesNames } from '@redux/reducers/global';
import { useAppSelector } from '@redux/hooks/hooks';

interface NavigationArrayItem {
  title: string;
  path: string;
  serviceName: ServicesNames;
}

const Nav = React.memo(
  () => {
    const userInfo = useContext(UserInfoContext);
    const { serviceName } = useAppSelector((state) => state.global);

    const NavigationArray: Array<NavigationArrayItem> = useMemo(
      () => [
        {
          title: 'Мои дела',
          path: userInfo
            ? `/${ServicesNames.PLANNER}/day/all`
            : `/${ServicesNames.PLANNER}`,
          serviceName: ServicesNames.PLANNER,
        },
        {
          title: 'Мои контакты',
          path: `/${ServicesNames.FRIENDS}`,
          serviceName: ServicesNames.FRIENDS,
        },
      ],
      []
    );

    return (
      <NavigationContainer>
        {NavigationArray.map((nav) => (
          <HeaderLinkStyled
            key={nav.path}
            to={nav.path}
            title={nav.title}
            selected={nav.serviceName === serviceName}
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
        <FlexBlock
          flex={'1 0 20%'}
          justify={'flex-start'}
          align={'center'}
          gap={8}
        >
          <EmptyButtonStyled
            onClick={() => toast('Добро пожаловать в Онлайн Планировщик дел!')}
          >
            <AppLogoIcon size={30} />
            <Heading.H2 style={{ color: currentColor, fontSize: 16 }}>
              Онлайн Планировщик
            </Heading.H2>
          </EmptyButtonStyled>
        </FlexBlock>
        <FlexBlock flex={'1 0 60%'}>
          <Nav />
        </FlexBlock>
        <FlexBlock flex={'1 0 20%'}>
          <MainHeaderUserInfo />
        </FlexBlock>
      </FlexBlock>
    );
  },
  () => true
);
