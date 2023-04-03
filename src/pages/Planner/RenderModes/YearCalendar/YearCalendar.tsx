import { FC, useContext, useMemo } from 'react';
import { YearCalendarProps } from '../../planner.types';
import styled from 'styled-components';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { SmallCalendarMonthTitle } from '../../SmallMotnCalendar/SmallCalendarMonthTitle';
import { useGetEventsSchemeQuery } from '../../../../store/api/planning-api';
import { DateScopeHelper } from '../../../../common/calendarSupport/scopes';
import { Loader } from '../../../../components/Loaders/Loader';
import {
  borderRadiusSize,
  pageHeaderColor,
  PLANNER_LAYOUTS,
} from '../../../../common/constants';
import { SmallMonth } from '../../SmallMotnCalendar/SmallMonth';
import { DayEventItemBoxShadowMixin } from '../DayCalendar/TaskList/DayTaskItem';
import dayjs from 'dayjs';
import { GetEventsFiltersRequestProps } from '../../../../store/api/planning-api/types/event-info.types';
import { hideScrollBar } from '../../../../components/Switcher/Switcher';
import { PlannerContext } from '../../../../Context/planner.context';

const MonthItemContainer = styled('div')`
  padding: 4px;
  border-radius: ${borderRadiusSize.md};
  justify-content: center;
  align-items: center;
  width: calc(25% - 8px);
  background-color: transparent;
  ${DayEventItemBoxShadowMixin};

  &:hover {
    background-color: ${pageHeaderColor};
  }

  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`;

const MonthTitleWrapper = styled('div')`
  width: 100%;
  position: sticky;
  background-color: transparent;
  z-index: 1;
  left: 0;
  top: 0;
`;

export const YearCalendar: FC<YearCalendarProps> = ({ yearItem }) => {
  const {
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

  const schemeScope: GetEventsFiltersRequestProps = useMemo(() => {
    const scope = new DateScopeHelper({
      useOtherDays: false,
    }).getDateScopeForTaskScheme(new Date(yearItem.year, 0, 1), 'year');

    return {
      ...scope,
      utcOffset: dayjs().utcOffset(),
    };
  }, [yearItem.year]);

  const { data: taskScheme, isFetching } = useGetEventsSchemeQuery(schemeScope);

  return (
    <FlexBlock
      mt={4}
      mb={4}
      width={'100%'}
      overflowY={'auto'}
      overflowX={'hidden'}
      additionalCss={hideScrollBar}
      p={8}
    >
      <Loader title={'Загрузка схемы...'} isActive={isFetching}>
        <FlexBlock
          wrap={'wrap'}
          direction={'row'}
          justify={'flex-start'}
          align={'flex-start'}
          gap={4}
        >
          {yearItem.months.map((monthItem) => {
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
                        onClick={(data) =>
                          updateCurrentLayoutAndNavigate(
                            PLANNER_LAYOUTS.MONTH,
                            new Date(data.year, data.monthOfYear, 1)
                          )
                        }
                      />
                    </MonthTitleWrapper>
                  }
                  onSelectDate={(data) =>
                    updateCurrentLayoutAndNavigate(
                      PLANNER_LAYOUTS.DAY,
                      data.value
                    )
                  }
                  onSelectWeek={(current) =>
                    updateCurrentLayoutAndNavigate(
                      PLANNER_LAYOUTS.WEEK,
                      current.aroundDate
                    )
                  }
                  monthItem={monthItem}
                />
              </MonthItemContainer>
            );
          })}
        </FlexBlock>
      </Loader>
    </FlexBlock>
  );
};
