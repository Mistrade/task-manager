import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { FC } from 'react';

import { Button } from '@components/Buttons/Buttons.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { CalendarUserIndicator } from '@pages/planner/Users/UserIndicator';

import { ContactAcceptStatuses } from '@api/friends-api';
import { IFriendModel } from '@api/friends-api/friends-api.types';
import { ObjectId } from '@api/rtk-api.types';

import { EssenceContainer } from '../EventEssence/event-essence.styled';


export interface FriendEssenceProps {
  friendModel: IFriendModel;
  onAccept?: (status: ContactAcceptStatuses, _id: ObjectId) => Promise<void>;
  onDecline?: (status: ContactAcceptStatuses, _id: ObjectId) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export const FriendEssence: FC<FriendEssenceProps> = ({
  friendModel,
  onRemove,
  onDecline,
  onAccept,
}) => {
  const navigate = useSearchNavigate();
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
                onAccept(ContactAcceptStatuses.ACCEPTED, friendModel._id)
              }
            >
              Принять
            </Button>
          )}
          {onDecline && (
            <EmptyButtonStyled
              onClick={() =>
                onDecline &&
                onDecline(ContactAcceptStatuses.DECLINE, friendModel._id)
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