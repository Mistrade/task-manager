import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { setEventInfoTabName } from '@planner-reducer/index';
import { SwitchCalendarModeTab } from '@planner/Planner.styled';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventInfoTabName } from '@selectors/planner';
import { disabledColor } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';
import { FC, memo, useCallback } from 'react';
import { EVENT_INFORMER_TAB_NAMES } from '../LeftBar/TaskInformerLeftBar';

export interface TaskInformerSwitchersItem {
  title: string;
  key: EVENT_INFORMER_TAB_NAMES;
  badgeCount?: number;
}

interface TaskInformerSwitchers {}

export const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
  { title: 'Инфо', key: EVENT_INFORMER_TAB_NAMES.ABOUT },
  { title: 'Чек-лист', key: EVENT_INFORMER_TAB_NAMES.CHECK_LIST },
  { title: 'История', key: EVENT_INFORMER_TAB_NAMES.HISTORY },
  { title: 'Комментарии', key: EVENT_INFORMER_TAB_NAMES.COMMENTS },
  { title: 'Участники', key: EVENT_INFORMER_TAB_NAMES.MEMBERS },
  { title: 'Связи', key: EVENT_INFORMER_TAB_NAMES.CHAINS },
];

export const TaskInformerSwitchers: FC<TaskInformerSwitchers> = memo(() => {
  const tabName = useAppSelector(plannerSelectEventInfoTabName);
  const dispatch = useAppDispatch();
  const changeTabNameHandle = useCallback(
    (tabName: EVENT_INFORMER_TAB_NAMES) => {
      dispatch(setEventInfoTabName(tabName));
    },
    []
  );
  return (
    <FlexBlock
      borderBottom={`1px solid ${disabledColor}`}
      justify={'flex-start'}
      align={'flex-end'}
    >
      {taskInformerSwitcherList.map((item) => (
        <SwitchCalendarModeTab
          isSelected={item.key === tabName}
          onClick={() => changeTabNameHandle(item.key)}
        >
          {item.title}
        </SwitchCalendarModeTab>
      ))}
    </FlexBlock>
  );
}, disableReRender);
