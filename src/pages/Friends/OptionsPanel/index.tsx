import {
  FRIENDS_ROUTES,
  FRIENDS_ROUTES_PAGE_NAMES,
  SERVICES_NAMES,
} from '@src/common/constants';
import { getPath } from '@src/common/functions';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { LinkSolid } from '@planner/Header/ModeSwitch/Item';
import { PlannerOptionPanelContainer } from '@planner/Planner.styled';

export const FriendsOptionPanel = () => {
  return (
    <PlannerOptionPanelContainer>
      <FlexBlock direction={'column'} gap={8}>
        {Object.values(FRIENDS_ROUTES).map((item) => (
          <LinkSolid
            key={item}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              textAlign: 'left',
            }}
            icon={FRIENDS_ROUTES_PAGE_NAMES[item].icon}
            title={FRIENDS_ROUTES_PAGE_NAMES[item].title}
            to={getPath(SERVICES_NAMES.FRIENDS, item)}
          />
        ))}
      </FlexBlock>
    </PlannerOptionPanelContainer>
  );
};
