import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { dateToPlannerDate } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectYearConfig } from '@selectors/planner';
import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { PLANNER_LAYOUTS, SERVICES_NAMES } from '@src/common/constants';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Loader } from '@components/Loaders/Loader';

import { DateWithTooltipPlanner } from '@planner/SmallMotnCalendar/DateWithTooltipPlanner';
import { SmallCalendarMonthTitle } from '@planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import { SmallMonth } from '@planner/SmallMotnCalendar/SmallMonth';
import { YearCalendarProps } from '@planner/planner.types';

import { useGetEventsSchemeQuery } from '@api/planning-api';

const MonthItemContainer = styled('div')`
  padding: 4px;
  border-radius: ${borderRadiusSize.md};
  justify-content: center;
  align-items: center;
  width: calc(25% - 8px);
  background-color: transparent;
`;

const MonthTitleWrapper = styled('div')`
  width: 100%;
  position: sticky;
  background-color: transparent;
  z-index: 1;
  left: 0;
  top: 0;
`;

export const YearCalendar: FC<YearCalendarProps> = memo(() => {
  const config = useAppSelector(plannerSelectYearConfig);
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const args = useEventStorageQueryArgs();
  const { data: taskScheme, isLoading } = useGetEventsSchemeQuery(args);

  return (
    <>
      <Helmet title={`Схема событий ${config.year}г.`} />
      <Loader title={'Загрузка схемы...'} isActive={isLoading}>
        <FlexBlock
          wrap={'wrap'}
          direction={'row'}
          justify={'flex-start'}
          align={'flex-start'}
          gap={4}
        >
          {config.months.map((monthItem) => {
            return (
              <MonthItemContainer
                key={`monthItem_year_${monthItem.year}_month_${monthItem.monthOfYear}`}
              >
                <SmallMonth
                  current={{
                    layout: 'month',
                    month: monthItem.monthOfYear,
                    year: monthItem.year,
                  }}
                  dateComponent={DateWithTooltipPlanner}
                  includesTasks={taskScheme}
                  title={
                    <MonthTitleWrapper>
                      <SmallCalendarMonthTitle
                        monthItem={monthItem}
                        onClick={(data) => {
                          dispatch(
                            setPlannerDateAndLayout({
                              date: dateToPlannerDate(
                                dayjs()
                                  .set('year', data.year)
                                  .set('month', data.monthOfYear)
                                  .startOf('month')
                              ),
                              layout: PLANNER_LAYOUTS.MONTH,
                            })
                          );
                          navigate(
                            `/${SERVICES_NAMES.PLANNER}/${PLANNER_LAYOUTS.MONTH}`
                          );
                        }}
                      />
                    </MonthTitleWrapper>
                  }
                  onSelectDate={(data) => {
                    dispatch(
                      setPlannerDateAndLayout({
                        date: data.value,
                        layout: PLANNER_LAYOUTS.DAY,
                      })
                    );
                    navigate(
                      `/${SERVICES_NAMES.PLANNER}/${PLANNER_LAYOUTS.DAY}`
                    );
                  }}
                  onSelectWeek={(current) => {
                    dispatch(
                      setPlannerDateAndLayout({
                        date: dateToPlannerDate(current.aroundDate),
                        layout: PLANNER_LAYOUTS.WEEK,
                      })
                    );
                    navigate(
                      `/${SERVICES_NAMES.PLANNER}/${PLANNER_LAYOUTS.WEEK}`
                    );
                  }}
                  monthItem={monthItem}
                />
              </MonthItemContainer>
            );
          })}
        </FlexBlock>
      </Loader>
    </>
  );
});
