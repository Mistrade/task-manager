import { Switcher, SwitcherItem } from '@components/Switcher/Switcher';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { PlannerNavLink } from '@planner/styled';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectEventInfoTabName } from '@selectors/planner';
import {
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants/constants';
import { EVENT_INFORMER_TAB_NAMES } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';
import { FC, memo } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';


export interface TaskInformerSwitchersItem {
  title: string;
  type: string;
  badgeCount?: number;
}

interface TaskInformerSwitchers {}

export const taskInformerSwitcherList: Array<
  SwitcherItem<EVENT_INFORMER_TAB_NAMES>
> = [
  { title: 'Инфо', type: EVENT_INFORMER_TAB_NAMES.ABOUT },
  { title: 'Чек-лист', type: EVENT_INFORMER_TAB_NAMES.CHECK_LIST },
  { title: 'История', type: EVENT_INFORMER_TAB_NAMES.HISTORY },
  { title: 'Комментарии', type: EVENT_INFORMER_TAB_NAMES.COMMENTS },
  { title: 'Участники', type: EVENT_INFORMER_TAB_NAMES.MEMBERS },
  { title: 'Связи', type: EVENT_INFORMER_TAB_NAMES.CHAINS },
  { title: 'Голосования', type: EVENT_INFORMER_TAB_NAMES.VOTES },
  { title: 'Финансы', type: EVENT_INFORMER_TAB_NAMES.FINANCE },
  { title: 'Уведомления', type: EVENT_INFORMER_TAB_NAMES.NOTIFICATIONS },
  { title: 'Интеграции', type: EVENT_INFORMER_TAB_NAMES.INTEGRATIONS },
];

const Container = styled('div')`
  display: flex;
  border-bottom: 1px solid ${disabledColor};
  justify-content: flex-start;
  align-items: flex-end;
`;

export const TaskInformerSwitchers: FC<TaskInformerSwitchers> = memo(() => {
  const tabName = useAppSelector(plannerSelectEventInfoTabName);
  const navigate = useSearchNavigate();
  const location = useLocation();

  return (
    <Container>
      <Switcher
        scrollOptions={{ buttonColor: pageHeaderColor }}
        switchersList={taskInformerSwitcherList}
        selected={tabName}
        onClick={(item) => navigate(item.type)}
        component={({ item }) => (
          <PlannerNavLink
            to={{
              pathname: item.type,
              search: location.search,
            }}
            relative={'route'}
          >
            {item.title}
          </PlannerNavLink>
        )}
      />
    </Container>
  );
}, disableReRender);