import { FC, useCallback } from 'react';
import { CalendarHeaderProps, PlannerMode } from '../planner.types';
import { FlexBlock } from '../../../components/LayoutComponents/FlexBlock';
import { CalendarModeSwitchers } from './CalendarModeSwitchers';
import { usePlanner } from '../../../hooks/usePlanner';
import { useParams } from 'react-router';
import { CalendarHeaderContainer } from './CalendarHeader.styled';
import { useAppSelector } from '../../../store/hooks/hooks';
import dayjs from 'dayjs';
import { useSearchNavigate } from '../../../hooks/useSearchNavigate';

export const PlannerHeader: FC<CalendarHeaderProps> = ({
  renderWeekPattern,
}) => {
  const { layout } = useParams<{ layout?: PlannerMode['layout'] }>();
  const { planner, onChangePlanner, onAddTask, createEventDateState } =
    usePlanner();
  const { statuses } = useAppSelector((state) => state.planner);

  const navigate = useSearchNavigate();

  const onChangeCurrentLayoutHandler = useCallback(
    (newLayout: PlannerMode['layout']) => {
      navigate(`/planner/${newLayout}/${statuses}`, { replace: true });
      if (newLayout === 'list') {
        return (
          onChangePlanner &&
          onChangePlanner(
            {
              layout: 'list',
              fromDate: dayjs().startOf('date').toDate(),
              toDate: dayjs().add(31, 'day').endOf('date').toDate(),
            },
            newLayout
          )
        );
      }
      return onChangePlanner && onChangePlanner(new Date(), newLayout);
    },
    [statuses]
  );

  return (
    <CalendarHeaderContainer>
      <FlexBlock width={'100%'} justify={'space-between'}>
        <FlexBlock justify={'flex-start'} gap={6}>
          <FlexBlock justify={'flex-start'}>
            <CalendarModeSwitchers
              layout={layout}
              onChange={onChangeCurrentLayoutHandler}
            />
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </CalendarHeaderContainer>
  );
};
