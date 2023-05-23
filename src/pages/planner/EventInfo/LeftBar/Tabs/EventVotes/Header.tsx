import { FC } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { Switcher } from '@components/Switcher/Switcher';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { ObjectId } from '@api/rtk-api.types';

import {
  currentColor,
  disabledColor,
} from '../../../../../../common/constants/constants';

interface IEventVotesHeaderProps {
  selected: ObjectId;

  setSelected(key: ObjectId): void;
}

interface VoteModel {
  _id: ObjectId; //Ид
  title: string; // Заголовок
  isAnonymousVote: boolean; //Анонимное голосование
  hint?: string; //Подсказка
  owner: ObjectId; //Владелец голосования
  listType: 'ul' | 'ol';
  elements: Array<{
    _id: ObjectId;
    title: string;
    rating: number;
    likesCount: number;
    dislikesCount: number;
    myResult: 'like' | 'dislike';
  }>;
}

export const EventVotesHeader: FC<IEventVotesHeaderProps> = ({
  setSelected,
  selected,
}) => {
  return (
    <FlexBlock
      width={'100%'}
      direction={'row'}
      gap={8}
      align={'center'}
      shrink={0}
      borderBottom={`1px solid ${disabledColor}`}
    >
      <Switcher
        useShadow={true}
        selected={selected}
        scrollOptions={{ scrollStepInPx: 150 }}
        tabProps={{ textAlign: 'center' }}
        switchersList={[
          { title: 'Голосование за пидора', type: 'pidor_votes' },
          {
            title: 'Голосование за лучшего React-разработчика',
            type: 'react-developer',
          },
          {
            title: 'Голосование за новый ноутбук',
            type: 'new-notebook',
          },
          {
            title: 'Голосование за лучший ресторан',
            type: 'the-best-restaraunt',
          },
          {
            title: 'Что изучать дальше?',
            type: 'what-learn?',
          },
          { title: 'МВП Спринта', type: 'mvp' },
          { title: 'Местоположение офиса', type: 'office-address' },
          { title: 'Какой кофе выбрать?', type: 'coffee' },
          {
            title: 'Где завтракать будем?',
            type: 'breakfest-place',
          },
          {
            title: 'Какую машину покупать?',
            type: 'car-to-buy',
          },
        ]}
        onClick={(item) => {
          setSelected(item.type);
        }}
      />
      <div style={{ height: 40, borderLeft: `1px solid ${disabledColor}` }} />
      <Tooltip
        content={'Создать новое голосование'}
        theme={'light'}
        delay={100}
        placement={'right'}
      >
        <EmptyButtonStyled>
          <PlusIcon size={24} color={currentColor} />
        </EmptyButtonStyled>
      </Tooltip>
    </FlexBlock>
  );
};
