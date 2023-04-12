import {
  ConnectChainsCard,
  ConnectChainsCardObject,
} from './ConnectChainsCard';
import {
  ApprovedAfterIcon,
  ChildOfIcon,
  CompletedAfterIcon,
  ParentOfIcon,
} from '@components/Icons/Icons';
import { FC } from 'react';
import { DontHoveredButton } from '@components/Buttons/EmptyButton.styled';
import styled from 'styled-components';

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
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-column-gap: 12px;
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  grid-row-gap: 12px;
`;

export const ChainsShowcase: FC<ChainsShowcaseProps> = ({ onSelect }) => {
  return (
    <ShowcaseContainer>
      {ConnectTypesArray.map((item) => (
        <DontHoveredButton
          style={{ width: '100%', height: '100%' }}
          onClick={(event) => {
            event.stopPropagation();
            onSelect && onSelect(item);
          }}
        >
          <ConnectChainsCard {...item} />
        </DontHoveredButton>
      ))}
    </ShowcaseContainer>
  );
};
