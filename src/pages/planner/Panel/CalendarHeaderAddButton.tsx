import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import React, { FC, useMemo, useState } from 'react';

import { SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';
import { disableReRender } from '@src/common/utils/react-utils';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { Tooltip } from '@components/Tooltip/Tooltip';

export const CalendarHeaderAddButton: FC = React.memo(() => {
  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);
  const { openModal } = useCreateEventModal();
  const [isOpen, setIsOpen] = useState(false);

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
        title: 'Создать группу событий',
        onClick() {
          navigate(getPath(SERVICES_NAMES.PLANNER, layout, 'group', 'create'));
        },
      },
    ];
  }, [layout]);

  return (
    <Tooltip
      visible={isOpen}
      theme={'light'}
      interactive={true}
      placement={'bottom'}
      onClickOutside={() => setIsOpen(false)}
      content={
        <SelectListContainer>
          {items.map((item) => (
            <SelectItemContainer
              key={item.title}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.title}
            </SelectItemContainer>
          ))}
        </SelectListContainer>
      }
    >
      <EmptyButtonStyled onClick={() => setIsOpen((prev) => !prev)}>
        <PlusIcon size={30} />
      </EmptyButtonStyled>
    </Tooltip>
  );
}, disableReRender);
