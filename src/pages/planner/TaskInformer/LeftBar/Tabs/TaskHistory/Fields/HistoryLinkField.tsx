import { FC } from 'react';
import { BaseEventHistoryFieldProps } from '../event-history.types';
import { EventLinkItem } from '@planner/planner.types';
import { Text } from '@components/Text/Text';
import { JoinToEventButton } from '@components/Buttons/Buttons.styled';
import { UrlIcon } from '@components/Icons/SocialNetworkIcons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';

export const HistoryLinkField: FC<
  BaseEventHistoryFieldProps<EventLinkItem | null | undefined>
> = ({ value }) => {
  if (!value) {
    return (
      <ReplyContent>
        <Text htmlTag={'span'}>Ссылка была удалена</Text>
      </ReplyContent>
    );
  }
  return (
    <ReplyContent>
      <JoinToEventButton href={value.value} target={'_blank'}>
        <FlexBlock gap={6} direction={'row'} align={'center'}>
          <UrlIcon name={value.key} size={16} />
          Перейти по ссылке
        </FlexBlock>
      </JoinToEventButton>
    </ReplyContent>
  );
};
