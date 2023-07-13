import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { selectCreateEventModalIsOpen } from '@selectors/planner';
import React from 'react';

import { FriendsLayouts } from '@pages/friends/Layouts';
import { FriendsOptionPanel } from '@pages/friends/OptionsPanel';

import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';
import { PlannerContainer, PlannerContentContainer } from '@planner/styled';

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
