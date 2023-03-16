import { FC } from 'react';
import { FlexBlock } from '../FlexBlock';
import { HeaderDefaultLink } from './HeaderLink.styled.';
import { useLogoutMutation } from '../../../store/api/session-api';
import { LogoutIcon } from '../../Icons/Session/LogoutIcon';
import { css } from 'styled-components';
import { EmptyButtonStyled } from '../../Buttons/EmptyButton.styled';
import { useSearchNavigate } from '../../../hooks/useSearchNavigate';
import { useRefetchPlanningApiMutation } from '../../../store/api/planning-api';
import { UserModel } from '../../../store/api/session-api/session-api.types';

export interface MainHeaderUserInfoProps {
  userInfo?: UserModel | null;
}

export const MainHeaderUserInfo: FC<MainHeaderUserInfoProps> = ({
  userInfo,
}) => {
  const [logoutUser] = useLogoutMutation();
  const [refetchTaskApi] = useRefetchPlanningApiMutation();
  const navigate = useSearchNavigate();
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
                  navigate('/session/login', { replace: true });
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
