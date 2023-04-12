import { FC, useContext } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { HeaderDefaultLink } from './HeaderLink.styled.';
import { useLogoutMutation } from '@api/session-api';
import { LogoutIcon } from '@components/Icons/Session/LogoutIcon';
import { css } from 'styled-components';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { useRefetchPlanningApiMutation } from '@api/planning-api';
import { UserInfoContext } from '@src/Context/userInfo.context';

export const MainHeaderUserInfo: FC = () => {
  const [logoutUser] = useLogoutMutation();
  const [refetchTaskApi] = useRefetchPlanningApiMutation();
  const userInfo = useContext(UserInfoContext);

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
                await logoutUser().then(() => {
                  refetchTaskApi('');
                  // navigate('/session/login', { replace: true });
                })
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
