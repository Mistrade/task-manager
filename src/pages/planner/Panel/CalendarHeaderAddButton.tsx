import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';
import { disableReRender } from '@src/common/utils/react-utils';
import { Tooltip } from 'chernikov-kit';
import React, { FC, useMemo, useState } from 'react';


export const CalendarHeaderAddButton: FC<{ pattern: 'short' | 'full' }> =
  React.memo(({ pattern }) => {
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
            navigate(
              getPath(SERVICES_NAMES.PLANNER, layout, 'group', 'create')
            );
          },
        },
      ];
    }, [layout]);

    return (
      <Tooltip
        visible={isOpen}
        theme={'light'}
        interactive={true}
        placement={pattern === 'short' ? 'right-start' : 'bottom'}
        onClickOutside={() => setIsOpen(false)}
        content={
          <SelectListContainer minWidth={250}>
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