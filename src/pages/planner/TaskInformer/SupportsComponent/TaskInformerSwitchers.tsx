import { FC, useMemo } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { disabledColor } from '@src/common/constants';
import { SwitchCalendarModeTab } from '@planner/Planner.styled';
import { Badge } from '@components/Badge/Badge';
import { EVENT_INFORMER_TAB_NAMES } from '../LeftBar/TaskInformerLeftBar';

export type TaskInformerSwitchersKeys =
  | 'about'
  | 'history'
  | 'comments'
  | 'members'
  | 'chains';

export interface TaskInformerSwitchersItem {
  title: string;
  key: EVENT_INFORMER_TAB_NAMES;
  badgeCount?: number;
}

type TaskInformerSwitcherBadges = {
  [key in EVENT_INFORMER_TAB_NAMES]?: number;
};

interface TaskInformerSwitchers {
  onChange?: (value: TaskInformerSwitchersItem) => void;
  selected: EVENT_INFORMER_TAB_NAMES;
  badges: TaskInformerSwitcherBadges;
}

export const isCorrectTaskInformerSwitcherName = (switcherName: string) => {
  return !!taskInformerSwitcherList.filter((item) => {
    return item.key === switcherName;
  }).length;
};

export const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
  { title: 'Инфо', key: EVENT_INFORMER_TAB_NAMES.ABOUT },
  { title: 'Чек-лист', key: EVENT_INFORMER_TAB_NAMES.CHECK_LIST },
  { title: 'История', key: EVENT_INFORMER_TAB_NAMES.HISTORY },
  { title: 'Комментарии', key: EVENT_INFORMER_TAB_NAMES.COMMENTS },
  { title: 'Участники', key: EVENT_INFORMER_TAB_NAMES.MEMBERS },
  { title: 'Связи', key: EVENT_INFORMER_TAB_NAMES.CHAINS },
];
export const TaskInformerSwitchers: FC<TaskInformerSwitchers> = ({
  selected,
  onChange,
  badges,
}) => {
  const badgesCount = useMemo((): Required<TaskInformerSwitcherBadges> => {
    return {
      comments: badges?.comments || 0,
      members: badges?.members || 0,
      about: badges?.about || 0,
      chains: badges?.chains || 0,
      history: badges?.history || 0,
      checkList: 0,
    };
  }, [badges]);

  return (
    <FlexBlock
      borderBottom={`1px solid ${disabledColor}`}
      justify={'flex-start'}
      align={'flex-end'}
    >
      {taskInformerSwitcherList.map((item) => (
        <SwitchCalendarModeTab
          style={{ gap: 4, display: 'flex' }}
          key={item.key}
          onClick={() => onChange && onChange(item)}
          isSelected={item.key === selected}
        >
          <span>{item.title}</span>
          {(badgesCount[item.key] && badgesCount[item.key] > 0 && (
            <Badge>{badgesCount[item.key]}</Badge>
          )) ||
            ''}
        </SwitchCalendarModeTab>
      ))}
    </FlexBlock>
  );
};
