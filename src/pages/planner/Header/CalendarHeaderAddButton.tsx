import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC, useMemo } from 'react';

export interface CalendarHeaderAddButtonProps {
  onAddTask?: () => void;
}

export const CalendarHeaderAddButton: FC<CalendarHeaderAddButtonProps> =
  React.memo(
    ({
      // current,
      onAddTask,
    }) => {
      const navigate = useSearchNavigate();
      const status = useAppSelector(plannerSelectStatus);
      const layout = useAppSelector(plannerSelectLayout);

      const items = useMemo(() => {
        return [
          {
            title: 'Создать событие',
            onClick() {
              navigate(`/planner/${layout}/${status}/event/create`);
            },
          },
          {
            title: 'Создать календарь',
            async onClick() {
              navigate(`/planner/${layout}/${status}/create-group`);
            },
          },
        ];
      }, [layout, status]);

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
                <SelectItemContainer key={item.title} onClick={item.onClick}>
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
    },
    disableReRender
  );
