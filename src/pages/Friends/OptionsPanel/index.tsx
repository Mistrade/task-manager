import { FRIENDS_ROUTES_PAGE_NAMES } from '@src/common/constants/defaultConstants';

import { FlexBlock } from '@components/LayoutComponents';

import { LinkSolid } from '@planner/OptionsPanel/ModeSwitch/Item';
import { PlannerOptionPanelContainer } from '@planner/Planner.styled';

export const FriendsOptionPanel = () => {
  return (
    <PlannerOptionPanelContainer>
      <FlexBlock direction={'column'} gap={8}>
        {Object.values(FRIENDS_ROUTES_PAGE_NAMES).map((item) => (
          <LinkSolid
            end={item.matchEndPath}
            relative={undefined}
            key={item.title}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              textAlign: 'left',
            }}
            icon={item.icon}
            title={item.title}
            to={item.path}
          />
        ))}
      </FlexBlock>
    </PlannerOptionPanelContainer>
  );
};
