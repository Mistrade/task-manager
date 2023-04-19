import { FC } from 'react';
import { BaseCreateEventTabProps } from 'src/pages/planner/Forms/CreateEvent/Tabs/Info';

import { SERVICES_NAMES } from '@src/common/constants';

import { TimeBadge } from '@components/Badge/Badge';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Heading } from '@components/Text/Heading';

import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';

import { useGetFriendsListQuery } from '@api/friends-api';

export interface CreateEventMembersTabProps extends BaseCreateEventTabProps {}

export enum EVENT_ACCESS_RIGHTS {
  EDITOR = 'editor',
  VIEW_ONLY = 'viewer',
}

export const CreateEventMembersTab: FC<CreateEventMembersTabProps> = ({
  values,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
}) => {
  const { data: myFriends } = useGetFriendsListQuery();

  return (
    <ScrollVerticalView
      placementStatic={'top'}
      renderPattern={'top-bottom'}
      gap={12}
      staticContent={
        <Heading.H2>
          <FlexBlock gap={6}>
            <CutText rows={1} fontSize={18}>
              Выбрано участников
            </CutText>
            <TimeBadge>{Object.keys(values.members).length}</TimeBadge>
          </FlexBlock>
        </Heading.H2>
      }
    >
      {!!myFriends?.data?.length ? (
        <FlexBlock direction={'column'} gap={8}>
          {myFriends.data.map((item) => {
            return (
              <Checkbox
                type={'checkbox'}
                title={
                  <LinkStyled
                    to={`/${SERVICES_NAMES.PROFILE}/${item._id}`}
                    target={'_blank'}
                  >
                    {`${item.surname} ${item.name}`}
                  </LinkStyled>
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    const obj = { ...values.members };
                    obj[item._id] = item;
                    setFieldValue('members', obj);
                  } else {
                    const obj = { ...values.members };
                    delete obj[item._id];
                    setFieldValue('members', obj);
                  }
                }}
                isChecked={!!values.members[item._id]}
              />
            );
          })}
        </FlexBlock>
      ) : (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <FlexBlock maxWidth={500}>
            <ErrorScreen
              title={'Вы пока не добавили ни одного участника к событию'}
              errorType={'SYSTEM_ERROR'}
              description={'Добавляемые участники будут отображаться тут'}
            />
          </FlexBlock>
        </FlexBlock>
      )}
    </ScrollVerticalView>
  );
};
