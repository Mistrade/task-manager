import React, { FC, useContext, useEffect, useMemo } from 'react';
import { FlexBlock } from '../FlexBlock';
import { MainHeaderUserInfo } from './MainHeaderUserInfo';
import { HeaderLinkStyled } from './HeaderLink.styled.';
import { useLocation } from 'react-router';
import { NavigationContainer } from './MainHeader.styled';
import { useAppSelector } from '../../../store/hooks/hooks';
import { EmptyButtonStyled } from '../../Buttons/EmptyButton.styled';
import { AppLogoIcon } from '../../Icons/AppIcon/AppLogoIcon';
import { toast } from 'react-toastify';
import { Heading } from '../../Text/Heading';
import { currentColor } from '../../../common/constants';
import { UserInfoContext } from '../../../Context/userInfo.context';
import { ServicesNames } from '../../../store/reducers/global';

interface NavigationArrayItem {
  title: string;
  path: string;
  serviceName: ServicesNames;
}

const PageHeaderArray = [
  { urlStartWith: '/planner', title: 'Мой календарь | Планирование' },
  { urlStartWith: '/contacts', title: 'Мои Контакты' },
];

export const MainHeaderBody: FC = () => {
  const { pathname } = useLocation();
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

  useEffect(() => {
    const urlEl = PageHeaderArray.find((urlItem) => {
      return pathname
        .toLowerCase()
        .startsWith(urlItem.urlStartWith.toLowerCase());
    });

    document.title = urlEl ? urlEl.title : 'Онлайн планировщик дел';
  }, [pathname]);

  return (
    <>
      <FlexBlock
        width={'100%'}
        align={'center'}
        flex={'1 0  auto'}
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
          <NavigationContainer>
            {NavigationArray.map((nav) => (
              <HeaderLinkStyled
                key={nav.path}
                to={nav.path}
                title={nav.title}
                isSelected={nav.serviceName === serviceName}
              >
                {nav.title}
              </HeaderLinkStyled>
            ))}
          </NavigationContainer>
        </FlexBlock>
        <FlexBlock flex={'1 0 20%'}>
          <MainHeaderUserInfo />
        </FlexBlock>
      </FlexBlock>
    </>
  );
};
