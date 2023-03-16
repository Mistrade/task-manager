import { EventsStorage } from '../../planner.types';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { getTaskListOfDay } from '../../../../common/functions';
import { DayTaskItem } from '../DayCalendar/TaskList/DayTaskItem';
import { CalendarTitle } from '../../Planner.styled';
import { UsePlannerReturned } from '../../../../hooks/usePlanner';
import { useRemoveEventMutation } from '../../../../store/api/planning-api';
import { DeclinationMonthList } from '../../../../common/constants';
import { ShortEventInfoModel } from '../../../../store/api/planning-api/types/event-info.types';

export interface ListModeTaskController {
  eventStorage?: EventsStorage<ShortEventInfoModel>;
  fromDate: Date | null;
  toDate: Date | null;
  onSelectTask: UsePlannerReturned['onSelectTask'];
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
  onSelectTask,
}) => {
  const dateArray = useMemo(() => {
    return generator(fromDate, toDate);
  }, [fromDate, toDate]);

  const [removeTask, { isSuccess: isRemoveSuccess, isError: isRemoveError }] =
    useRemoveEventMutation();

  if (eventStorage) {
    return (
      <FlexBlock
        direction={'column'}
        height={'max-content'}
        width={'100%'}
        gap={12}
      >
        {dateArray.map((date, dateIndex) => {
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
                {tasks.map((taskInfo, index) => (
                  <DayTaskItem
                    taskInfo={taskInfo}
                    tabIndex={(dateIndex + 1) * (index + 1)}
                    key={taskInfo._id}
                    day={date}
                    onSelectTask={onSelectTask}
                    onDelete={async (id) =>
                      await removeTask({ eventId: id }).unwrap()
                    }
                  />
                ))}
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
