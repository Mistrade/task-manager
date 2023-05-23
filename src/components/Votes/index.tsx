import { FC, useState } from 'react';

import { ObjectId } from '@api/rtk-api.types';

import { CheckListUL, StyledCheckListItem } from '../CheckList';
import { FlexBlock } from '../LayoutComponents';

interface VoteItem {
  _id: ObjectId;
  name: string;
  likes: Array<ObjectId>; //список юзеров;
  dislikes: Array<ObjectId>; //список юзеров;
  statusByCurrentUser: VOTE_STATUSES;
}

export enum VOTE_STATUSES {
  'LIKE' = 'like',
  'DISLIKE' = 'dislike',
}

interface VoteSelectedObject {
  [key: string]: VOTE_STATUSES;
}

export interface VoteObject {
  title: string;
  elements: Array<VoteItem>;
  selected: VoteSelectedObject;
}

interface VoteProps {
  item: VoteObject;
}

interface VoteItemProps {
  data: VoteItem;
  status?: VOTE_STATUSES;
  likes: Array<ObjectId>;
  dislikes: Array<ObjectId>;
}

const VoteItem: FC<VoteItemProps> = ({ data, status, likes, dislikes }) => {
  return <StyledCheckListItem>{data.name}</StyledCheckListItem>;
};

const Votes: FC<VoteProps> = ({ item }) => {
  //onSave(item: VoteObject): Promise<any>
  //on
  const [addElementTooltipState, setAddElementTooltipState] = useState(false);

  return (
    <FlexBlock direction={'column'} gap={12}>
      <FlexBlock direction={'column'} width={'100%'} gap={8}>
        <CheckListUL>
          {item.elements.map((voteItem) => (
            <VoteItem
              data={voteItem}
              likes={voteItem.likes}
              dislikes={voteItem.dislikes}
              key={voteItem._id}
              status={voteItem.statusByCurrentUser}
            />
          ))}
        </CheckListUL>
      </FlexBlock>
    </FlexBlock>
  );
};

export default Votes;
