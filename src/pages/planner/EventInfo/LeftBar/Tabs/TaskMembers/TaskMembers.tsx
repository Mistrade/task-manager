import { FC } from 'react';

import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';
import { Loader } from '@components/Loaders/Loader';

import { useGetEventInvitesListQuery } from '@api/planning-api';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';

import { CenteredContainer } from '../../../../../../routes/Interceptors/SessionInterceptor';
import { MemberItem } from './MemberItem';

export interface TaskMembersProps {
  taskItem: EventInfoModel;
}

export const TaskMembers: FC<TaskMembersProps> = ({ taskItem }) => {
  const { currentData: Invites, isLoading } = useGetEventInvitesListQuery(
    taskItem._id,
    {
      skip: !taskItem._id || taskItem.accessRights === 'viewer',
    }
  );

  if (Invites?.data) {
    return (
      <VerticalScroll renderPattern={'top-bottom'}>
        <FlexBlock direction={'column'} gap={8}>
          <MemberItem user={taskItem.userId} rights={'owner'} />
          {Invites.data.map((item) => (
            <MemberItem user={item.user} rights={item.rights} />
          ))}
        </FlexBlock>
      </VerticalScroll>
    );
  }

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loader isActive={true} title={'Загрузка списка участников'} />
      </CenteredContainer>
    );
  }

  return (
    <CenteredContainer>
      <ErrorScreen
        title={'Недостаточно прав доступа для просмотра этого раздела'}
        errorType={'ERR_FORBIDDEN'}
      />
    </CenteredContainer>
  );
};
