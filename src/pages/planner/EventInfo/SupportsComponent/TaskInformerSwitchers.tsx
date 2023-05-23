import { setEventInfoTabName } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventInfoTabName } from '@selectors/planner';
import { FC, memo, useCallback } from 'react';
import styled from 'styled-components';

import {
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants/constants';
import { EVENT_INFORMER_TAB_NAMES } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';

import { Switcher } from '@components/Switcher/Switcher';

export interface TaskInformerSwitchersItem {
  title: string;
  type: EVENT_INFORMER_TAB_NAMES;
  badgeCount?: number;
}

interface TaskInformerSwitchers {}

export const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
  { title: 'Инфо', type: EVENT_INFORMER_TAB_NAMES.ABOUT },
  { title: 'Чек-лист', type: EVENT_INFORMER_TAB_NAMES.CHECK_LIST },
  { title: 'История', type: EVENT_INFORMER_TAB_NAMES.HISTORY },
  { title: 'Комментарии', type: EVENT_INFORMER_TAB_NAMES.COMMENTS },
  { title: 'Участники', type: EVENT_INFORMER_TAB_NAMES.MEMBERS },
  { title: 'Связи', type: EVENT_INFORMER_TAB_NAMES.CHAINS },
  { title: 'Голосования', type: EVENT_INFORMER_TAB_NAMES.VOTES },
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
      <Switcher
        scrollOptions={{ buttonColor: pageHeaderColor }}
        switchersList={taskInformerSwitcherList}
        selected={tabName}
        onClick={(item) => changeTabNameHandle(item.type)}
      />
    </Container>
  );
}, disableReRender);
