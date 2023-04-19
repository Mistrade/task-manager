import { ICreateEventMemberItem } from '@planner/planner.types';

export interface CreateEventMembersItemProps {
  isChecked?: boolean;
  onChangeState?: (item: ICreateEventMemberItem) => void;
  value: ICreateEventMemberItem;
}

export const CreateEventMembersItem = () => {
  return <></>;
};