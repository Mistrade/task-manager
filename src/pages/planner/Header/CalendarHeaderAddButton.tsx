import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import React, { FC, useMemo } from 'react';

import { SERVICES_NAMES } from '@src/common/constants';
import { getPath } from '@src/common/functions';
import { disableReRender } from '@src/common/utils/react-utils';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { Tooltip } from '@components/Tooltip/Tooltip';

export interface CalendarHeaderAddButtonProps {
  onAddTask?: () => void;
}

export const CalendarHeaderAddButton: FC<CalendarHeaderAddButtonProps> =
  React.memo(({}) => {
    const navigate = useSearchNavigate();
    const layout = useAppSelector(plannerSelectLayout);
    const { openModal } = useCreateEventModal();

    const items = useMemo(() => {
      return [
        {
          title: 'Создать событие',
          onClick() {
            openModal(
              {},
              {
                modalPath: getPath(
                  SERVICES_NAMES.PLANNER,
                  layout,
                  'event/create'
                ),
                useReturnBackOnDecline: true,
              }
            );
          },
        },
        {
          title: 'Создать календарь',
          onClick() {
            navigate(getPath(SERVICES_NAMES.PLANNER, layout, 'create-group'));
          },
        },
      ];
    }, [layout]);

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
  }, disableReRender);
