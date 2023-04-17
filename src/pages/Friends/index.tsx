import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { selectCreateEventModalIsOpen } from '@selectors/planner';
import React from 'react';

import { FriendsLayouts } from '@pages/Friends/Layouts';
import { FriendsOptionPanel } from '@pages/Friends/OptionsPanel';

import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';
import {
  PlannerContainer,
  PlannerContentContainer,
} from '@planner/Planner.styled';

export const FriendsPage = () => {
  const isOpenModal = useAppSelector(selectCreateEventModalIsOpen);
  const { declineModal } = useCreateEventModal();
  return (
    <>
      <PlannerContainer>
        <PlannerContentContainer>
          <FriendsOptionPanel />
          <FriendsLayouts />
          {isOpenModal && (
            <CreateEventModal
              onSuccess={() => declineModal()}
              onClose={declineModal}
            />
          )}
        </PlannerContentContainer>
      </PlannerContainer>
    </>
  );
};
