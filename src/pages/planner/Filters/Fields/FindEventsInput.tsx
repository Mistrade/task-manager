import {
  EVENT_INFORMER_TAB_NAMES,
  SERVICES_NAMES,
} from '../../../../common/constants/enums';
import { getPath } from '../../../../common/functions';
import { useGetEventListQuery } from '@api/planning-api';
import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { EventIcon } from '@components/Icons/EventIcon';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useDebounce } from '@hooks/useDebounce';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { currentColor } from '@src/common/constants/constants';
import { UTC_OFFSET } from '@src/common/constants/defaultConstants';
import dayjs from 'dayjs';
import { memo, useState } from 'react';


// const TooltipButton = () => {
// 	const [isOpen, setIsOpen] = useState(false)
//
// 	return (
// 		<Tooltip
// 			content={}
// 		>
// 			<EmptyButtonStyled style={{display: 'flex', gap: 4, flexShrink: 0}}>
// 				<CutText rows={1} color={darkColor} fontSize={15}>
// 					Поиск событий
// 				</CutText>
// 				<ListIcon size={20} color={currentColor}/>
// 			</EmptyButtonStyled>
// 		</Tooltip>
// 	)
// }

export const FindEventsInput = memo(() => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 500);
  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);
  const { openModal } = useCreateEventModal();

  const { data: events, isFetching } = useGetEventListQuery(
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
      isLoading={isFetching}
      selectContainerViewCondition={!!value.length || !!events?.data?.length}
      icon={<ListIcon size={20} color={currentColor} />}
      renderData={(data, setIsOpenState) => (
        <VerticalScroll
          renderPattern={'top-bottom'}
          containerProps={{ width: '100%', minWidth: 300 }}
        >
          <SelectListContainer>
            {data.map((item) => (
              <SelectItemContainer
                key={item._id}
                onClick={() => {
                  setIsOpenState(false);
                  navigate(
                    getPath(
                      SERVICES_NAMES.PLANNER,
                      layout,
                      'event/info',
                      item._id,
                      EVENT_INFORMER_TAB_NAMES.ABOUT
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
                key={'create_event_from_filters'}
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
        </VerticalScroll>
      )}
    />
  );
});