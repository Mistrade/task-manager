import { EVENT_DEPENDENCIES_MAP } from '../event-chains.types';
import {
  ConnectChainsCard,
  ConnectChainsCardObject,
} from './ConnectChainsCard';
import { DontHoveredButton } from '@components/Buttons/EmptyButton.styled';
import { ChildOfIcon, ParentOfIcon } from '@components/Icons/Icons';
import { VerticalScroll } from '@components/LayoutComponents';
import { FC } from 'react';
import styled from 'styled-components';


export const ConnectTypesArray: Array<ConnectChainsCardObject> = [
  {
    type: EVENT_DEPENDENCIES_MAP.CHILD_OF,
    title: 'Дочерние',
    description:
      'Добавьте вложенные события, за прогрессом которых сможете следить из раздела "Связи"',
    icon: (attr) => <ChildOfIcon {...attr} />,
  },
  {
    type: EVENT_DEPENDENCIES_MAP.PARENT_OF,
    title: 'Родители',
    description:
      'Свяжите текущее событие, с другим, которое станет родителем для текущего',
    icon: (attr) => <ParentOfIcon {...attr} />,
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
    <VerticalScroll
      renderPattern={'top-bottom'}
      containerProps={{ height: '100%' }}
    >
      <ShowcaseContainer>
        {ConnectTypesArray.map((item, index) => (
          <DontHoveredButton
            key={item.type}
            onClick={(event) => {
              event.stopPropagation();
              onSelect && onSelect(item);
            }}
          >
            <ConnectChainsCard {...item} animationIndex={index} />
          </DontHoveredButton>
        ))}
      </ShowcaseContainer>
    </VerticalScroll>
  );
};