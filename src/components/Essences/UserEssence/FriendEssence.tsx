import { EssenceContainer } from '../EventEssence/event-essence.styled';
import { FC } from 'react';
import { FlexBlock } from '../../LayoutComponents/FlexBlock';
import { IFriendModel } from '../../../store/api/friends-api/friends-api.types';
import { Button } from '../../Buttons/Buttons.styled';
import { EmptyButtonStyled } from '../../Buttons/EmptyButton.styled';
import { CalendarUserIndicator } from '../../../pages/Planner/Users/UserIndicator';
import { useSearchNavigate } from '../../../hooks/useSearchNavigate';
import { ContactAcceptStatuses } from '../../../store/api/friends-api';
import { ObjectId } from '../../../store/api/rtk-api.types';

export interface FriendEssenceProps {
  friendModel: IFriendModel;
  onAccept?: (
    status: keyof typeof ContactAcceptStatuses,
    _id: ObjectId
  ) => Promise<void>;
  onDecline?: (
    status: keyof typeof ContactAcceptStatuses,
    _id: ObjectId
  ) => Promise<void>;
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
              onClick={() => onAccept && onAccept('ACCEPTED', friendModel._id)}
            >
              Принять
            </Button>
          )}
          {onDecline && (
            <EmptyButtonStyled
              onClick={() => onDecline && onDecline('DECLINE', friendModel._id)}
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