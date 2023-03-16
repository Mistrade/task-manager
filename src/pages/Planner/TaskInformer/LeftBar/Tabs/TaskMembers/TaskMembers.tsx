import { FC } from 'react';
import { FlexBlock } from '../../../../../../components/LayoutComponents/FlexBlock';
import {
  borderRadiusSize,
  currentColor,
  darkColor,
  disabledColor,
} from '../../../../../../common/constants';
import { JoinToEventButton } from '../../../../../../components/Buttons/Buttons.styled';
import { EventInfoModel } from '../../../../../../store/api/planning-api/types/event-info.types';

export interface TaskMembersProps {
  taskItem: EventInfoModel;
}

export const TaskMembers: FC<TaskMembersProps> = ({ taskItem }) => {
  return (
    <FlexBlock width={'100%'} gap={12} direction={'column'}>
      <FlexBlock direction={'column'} gap={6} width={'100%'}>
        <FlexBlock fSize={18} style={{ color: currentColor }}>
          Создатель
        </FlexBlock>
        <FlexBlock pl={24} width={'100%'} direction={'row'}>
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
              <FlexBlock fSize={16} style={{ color: darkColor }}>
                {`${taskItem.userId.surname} ${taskItem.userId.name} ${
                  taskItem.userId.patronymic || ''
                }`}
              </FlexBlock>
              <FlexBlock justify={'flex-end'} gap={6}>
                {taskItem.userId.email && (
                  <JoinToEventButton href={`mailto:${taskItem.userId.email}`}>
                    Написать Email
                  </JoinToEventButton>
                )}
                {taskItem.userId.phone && (
                  <JoinToEventButton href={`tel:${taskItem.userId.phone}`}>
                    Позвонить
                  </JoinToEventButton>
                )}
                <JoinToEventButton
                  href={`/profile/${taskItem.userId._id}`}
                  target={'_blank'}
                >
                  Перейти в профиль
                </JoinToEventButton>
              </FlexBlock>
            </FlexBlock>
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
