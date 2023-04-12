import { useGetEventsSchemeQuery } from '@api/planning-api';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Loader } from '@components/Loaders/Loader';
import { plannerDateToDate } from '@planner-reducer/utils';
import { YearCalendarProps } from '@planner/planner.types';
import { SmallCalendarMonthTitle } from '@planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import { SmallMonth } from '@planner/SmallMotnCalendar/SmallMonth';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectYearConfig } from '@selectors/planner';
import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { UTC_OFFSET } from '@src/common/constants';
import { FC, memo } from 'react';
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

  const { data: taskScheme, isFetching } = useGetEventsSchemeQuery({
    utcOffset: UTC_OFFSET,
    fromDate: plannerDateToDate(config.scope.startDate).toString(),
    toDate: plannerDateToDate(config.scope.endDate).toString(),
  });

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
                        // onClick={(data) =>
                        //   updateCurrentLayoutAndNavigate(
                        //     PLANNER_LAYOUTS.MONTH,
                        //     new Date(data.year, data.monthOfYear, 1)
                        //   )
                        // }
                      />
                    </MonthTitleWrapper>
                  }
                  // onSelectDate={(data) =>
                  //   updateCurrentLayoutAndNavigate(
                  //     PLANNER_LAYOUTS.DAY,
                  //     plannerDateToDate(data.value)
                  //   )
                  // }
                  // onSelectWeek={(current) =>
                  //   updateCurrentLayoutAndNavigate(
                  //     PLANNER_LAYOUTS.WEEK,
                  //     current.aroundDate
                  //   )
                  // }
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
