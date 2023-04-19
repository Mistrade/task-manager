import dayjs from 'dayjs';
import { FC, memo } from 'react';

import { DatePicker } from '@components/DatePicker/DatePicker';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';

import { TaskInformerDescription } from '@planner/EventInfo/SupportsComponent/TaskInformerDescription';
import { EventInfoUpdateFn } from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';
import { EventInfoBaseProps } from '@planner/types';


export interface EventInfoAboutTabProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
}

export const EventInfoAboutTab: FC<EventInfoAboutTabProps> = memo(
  ({ eventInfo, updateFn }) => {
    return (
      <VerticalScroll renderPattern={'top-bottom'}>
        <FlexBlock direction={'column'} gap={12} pb={40}>
          <FlexBlock direction={'row'} gap={12}>
            <DatePicker
              label={'Дата начала'}
              currentDate={dayjs(eventInfo.time).toDate()}
              onChange={async (date) => {
                await updateFn('time', dayjs(date).toString());
              }}
              useForceUpdateValue={true}
            />
            <DatePicker
              label={'Дата завершения'}
              currentDate={dayjs(eventInfo.timeEnd).toDate()}
              onChange={async (date) => {
                await updateFn('timeEnd', dayjs(date).toString());
              }}
              useForceUpdateValue={true}
            />
          </FlexBlock>
          <TaskInformerDescription eventInfo={eventInfo} updateFn={updateFn} />
        </FlexBlock>
      </VerticalScroll>
    );
  },
  (prev, next) =>
    prev.eventInfo.time === next.eventInfo.time &&
    prev.eventInfo.timeEnd === next.eventInfo.timeEnd &&
    prev.eventInfo.description.length === next.eventInfo.description.length
);