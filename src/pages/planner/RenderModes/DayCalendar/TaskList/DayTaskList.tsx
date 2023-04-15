import {
  ShortEventInfoModel,
  SortedEventsObject,
} from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';
import { Accordion } from '@components/Accordion/Accordion';
import { Badge } from '@components/Badge/Badge';
import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { setOpenEventId } from '@planner-reducer/index';
import {
  GlobalTaskListProps,
  OnSelectTaskFnType,
} from '@planner/planner.types';
import { DayTaskListFilter } from '@planner/RenderModes/DayCalendar/TaskList/Filter';
import { useAppDispatch } from '@redux/hooks/hooks';
import { currentColor, defaultColor } from '@src/common/constants';
import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DayTaskListProps extends GlobalTaskListProps {
  day: Date;
  onSelectTask?: OnSelectTaskFnType;
}

export const DayTaskList: FC<DayTaskListProps> = ({ day }) => {
  const [events, setEvents] = useState<SortedEventsObject>({
    throughEvents: [],
    baseEvents: [],
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectEventHandler = useCallback((_id: ObjectId | null | undefined) => {
    if (_id) {
      dispatch(setOpenEventId(_id));
      navigate(`event/info/${_id}`, { relative: 'route' });
    }
  }, []);

  return (
    <ScrollVerticalView
      staticContent={
        <FlexBlock direction={'column'}>
          <DayTaskListFilter updateState={setEvents} />
        </FlexBlock>
      }
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      <FlexBlock
        direction={'column'}
        width={'100%'}
        height={'max-content'}
        gap={12}
      >
        {!!events.baseEvents?.length && (
          <Accordion
            zIndex={1}
            title={
              <FlexBlock
                width={'100%'}
                p={'4px 6px'}
                align={'center'}
                justify={'flex-start'}
                fSize={22}
                style={{ color: currentColor }}
                fWeight={'bold'}
              >
                <span style={{ fontSize: 22 }}>
                  Внутри дня{' '}
                  <Badge style={{ fontSize: 18, color: defaultColor }}>
                    {events.baseEvents.length}
                  </Badge>
                </span>
              </FlexBlock>
            }
          >
            <FlexBlock direction={'column'} gap={6}>
              {events.baseEvents.map((task) => (
                <EventEssence
                  status={task.status}
                  priority={task.priority}
                  title={task.title}
                  eventId={task._id}
                  description={task.description}
                  time={task.time}
                  timeEnd={task.timeEnd}
                  group={task.group}
                  onTitleClick={selectEventHandler}
                />
              ))}
            </FlexBlock>
          </Accordion>
        )}
        {!!events.throughEvents?.length && (
          <Accordion
            zIndex={2}
            initialState={true}
            title={
              <FlexBlock
                width={'100%'}
                p={'4px 6px'}
                align={'center'}
                justify={'flex-start'}
                fSize={22}
                style={{ color: currentColor }}
                fWeight={'bold'}
              >
                <span style={{ fontSize: 22 }}>
                  Сквозные события{' '}
                  <Badge style={{ fontSize: 18, color: defaultColor }}>
                    {events.throughEvents.length}
                  </Badge>
                </span>
              </FlexBlock>
            }
          >
            <FlexBlock direction={'column'} gap={6}>
              {events.throughEvents.map((task: ShortEventInfoModel, index) => (
                <EventEssence
                  status={task.status}
                  priority={task.priority}
                  title={task.title}
                  eventId={task._id}
                  description={task.description}
                  time={task.time}
                  timeEnd={task.timeEnd}
                  group={task.group}
                  onTitleClick={selectEventHandler}
                />
              ))}
            </FlexBlock>
          </Accordion>
        )}
      </FlexBlock>
    </ScrollVerticalView>
  );
};
