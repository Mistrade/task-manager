import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@selectors/session-selectors';
import { memo } from 'react';

import { LinkStyled } from '@components/Buttons/Link.styled';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';

import { useLogoutMutation } from '@api/session-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

export const PageHeaderUserActions = memo<{ afterSelect?: () => void }>(
  ({ afterSelect }) => {
    const userInfo = useAppSelector(selectUserInfo);
    const [logoutUser] = useLogoutMutation();

    const afterHandler = () => {
      afterSelect && afterSelect();
    };

    const toProfile = () => {
      afterHandler();
    };

    const logoutHandler = async () => {
      afterHandler();
      await logoutUser()
        .unwrap()
        .then(thenHandleForToast)
        .catch(CatchHandleForToast);
    };

    return (
      <SelectListContainer>
        <LinkStyled to={`/profile/${userInfo?._id}`} target={'_blank'}>
          <SelectItemContainer onClick={toProfile}>Профиль</SelectItemContainer>
        </LinkStyled>
        <LinkStyled to={`/profile/${userInfo?._id}/tariff`} target={'_blank'}>
          <SelectItemContainer>Тарифный план</SelectItemContainer>
        </LinkStyled>
        <LinkStyled to={`/profile/${userInfo?._id}/settings`} target={'_blank'}>
          <SelectItemContainer>Настройки</SelectItemContainer>
        </LinkStyled>
        <LinkStyled to={`/profile/${userInfo?._id}/invite`} target={'_blank'}>
          <SelectItemContainer>Пригласить пользователя</SelectItemContainer>
        </LinkStyled>
        <SelectItemContainer onClick={logoutHandler}>
          Выход из системы
        </SelectItemContainer>
      </SelectListContainer>
    );
  }
);
