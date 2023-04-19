import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@selectors/session-selectors';
import { FC } from 'react';
import { css } from 'styled-components';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LogoutIcon } from '@components/Icons/Session/LogoutIcon';
import { FlexBlock } from '@components/LayoutComponents';

import { useLogoutMutation } from '@api/session-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { HeaderDefaultLink } from './Link.styled.';

export const MainHeaderUserInfo: FC = () => {
  const [logoutUser] = useLogoutMutation();
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <FlexBlock width={'100%'} justify={'flex-end'}>
      {!userInfo ? (
        <FlexBlock gap={12}>
          <HeaderDefaultLink to={'/session/login'}>
            Вход в систему
          </HeaderDefaultLink>
          <HeaderDefaultLink to={'/session/registration'}>
            Регистрация
          </HeaderDefaultLink>
        </FlexBlock>
      ) : (
        <FlexBlock align={'center'} gap={12}>
          <FlexBlock>
            {userInfo.name + ' ' + (userInfo.surname || '')}
          </FlexBlock>
          <EmptyButtonStyled>
            <LogoutIcon
              size={36}
              additionalCss={css`
                cursor: pointer;
              `}
              onClick={async () =>
                await logoutUser()
                  .unwrap()
                  .then(thenHandleForToast)
                  .catch(CatchHandleForToast)
              }
            >
              Выход
            </LogoutIcon>
          </EmptyButtonStyled>
        </FlexBlock>
      )}
    </FlexBlock>
  );
};
