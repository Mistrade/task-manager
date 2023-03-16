import { EventInfoBaseProps } from '../../../../planner.types';
import { EventInfoUpdateFn } from '../../../SupportsComponent/ToggleTaskInformerButtons';
import { FC } from 'react';
import { FlexBlock } from '../../../../../../components/LayoutComponents/FlexBlock';
import { DatePicker } from '../../../../../../components/DatePicker/DatePicker';
import dayjs from 'dayjs';
import { TaskInformerDescription } from '../../../SupportsComponent/TaskInformerDescription';
import { useSearchNavigate } from '../../../../../../hooks/useSearchNavigate';

export interface EventInfoAboutTabProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
}

export const EventInfoAboutTab: FC<EventInfoAboutTabProps> = ({
  eventInfo,
  updateFn,
}) => {
  const navigate = useSearchNavigate();
  return (
    <FlexBlock direction={'column'} gap={12}>
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
  );
};
