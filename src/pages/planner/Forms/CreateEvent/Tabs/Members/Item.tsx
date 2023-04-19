import { ICreateEventMemberItem } from '@planner/types';

export interface CreateEventMembersItemProps {
  isChecked?: boolean;
  onChangeState?: (item: ICreateEventMemberItem) => void;
  value: ICreateEventMemberItem;
}

export const CreateEventMembersItem = () => {
  return <></>;
};