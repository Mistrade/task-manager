import { Dayjs } from 'dayjs';
import { FC } from 'react';

import Badge from '@components/Badge';
import { JoinToEventButton } from '@components/Buttons/Buttons.styled';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { FlexBlock } from '@components/LayoutComponents';

import {
  AccessRightsWithOwner,
  EventInviteAcceptedStatuses,
} from '@api/planning-api/types/event-info.types';
import { UtcDate } from '@api/rtk-api.types';
import { UserModel } from '@api/session-api/session-api.types';

import { disabledColor } from '../../../../../../common/constants/constants';
import { borderRadiusSize } from '../../../../../../common/css/mixins';

interface MemberItemProps {
  user: UserModel;
  rights: AccessRightsWithOwner;
  status?: EventInviteAcceptedStatuses;
  date?: UtcDate | Date | Dayjs;
}

const RightsMap: { [key in AccessRightsWithOwner]: string } = {
  admin: 'Администратор',
  viewer: 'Зритель',
  editor: 'Редактор',
  owner: 'Создатель',
};

export const MemberItem: FC<MemberItemProps> = ({
  user,
  rights,
  date,
  status,
}) => {
  return (
    <FlexBlock width={'100%'} direction={'row'}>
      <FlexBlock
        p={'8px 12px'}
        borderRadius={borderRadiusSize.sm}
        width={'100%'}
        border={`1px solid ${disabledColor}`}
      >
        <FlexBlock
          align={'center'}
          direction={'row'}
          justify={'space-between'}
          width={'100%'}
        >
          <FlexBlock gap={6} shrink={0}>
            <LinkStyled to={`/profile/${user._id}`} target={'_blank'}>
              {`${user.name} ${user.surname}`}
            </LinkStyled>
            <Badge type={'primary'}>{RightsMap[rights]}</Badge>
          </FlexBlock>
          <FlexBlock justify={'flex-end'} gap={6} align={'center'}>
            {user.email && (
              <JoinToEventButton href={`mailto:${user.email}`}>
                Написать Email
              </JoinToEventButton>
            )}
            {user.phone && (
              <JoinToEventButton href={`tel:${user.phone}`}>
                Позвонить
              </JoinToEventButton>
            )}
            <JoinToEventButton href={`/profile/${user._id}`} target={'_blank'}>
              Перейти в профиль
            </JoinToEventButton>
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
