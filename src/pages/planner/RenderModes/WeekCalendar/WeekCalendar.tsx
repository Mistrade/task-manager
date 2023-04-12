import { FC, useContext, useEffect, useRef } from 'react';
import { WeekCalendarProps } from '@planner/planner.types';
import dayjs from 'dayjs';
import { CalendarCell } from './CalendarCell/Cell';
import styled from 'styled-components';
import {
  currentColor,
  disabledColor,
  orangeColor,
  PLANNER_LAYOUTS,
} from '@src/common/constants';
import { getTaskListOfDay } from '@src/common/functions';
import { Accordion } from '@components/Accordion/Accordion';
import { Heading } from '@components/Text/Heading';
import { Badge } from '@components/Badge/Badge';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { NonViewScroller } from '@planner/TaskInformer/LeftBar/Tabs/TaskComments/comments.styled';
import { PlannerContext } from '@src/Context/planner.context';

interface StyledProps {
  isVisible?: boolean;
}

const WeekContainer = styled('div')`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  transition: all 0.3s ease-in;
  border: 1px solid transparent;
  padding-top: 12px;
  //z-index: 0;
`;

const DaysContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
  max-height: fit-content;
  transition: all 0.3s ease-in;
`;

const WeekOfYearTitle = styled('h3')`
  & {
    font-size: 20px;
    width: calc(100% + 16px);
    text-align: left;
    gap: 8px;
    color: ${disabledColor};
    background-color: #fff;
    z-index: 9;
    position: sticky;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-left: -8px;
    margin-right: -8px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

// const Container: FCWithChildren = ({ children }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     return () => {
//       containerRef.current?.animate(
//         [
//           { opacity: 1, transform: 'translateX(0)' },
//           { opacity: 0, transform: 'translateX(100%)' },
//         ],
//         {
//           duration: 500,
//           easing: 'ease-in',
//           fill: 'forwards',
//         }
//       );
//     };
//   }, []);
//   return <DaysContainer ref={containerRef}>{children}</DaysContainer>;
// };

export const WeeKCalendar: FC<WeekCalendarProps> = ({
  weekItem,
  renderTaskCount,
  taskStorage,
}) => {
  const { currentLayout } = useContext(PlannerContext);

  // const onClickToDate = useCallback(
  //   (date: CalendarItem) => {
  //     onChangeCurrent && onChangeCurrent(date.value, 'day');
  //   },
  //   [onChangeCurrent]
  // );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLayout === PLANNER_LAYOUTS.MONTH) {
      ref.current?.scrollIntoView({
        block: 'start',
        behavior: 'auto',
      });
    }
  }, [currentLayout]);

  if (currentLayout === 'month') {
    const isCurrentWeek = dayjs().week() === weekItem.weekOfYear;
    return (
      <WeekContainer>
        {isCurrentWeek && <NonViewScroller ref={ref} />}
        <Accordion
          title={
            <Heading.H2 style={{ color: currentColor, fontSize: 18 }}>
              <FlexBlock direction={'row'} gap={6}>
                {[
                  `Неделя ${weekItem.weekOfYear}`,
                  isCurrentWeek ? (
                    <Badge
                      style={{
                        fontWeight: 'normal',
                        backgroundColor: orangeColor,
                        color: '#fff',
                      }}
                    >
                      сегодня
                    </Badge>
                  ) : (
                    <></>
                  ),
                ]}
              </FlexBlock>
            </Heading.H2>
          }
        >
          <DaysContainer>
            {weekItem.days.map((day) => (
              <CalendarCell
                isVisible={true}
                tasks={getTaskListOfDay(day.value, taskStorage)}
                renderTaskCount={renderTaskCount}
                key={`date_year_${weekItem.year}_month_${
                  weekItem.month
                }_${day.value.getDate()}`}
                value={day}
                // onClickToDate={onClickToDate}
              />
            ))}
          </DaysContainer>
        </Accordion>
      </WeekContainer>
    );
  }

  return (
    <WeekContainer>
      <DaysContainer>
        {weekItem.days.map((day) => (
          <CalendarCell
            isVisible={true}
            tasks={getTaskListOfDay(day.value, taskStorage)}
            renderTaskCount={renderTaskCount}
            key={`date_year_${weekItem.year}_month_${
              weekItem.month
            }_${day.value.getDate()}`}
            value={day}
            // onClickToDate={onClickToDate}
          />
        ))}
      </DaysContainer>
    </WeekContainer>
  );
};
