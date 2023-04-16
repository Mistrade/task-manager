import { FriendsLayouts } from '@pages/Friends/Layouts';
import { FriendsOptionPanel } from '@pages/Friends/OptionsPanel';

import {
  PlannerContainer,
  PlannerContentContainer,
} from '@planner/Planner.styled';

export const FriendsPage = () => {
  return (
    <>
      <PlannerContainer>
        <PlannerContentContainer>
          <FriendsOptionPanel />
          <FriendsLayouts />
        </PlannerContentContainer>
      </PlannerContainer>
    </>
  );
};
