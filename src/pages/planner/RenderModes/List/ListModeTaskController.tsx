import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeclinationMonthList } from '@src/common/constants';
import { getTaskListOfDay } from '@src/common/functions';

import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { CalendarTitle } from '@planner/Planner.styled';
import { EventsStorage } from '@planner/planner.types';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';


export interface ListModeTaskController {
  eventStorage?: EventsStorage<ShortEventInfoModel>;
  fromDate: Date | null;
  toDate: Date | null;
}

function generator(fromDate: Date | null, toDate: Date | null): Array<Date> {
  const start = fromDate ? dayjs(fromDate) : dayjs().startOf('year');
  const end = toDate ? dayjs(toDate) : dayjs().endOf('year');

  let iterationDate = start.startOf('date');
  const result: Array<Date> = [];
  while (iterationDate.isBetween(start, end, 'date', '[]')) {
    result.push(iterationDate.toDate());
    iterationDate = iterationDate.add(1, 'day');
  }

  return result;
}

export const ListModeTaskController: FC<ListModeTaskController> = ({
  eventStorage,
  fromDate,
  toDate,
}) => {
  const dateArray = useMemo(() => {
    return generator(fromDate, toDate);
  }, [fromDate, toDate]);

  const navigate = useNavigate();

  if (eventStorage) {
    return (
      <FlexBlock
        direction={'column'}
        height={'max-content'}
        width={'100%'}
        gap={12}
      >
        {dateArray.map((date) => {
          const tasks = getTaskListOfDay(date, eventStorage);
          if (tasks.length > 0) {
            const d = dayjs(date);
            return (
              <FlexBlock
                width={'100%'}
                direction={'column'}
                key={`date__${d.format('DD-MM-YYYY')}`}
              >
                <FlexBlock
                  mb={4}
                  pb={4}
                  pl={20}
                  ml={-8}
                  mr={-8}
                  pr={8}
                  bgColor={'#fff'}
                >
                  <CalendarTitle style={{ fontSize: 18 }}>
                    {dayjs(date).format(
                      `DD ${DeclinationMonthList[date.getMonth()]} YYYY г.`
                    )}
                  </CalendarTitle>
                </FlexBlock>
                <FlexBlock direction={'column'} gap={6}>
                  {tasks.map((taskInfo) => (
                    <EventEssence
                      key={taskInfo._id}
                      title={taskInfo.title}
                      status={taskInfo.status}
                      priority={taskInfo.priority}
                      time={taskInfo.time}
                      timeEnd={taskInfo.timeEnd}
                      eventId={taskInfo._id}
                      onTitleClick={(eventId) => {
                        navigate(`event/info/${eventId}`, {
                          relative: 'route',
                        });
                      }}
                      description={taskInfo.description}
                    />
                  ))}
                </FlexBlock>
              </FlexBlock>
            );
          }

          return <></>;
        })}
      </FlexBlock>
    );
  }

  return <></>;
};