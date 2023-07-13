import {
  darkColor,
  defaultColor,
} from '../../../../../../common/constants/constants';
import { EventVotesHeader } from './Header';
import { CopyToClipboardButton } from '@components/Buttons/CopyToClipboardButton';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { CheckListAddInput } from '@components/CheckList';
import { PencilIcon } from '@components/Icons/Icons';
import { TooltipIcon } from '@components/Icons/TooltipIcon';
import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import Votes, { VOTE_STATUSES, VoteObject } from '@components/Votes';
import { useState } from 'react';


export const EventVotes = () => {
  const [selectedKey, setSelectedKey] = useState('react-developer');

  const [voteItem, setVoteItem] = useState<VoteObject>(() => ({
    title: 'Голосование за пидора',
    elements: [
      {
        name: 'Андрей Черников',
        _id: 'andrey_chernikov',
        statusByCurrentUser: VOTE_STATUSES.DISLIKE,
        likes: [],
        dislikes: [],
      },
      {
        name: 'Ильдар Усманов',
        _id: 'ildar_usmanov',
        statusByCurrentUser: VOTE_STATUSES.DISLIKE,
        likes: [],
        dislikes: [],
      },
      {
        name: 'Влад Валеев',
        _id: 'vlad_valeev',
        statusByCurrentUser: VOTE_STATUSES.LIKE,
        likes: [],
        dislikes: [],
      },
    ],
    selected: {},
  }));

  return (
    <FlexBlock height={'100%'} direction={'column'} width={'100%'} gap={12}>
      <EventVotesHeader selected={selectedKey} setSelected={setSelectedKey} />
      <FlexBlock grow={3} overflow={'hidden'}>
        <VerticalScroll
          placementStatic={'top'}
          gap={12}
          staticContent={
            <FlexBlock direction={'column'} gap={18}>
              <FlexBlock
                width={'100%'}
                pl={8}
                gap={8}
                align={'center'}
                wrap={'nowrap'}
              >
                <CutText
                  fontSize={18}
                  rows={1}
                  style={{ fontWeight: 'bold' }}
                  color={darkColor}
                >
                  Голосование за пидора
                </CutText>
                <FlexBlock shrink={0} gap={8} align={'center'}>
                  <EmptyButtonStyled>
                    <PencilIcon size={20} />
                  </EmptyButtonStyled>
                  <CopyToClipboardButton content={''} />
                  <EmptyButtonStyled>
                    <TooltipIcon size={20} color={defaultColor} />
                  </EmptyButtonStyled>
                </FlexBlock>
              </FlexBlock>
              <CheckListAddInput
                label={'Добавьте объекты для голосования'}
                onSave={async (value) => {
                  return true;
                }}
              />
            </FlexBlock>
          }
          renderPattern={'top-bottom'}
        >
          <Votes item={voteItem} />
        </VerticalScroll>
      </FlexBlock>
    </FlexBlock>
  );
};