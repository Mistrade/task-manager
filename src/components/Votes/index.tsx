import { FC } from 'react';

import { Button } from '@components/Buttons/Buttons.styled';
import { Heading } from '@components/Text/Heading';
import { CutText } from '@components/Text/Text';

import { ObjectId } from '@api/rtk-api.types';

import {
  CheckListAddInput,
  CheckListUL,
  StyledCheckListItem,
} from '../CheckList';
import { FlexBlock } from '../LayoutComponents';
import { Tooltip } from '../Tooltip/Tooltip';

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
  return (
    <FlexBlock direction={'column'} gap={12}>
      <FlexBlock direction={'row'} gap={6} width={'100%'} wrap={'nowrap'}>
        <FlexBlock grow={1}>
          <Heading.H2>
            <CutText fontSize={18} rows={1}>
              {item.title}
            </CutText>
          </Heading.H2>
        </FlexBlock>
        <Tooltip
          content={
            <CheckListAddInput
              onSave={async (value) => {
                return true;
              }}
            />
          }
          placement={'bottom-end'}
          delay={[100, 200]}
          arrow={false}
          theme={'light'}
        >
          <Button>Добавить элемент</Button>
        </Tooltip>
      </FlexBlock>
      <FlexBlock direction={'column'} width={'100%'}>
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
