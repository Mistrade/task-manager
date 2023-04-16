import { FC, useEffect } from 'react';

import { Badge } from '@components/Badge/Badge';
import { ButtonWithLoading } from '@components/Buttons/ButtonWithLoading';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';

import { useConnectChainsOfTree } from '@planner/TaskInformer/LeftBar/Tabs/Chains/Connect/useConnectChainsOfTree';
import { ConnectChildEventsProps } from '@planner/TaskInformer/LeftBar/Tabs/Chains/event-chains.types';
import { FindEvents } from '@planner/TaskInformer/SupportsComponent/FindEvents/FindEvents';
import { PreviewEventsList } from '@planner/TaskInformer/SupportsComponent/FindEvents/PreviewEventsList';

import { ObjectId } from '@api/rtk-api.types';


export const ConnectChildEvents: FC<ConnectChildEventsProps> = ({
  taskInfo,
  onSuccess,
  excludeEventId,
  chainsType,
}) => {
  const { select, back, next, isLoading, remove, step, eventsList } =
    useConnectChainsOfTree({
      eventInfo: taskInfo,
      chainsType: chainsType,
      onSuccess,
      initialStep: null,
    });

  useEffect(() => {
    console.log(step, eventsList);
  }, [step, eventsList]);

  if (step === 'preview-before-submit') {
    return (
      <PreviewEventsList
        title={
          <Heading.H3>
            События, которые вы выбрали <Badge>{eventsList.length}</Badge>
          </Heading.H3>
        }
        selectedEvents={eventsList || []}
        onSelectActionType={'select'}
        eventsArray={{
          throughEvents: [],
          baseEvents: eventsList,
        }}
        onSelect={remove}
        buttons={
          <FlexBlock
            direction={'row'}
            width={'100%'}
            justify={'flex-end'}
            gap={6}
          >
            <ButtonWithLoading onClick={next} isLoading={isLoading}>
              Сохранить
            </ButtonWithLoading>
            <EmptyButtonStyled onClick={next}>
              Вернуться назад
            </EmptyButtonStyled>
          </FlexBlock>
        }
      />
    );
  }

  return (
    <FindEvents
      taskInfo={taskInfo}
      excludeFromFilters={{
        eventIds: [
          ...(excludeEventId?.filter((item): item is ObjectId => !!item) || []),
        ],
      }}
      chainsFilter={{
        eventId: taskInfo._id,
        type: chainsType,
      }}
      selectedEvents={eventsList}
      buttons={
        <FlexBlock
          width={'100%'}
          direction={'row'}
          justify={'space-between'}
          align={'center'}
          gap={6}
        >
          <FlexBlock direction={'row'} grow={3} gap={6}>
            {eventsList.length > 0 && (
              <Heading.H3>
                Выбранные события <Badge>{eventsList.length}</Badge>
              </Heading.H3>
            )}
          </FlexBlock>
          <FlexBlock direction={'row'} align={'center'} gap={6}>
            <ButtonWithLoading isLoading={false} onClick={next}>
              Далее
            </ButtonWithLoading>
            <EmptyButtonStyled onClick={back}>Очистить</EmptyButtonStyled>
          </FlexBlock>
        </FlexBlock>
      }
      onSelect={select}
      onSelectActionType={'select'}
    />
  );
};