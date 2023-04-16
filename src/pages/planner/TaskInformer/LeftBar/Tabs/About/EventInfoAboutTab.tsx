import dayjs from 'dayjs';
import { FC, memo } from 'react';

import { DatePicker } from '@components/DatePicker/DatePicker';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { TaskInformerDescription } from '@planner/TaskInformer/SupportsComponent/TaskInformerDescription';
import { EventInfoUpdateFn } from '@planner/TaskInformer/SupportsComponent/ToggleTaskInformerButtons';
import { EventInfoBaseProps } from '@planner/planner.types';


export interface EventInfoAboutTabProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
}

export const EventInfoAboutTab: FC<EventInfoAboutTabProps> = memo(
  ({ eventInfo, updateFn }) => {
    return (
      <ScrollVerticalView renderPattern={'top-bottom'}>
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
      </ScrollVerticalView>
    );
  },
  (prev, next) =>
    prev.eventInfo.time === next.eventInfo.time &&
    prev.eventInfo.timeEnd === next.eventInfo.timeEnd &&
    prev.eventInfo.description.length === next.eventInfo.description.length
);