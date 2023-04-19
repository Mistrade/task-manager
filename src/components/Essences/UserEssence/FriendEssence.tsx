import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { FC } from 'react';

import { FRIEND_REQUEST_ACCEPT_STATUSES } from '@src/common/constants/enums';

import { Button } from '@components/Buttons/Buttons.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';
import { CalendarUserIndicator } from '@components/Users/UserIndicator';

import { IFriendModel } from '@api/friends-api/friends-api.types';
import { ObjectId } from '@api/rtk-api.types';

import { EssenceContainer } from '../EventEssence/event-essence.styled';

export interface FriendEssenceProps {
  friendModel: IFriendModel;
  onAccept?: (
    status: FRIEND_REQUEST_ACCEPT_STATUSES,
    _id: ObjectId
  ) => Promise<void>;
  onDecline?: (
    status: FRIEND_REQUEST_ACCEPT_STATUSES,
    _id: ObjectId
  ) => Promise<void>;
  onRemove?: () => Promise<void>;
}

//TODO DELETE
export const FriendEssence: FC<FriendEssenceProps> = ({
  friendModel,
  onRemove,
  onDecline,
  onAccept,
}) => {
  const navigate = useSearchNavigate();

  //TODO раздробить верстку на мелкие компоненты
  return (
    <EssenceContainer>
      <FlexBlock gap={6} direction={'row'} align={'center'} width={'100%'}>
        <FlexBlock grow={3}>
          <CalendarUserIndicator
            id={friendModel.userInfo._id}
            name={friendModel.userInfo.name}
            surname={friendModel.userInfo.surname}
            onClick={(id) => navigate(`/profile/${id}`)}
          />
        </FlexBlock>
        <FlexBlock
          direction={'row'}
          gap={6}
          style={{ justifySelf: 'flex-end' }}
        >
          {onAccept && (
            <Button
              onClick={() =>
                onAccept &&
                onAccept(
                  FRIEND_REQUEST_ACCEPT_STATUSES.ACCEPTED,
                  friendModel._id
                )
              }
            >
              Принять
            </Button>
          )}
          {onDecline && (
            <EmptyButtonStyled
              onClick={() =>
                onDecline &&
                onDecline(
                  FRIEND_REQUEST_ACCEPT_STATUSES.DECLINE,
                  friendModel._id
                )
              }
            >
              Отклонить
            </EmptyButtonStyled>
          )}
          {onRemove && (
            <>
              <EmptyButtonStyled onClick={() => onRemove && onRemove()}>
                Удалить
              </EmptyButtonStyled>
            </>
          )}
        </FlexBlock>
      </FlexBlock>
    </EssenceContainer>
  );
};
