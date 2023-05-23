import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import dayjs from 'dayjs';
import { FC, useContext, useMemo, useState } from 'react';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';
import { SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { ModalContext } from '@components/LayoutComponents/Modal/Modal';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { SmallMonthDateItem } from '@planner/SmallMonth/SmallMonthDateItem';
import {
  CalendarItem,
  OnSelectDateFromCalendarFn,
  PlannerMonthMode,
} from '@planner/types';

import { GetEventsSchemeResponse } from '@api/planning-api/types/event-info.types';

export interface DateWithTooltipProps {
  date: CalendarItem;
  taskScheme?: GetEventsSchemeResponse;
  onSelectDate?: OnSelectDateFromCalendarFn;
  current: PlannerMonthMode;
}

export const DateWithTooltipActions: FC<
  DateWithTooltipProps & { onClose(value: boolean): void }
> = ({ onSelectDate, date, current, onClose, taskScheme }) => {
  const { openModal } = useCreateEventModal();
  const layout = useAppSelector(plannerSelectLayout);
  const dateText = useMemo(
    () =>
      DateHelper.getHumanizeDateValue(plannerDateToDate(date.value), {
        withTime: false,
        monthPattern: 'short',
        yearPattern: 'short',
      }),
    [date.value]
  );

  const modalContext = useContext(ModalContext);

  const createEventClickHandle = () => {
    onClose(false);
    const value = dayjs(plannerDateToDate(date.value)).set('hour', 9);
    openModal(
      {
        time: value.toString(),
        timeEnd: value.add(1, 'hour').toString(),
      },
      {
        useReturnBackOnDecline: true,
        modalPath: getPath(SERVICES_NAMES.PLANNER, layout, 'event/create'),
      }
    );
  };

  const createEventWithModalAnimation = () => {
    if (modalContext?.closeModalAnimation) {
      modalContext.closeModalAnimation().then(createEventClickHandle);
    } else {
      createEventClickHandle();
    }
  };

  const toDayLayoutClickHandler = () => {
    onClose(false);
    onSelectDate && onSelectDate(date);
  };

  const toDayWithModalAnimation = () => {
    if (modalContext?.closeModalAnimation) {
      modalContext.closeModalAnimation().then(toDayLayoutClickHandler);
    } else {
      toDayLayoutClickHandler();
    }
  };

  return (
    <SelectListContainer>
      <SelectItemContainer onClick={createEventWithModalAnimation}>
        Создать событие{' ' + dateText}
      </SelectItemContainer>
      <SelectItemContainer onClick={toDayWithModalAnimation}>
        Смотреть события{' ' + dateText}
      </SelectItemContainer>
    </SelectListContainer>
  );
};

export const DateWithTooltipPlanner: FC<DateWithTooltipProps> = ({
  date,
  taskScheme,
  onSelectDate,
  current,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <Tooltip
        visible={isOpen}
        onClickOutside={() => setIsOpen(false)}
        theme={'light'}
        placement={'right'}
        interactive={true}
        interactiveBorder={20}
        delay={100}
        content={
          <DateWithTooltipActions
            onClose={setIsOpen}
            onSelectDate={onSelectDate}
            date={date}
            current={current}
          />
        }
      >
        <SmallMonthDateItem
          current={current}
          key={`short-date-${date.value.day}`}
          date={date}
          currentDate={plannerDateToDate(date.value)}
          taskScheme={taskScheme}
          onSelectDate={() => setIsOpen((prev) => !prev)}
          isSelect={isOpen}
        />
      </Tooltip>
    );
  }

  return (
    <SmallMonthDateItem
      current={current}
      key={`short-date-${date.value.day}`}
      date={date}
      currentDate={plannerDateToDate(date.value)}
      taskScheme={taskScheme}
      onSelectDate={() => setIsOpen((prev) => !prev)}
      isSelect={isOpen}
    />
  );
};
