import { ReactNode } from 'react';
import styled from 'styled-components';
import { FCWithChildren } from '../../../pages/Planner/planner.types';
import { FlexBlock } from '../FlexBlock';
import { hideScrollBar } from '../../Switcher/Switcher';

export interface ScrollVerticalViewProps {
  placementStatic?: 'top' | 'bottom';
  gap?: number;
  staticContent?: ReactNode;
  renderPattern?: 'bottom-top' | 'top-bottom';
}

const Container = styled('div')<Pick<ScrollVerticalViewProps, 'renderPattern'>>`
  width: 100%;
  //height: 100%;
  flex-grow: 3;
  display: flex;
  flex-direction: ${(_) =>
    _.renderPattern === 'top-bottom' ? 'column' : 'column-reverse'};
  overflow-x: hidden;
  overflow-y: auto;
  ${hideScrollBar}
`;

Container.defaultProps = {
  className: 'scroll__view__horizontal--container',
};

const StaticContainer = styled('div')`
  width: 100%;
  flex-grow: 0;
`;

StaticContainer.defaultProps = {
  className: 'scroll__static--container',
};

export const ScrollVerticalView: FCWithChildren<ScrollVerticalViewProps> = ({
  children,
  placementStatic,
  staticContent,
  gap,
  renderPattern = 'bottom-top',
}) => {
  return (
    <FlexBlock width={'100%'} height={'100%'} direction={'column'} gap={gap}>
      {placementStatic === 'top' && staticContent && (
        <StaticContainer>{staticContent}</StaticContainer>
      )}
      <Container renderPattern={renderPattern}>{children}</Container>
      {placementStatic === 'bottom' && staticContent && (
        <StaticContainer>{staticContent}</StaticContainer>
      )}
    </FlexBlock>
  );
};
