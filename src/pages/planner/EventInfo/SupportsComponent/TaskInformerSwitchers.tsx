import { setEventInfoTabName } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventInfoTabName } from '@selectors/planner';
import { FC, memo, useCallback } from 'react';
import styled from 'styled-components';

import { disabledColor } from '@src/common/constants/constants';
import { EVENT_INFORMER_TAB_NAMES } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';

import { SwitchCalendarModeTab } from '@planner/styled';

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

const Container = styled('div')`
  display: flex;
  border-bottom: 1px solid ${disabledColor};
  justify-content: flex-start;
  align-items: flex-end;
`;

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
    <Container>
      {taskInformerSwitcherList.map((item) => (
        <SwitchCalendarModeTab
          key={item.key}
          isSelected={item.key === tabName}
          onClick={() => changeTabNameHandle(item.key)}
        >
          {item.title}
        </SwitchCalendarModeTab>
      ))}
    </Container>
  );
}, disableReRender);
