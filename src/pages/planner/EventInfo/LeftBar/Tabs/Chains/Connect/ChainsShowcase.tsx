import { FC } from 'react';
import styled from 'styled-components';

import { DontHoveredButton } from '@components/Buttons/EmptyButton.styled';
import {
  ApprovedAfterIcon,
  ChildOfIcon,
  CompletedAfterIcon,
  ParentOfIcon,
} from '@components/Icons/Icons';
import { VerticalScroll } from '@components/LayoutComponents';

import {
  ConnectChainsCard,
  ConnectChainsCardObject,
} from './ConnectChainsCard';

export const ConnectTypesArray: Array<ConnectChainsCardObject> = [
  {
    type: 'parentOf',
    title: 'ParentOf (dev)',
    description:
      'Свяжите текущее событие, с другим, которое станет родителем для текущего',
    icon: (attr) => <ParentOfIcon {...attr} />,
  },
  {
    type: 'childOf',
    title: 'ChildOf (dev)',
    description:
      'Добавьте вложенные события, за прогрессом которых сможете следить из раздела "Связи"',
    icon: (attr) => <ChildOfIcon {...attr} />,
  },
  {
    type: 'completed-after',
    title: 'CompletedAfter (dev)',
    description:
      'Установите автоматическое выполнение текущего события, как только будут выполнены все выбранные события для этого типа связи',
    icon: (attr) => <CompletedAfterIcon {...attr} />,
  },
  {
    type: 'approved-after',
    title: 'ApprovedAfter (dev)',
    description:
      'Установите условие, которое не позволит выполнить текущее событие, пока не будут выполнены все события в этом типе связи',
    icon: (attr) => <ApprovedAfterIcon {...attr} />,
  },
];

export interface ChainsShowcaseProps {
  onSelect?: (item: ConnectChainsCardObject) => void;
}

const ShowcaseContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;

  & > * {
    flex: 1 0 calc(25% - 12px);
    min-width: 200px;
  }
`;

export const ChainsShowcase: FC<ChainsShowcaseProps> = ({ onSelect }) => {
  return (
    <VerticalScroll renderPattern={'top-bottom'}>
      <ShowcaseContainer>
        {ConnectTypesArray.map((item) => (
          <DontHoveredButton
            key={item.type}
            onClick={(event) => {
              event.stopPropagation();
              onSelect && onSelect(item);
            }}
          >
            <ConnectChainsCard {...item} />
          </DontHoveredButton>
        ))}
      </ShowcaseContainer>
    </VerticalScroll>
  );
};
