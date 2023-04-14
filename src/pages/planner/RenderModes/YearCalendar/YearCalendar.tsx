import { useGetEventsSchemeQuery } from '@api/planning-api';
import { GetEventsFiltersRequestProps } from '@api/planning-api/types/event-info.types';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Loader } from '@components/Loaders/Loader';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { dateToPlannerDate, plannerDateToDate } from '@planner-reducer/utils';
import { YearCalendarProps } from '@planner/planner.types';
import { SmallCalendarMonthTitle } from '@planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import { SmallMonth } from '@planner/SmallMotnCalendar/SmallMonth';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import {
  plannerSelectStatus,
  plannerSelectYearConfig,
} from '@selectors/planner';
import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { PLANNER_LAYOUTS, UTC_OFFSET } from '@src/common/constants';
import dayjs from 'dayjs';
import { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

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
  const status = useAppSelector(plannerSelectStatus);
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const args = useMemo(
    (): GetEventsFiltersRequestProps => ({
      utcOffset: UTC_OFFSET,
      fromDate: plannerDateToDate(config.scope.startDate).toString(),
      toDate: plannerDateToDate(config.scope.endDate).toString(),
      taskStatus: 'all',
    }),
    [config]
  );

  const { data: taskScheme, isFetching } = useGetEventsSchemeQuery(args);

  return (
    <ScrollVerticalView renderPattern={'top-bottom'}>
      <Loader title={'Загрузка схемы...'} isActive={isFetching}>
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
                            `/${ServicesNames.PLANNER}/${PLANNER_LAYOUTS.MONTH}/${status}`
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
                      `/${ServicesNames.PLANNER}/${PLANNER_LAYOUTS.DAY}/${status}`
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
                      `/${ServicesNames.PLANNER}/${PLANNER_LAYOUTS.WEEK}/${status}`
                    );
                  }}
                  monthItem={monthItem}
                />
              </MonthItemContainer>
            );
          })}
        </FlexBlock>
      </Loader>
    </ScrollVerticalView>
  );
});
