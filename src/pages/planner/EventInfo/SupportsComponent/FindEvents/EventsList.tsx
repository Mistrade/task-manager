import { FC, useCallback } from 'react';
import styled from 'styled-components';

import { disabledColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { Accordion } from '@components/Accordion/Accordion';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { Loader } from '@components/Loaders/Loader';
import { Heading } from '@components/Text/Heading';

import {
  ShortEventInfoModel,
  SortedEventsObject,
} from '@api/planning-api/types/event-info.types';
import { MyServerResponse, ObjectId } from '@api/rtk-api.types';

export interface EventListFromArrayProps
  extends ExtendSelectableEventListProps {
  eventsArray?: SortedEventsObject;
  error?: MyServerResponse['info'];
  isLoading?: boolean;
}

const Container = styled('form')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  //border-radius: ${borderRadiusSize.sm};
  // border: 1px solid ${disabledColor};
  //padding-top: 8px;
  //padding-bottom: 8px;
  gap: 6px;
`;

export type ExtendSelectableEventListProps = Pick<
  SelectableEventListProps,
  'selectedEvents' | 'onSelect' | 'onSelectActionType'
>;

export interface SelectableEventListProps {
  title: string;
  eventsArray: Array<ShortEventInfoModel>;
  onSelect?: (item: ShortEventInfoModel) => void;
  selectedEvents: Array<ShortEventInfoModel>;
  onSelectActionType: 'select' | 'link';
}

export const SelectableEventList: FC<SelectableEventListProps> = ({
  title,
  eventsArray,
  selectedEvents,
  onSelect,
  onSelectActionType = 'select',
}) => {
  const isSelected = useCallback(
    (itemId: ObjectId): boolean => {
      return !!selectedEvents.find((item) => item._id === itemId);
    },
    [selectedEvents]
  );

  return (
    <Accordion
      initialState={true}
      title={<Heading.H3 textColor={'current'}>{title}</Heading.H3>}
    >
      <FlexBlock direction={'column'} gap={8}>
        {eventsArray.map((item) => (
          <Checkbox
            key={item._id}
            onChange={() => onSelect && onSelect(item)}
            isChecked={isSelected(item._id)}
            type={'checkbox'}
            title={
              <EventEssence
                title={item.title}
                status={item.status}
                priority={item.priority}
                group={item.group || null}
                description={item.description}
                eventId={item._id}
                time={item.time}
                timeEnd={item.timeEnd}
              />
            }
          />
        ))}
      </FlexBlock>
    </Accordion>
  );
};

export const EventListFromArray: FC<EventListFromArrayProps> = ({
  eventsArray,
  isLoading,
  error,
  onSelect,
  onSelectActionType = 'select',
  selectedEvents,
}) => {
  if (isLoading) {
    return (
      <Container>
        <Loader isActive={true} title={'Загружаем список событий'} />
      </Container>
    );
  }

  if (
    eventsArray &&
    (eventsArray?.throughEvents.length > 0 ||
      eventsArray?.baseEvents.length > 0)
  ) {
    return (
      <Container>
        <VerticalScroll
          placementStatic={'top'}
          renderPattern={'top-bottom'}
          gap={6}
          containerProps={{
            height: '100%',
          }}
        >
          <FlexBlock direction={'column'} gap={6} mt={8}>
            {eventsArray?.throughEvents.length > 0 && (
              <SelectableEventList
                onSelectActionType={onSelectActionType}
                selectedEvents={selectedEvents}
                onSelect={onSelect}
                title={'Сквозные события'}
                eventsArray={eventsArray.throughEvents}
              />
            )}
            {eventsArray?.baseEvents.length > 0 && (
              <SelectableEventList
                onSelectActionType={onSelectActionType}
                selectedEvents={selectedEvents}
                onSelect={onSelect}
                title={'Внутридневные события'}
                eventsArray={eventsArray.baseEvents}
              />
            )}
          </FlexBlock>
        </VerticalScroll>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorScreen
          title={'Произошла ошибка'}
          errorType={'BAD_REQUEST'}
          description={error.message}
        />
      </Container>
    );
  }

  if (
    eventsArray &&
    !eventsArray.baseEvents.length &&
    !eventsArray.throughEvents.length
  ) {
    return (
      <Container>
        <ErrorScreen
          title={'События не найдены'}
          errorType={'ERR_FORBIDDEN'}
          description={'По указанным фильтрам события не найдены'}
        />
      </Container>
    );
  }

  return (
    <Container>
      <ErrorScreen
        title={'Здесь будет список событий'}
        errorType={'SYSTEM_ERROR'}
        description={'Укажите фильтры, по которым искать события'}
      />
    </Container>
  );
};
