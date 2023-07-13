import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@selectors/session-selectors';
import { Tooltip } from 'chernikov-kit';
import { FC, useState } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';
import { PageHeaderUserActions } from '@components/LayoutComponents/PageHeader/UserActions';
import { UserAvatar } from '@components/Users/UserAvatar';

import { HeaderDefaultLink } from './Link.styled.';

export const MainHeaderUserInfo: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const [isOpen, setIsOpen] = useState(false);

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
          <Tooltip
            visible={isOpen}
            theme={'light'}
            delay={[100, 200]}
            interactive={true}
            interactiveBorder={20}
            placement={'bottom-end'}
            arrow={false}
            content={
              isOpen && (
                <PageHeaderUserActions afterSelect={() => setIsOpen(false)} />
              )
            }
            onClickOutside={() => setIsOpen(false)}
          >
            <EmptyButtonStyled onClick={() => setIsOpen((prev) => !prev)}>
              <UserAvatar user={userInfo} size={42} />
            </EmptyButtonStyled>
          </Tooltip>
        </FlexBlock>
      )}
    </FlexBlock>
  );
};
