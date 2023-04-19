import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useDebounce } from '@hooks/useDebounce';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import dayjs from 'dayjs';
import { memo, useState } from 'react';

import {
  SERVICES_NAMES,
  UTC_OFFSET,
  currentColor,
} from '@src/common/constants';
import { getPath } from '@src/common/functions';

import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { EventIcon } from '@components/Icons/EventIcon';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';

import { useGetEventListQuery } from '@api/planning-api';

export const FindEventsInput = memo(() => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 500);
  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);
  const { openModal } = useCreateEventModal();

  const { data: events } = useGetEventListQuery(
    {
      utcOffset: UTC_OFFSET,
      title: debounceValue,
    },
    { skip: debounceValue.length < 3 }
  );

  return (
    <SelectInput
      containerProps={{ maxWidth: 300 }}
      value={value}
      readOnly={false}
      selectContainerPlacement={'bottom-end'}
      iconPlacement={'left'}
      placeholder={'Поиск по всем событиям'}
      onChange={({ target }) => setValue(target.value)}
      data={events?.data || []}
      selectContainerViewCondition={!!value.length || !!events?.data?.length}
      icon={<ListIcon size={20} color={currentColor} />}
      renderData={(data, setIsOpenState) => (
        <ScrollVerticalView renderPattern={'top-bottom'}>
          <SelectListContainer>
            {data.map((item) => (
              <SelectItemContainer
                onClick={() => {
                  setIsOpenState(false);
                  navigate(
                    getPath(
                      SERVICES_NAMES.PLANNER,
                      layout,
                      'event/info',
                      item._id
                    )
                  );
                }}
              >
                <FlexBlock gap={6}>
                  <FlexBlock shrink={0} gap={6}>
                    <EventIcon status={item.status} size={16} />
                    <PriorityCalendarIcon
                      priorityKey={item.priority}
                      size={16}
                    />
                  </FlexBlock>
                  <CutText rows={1} fontSize={15}>
                    {item.title}
                  </CutText>
                </FlexBlock>
              </SelectItemContainer>
            ))}
            {!!value.length && (
              <SelectItemContainer
                onClick={() => {
                  openModal(
                    {
                      title: value,
                      time: dayjs().toString(),
                      timeEnd: dayjs().add(1, 'hour').toString(),
                    },
                    {
                      useReturnBackOnDecline: true,
                      modalPath: getPath(
                        SERVICES_NAMES.PLANNER,
                        layout,
                        'event/create'
                      ),
                    }
                  );
                  setIsOpenState(false);
                }}
              >
                <CutText rows={1}>Создать событие "{value}"</CutText>
              </SelectItemContainer>
            )}
          </SelectListContainer>
        </ScrollVerticalView>
      )}
    />
  );
});
