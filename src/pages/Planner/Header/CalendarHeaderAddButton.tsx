import { SelectListContainer } from '../../../components/Input/SelectInput/SelectListContainer';
import { SelectItemContainer } from '../../../components/Input/SelectInput/SelectItemContainer';
import { EmptyButtonStyled } from '../../../components/Buttons/EmptyButton.styled';
import { FC, useMemo } from 'react';
import { PlusIcon } from '../../../components/Icons/Icons';
import { useSearchNavigate } from '../../../hooks/useSearchNavigate';
import { PlannerMode } from '../planner.types';
import { EventFilterTaskStatuses } from '../RenderModes/FindEventFilter/find-event-filters.types';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export interface CalendarHeaderAddButtonProps {
  current: PlannerMode;
  statuses: EventFilterTaskStatuses;
  onAddTask?: () => void;
}

export const CalendarHeaderAddButton: FC<CalendarHeaderAddButtonProps> = ({
  current,
  statuses,
  onAddTask,
}) => {
  const navigate = useSearchNavigate();

  const items = useMemo(() => {
    return [
      {
        title: 'Создать событие',
        onClick() {
          onAddTask && onAddTask();
        },
      },
      {
        title: 'Создать календарь',
        onClick() {
          navigate(`/planner/${current.layout}/${statuses}/create-group`);
        },
      },
    ];
  }, [current.layout, statuses]);

  return (
    <Tooltip
      theme={'light'}
      trigger={'click'}
      hideOnClick={true}
      interactive={true}
      placement={'bottom'}
      content={
        <SelectListContainer>
          {items.map((item) => (
            <SelectItemContainer
              key={item.title}
              onClick={() => {
                item.onClick();
              }}
            >
              {item.title}
            </SelectItemContainer>
          ))}
        </SelectListContainer>
      }
    >
      <EmptyButtonStyled
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <PlusIcon size={30} />
      </EmptyButtonStyled>
    </Tooltip>
  );
};
