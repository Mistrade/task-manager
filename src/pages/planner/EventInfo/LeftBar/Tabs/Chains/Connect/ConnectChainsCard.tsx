import { FC, ReactNode, useRef } from 'react';
import { useIntersection } from 'react-use';
import styled from 'styled-components';

import {
  currentColor,
  darkColor,
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';

import { DefaultAnimationTimingFn } from '../../../../../../../common/constants/styles';
import { ConnectChainsType } from '../event-chains.types';

export interface ConnectChainsCardObject {
  type: ConnectChainsType;
  icon: (attr: FlexBlockProps) => ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface ConnectChainsCardProps extends ConnectChainsCardObject {
  animationIndex?: number;
}

const Container = styled('div')<{ animationIndex?: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 200px;
  border: 2px solid ${disabledColor};
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  border-radius: ${borderRadiusSize.sm};
  transition: all 0.2s ease-in;
  transform: scale(0.7);

  //@media (prefers-reduced-motion: no-preference) {
  //  .animation {
  //    animation: none;
  //    -webkit-animation: none;
  //  }
  //}

  &.bubble--animation {
    opacity: 1;
    transform: scale(1);
    transition: transform 0.3s ${DefaultAnimationTimingFn},
      opacity 0.3s ${DefaultAnimationTimingFn};
    transition-delay: ${(props) => (props.animationIndex || 0) * 60}ms;
  }

  &:hover {
    border: 2px solid ${currentColor};
    cursor: pointer;
  }

  &:hover .chains--icon__container {
    transform: scale(1.2);
  }
`;

const IconContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  transition: all 0.2s ease-in;
`;

IconContainer.defaultProps = {
  className: 'chains--icon__container',
};

const TitleContainer = styled('div')`
  border-top: 1px solid ${disabledColor};
  display: flex;
  justify-content: flex-start;
  background-color: ${pageHeaderColor};
  width: 100%;
  padding: 12px;
  gap: 12px;
  flex-direction: column;
  flex-grow: 3;
`;

const DescriptionContainer = styled('p')`
  display: flex;
  margin: 0;
  font-size: 15px;
  justify-content: center;
  text-align: center;
  color: ${darkColor};
`;

const Title = styled(Heading.H3)`
  color: ${currentColor};
  text-align: center;
`;

export const ConnectChainsCard: FC<ConnectChainsCardProps> = ({
  icon,
  title,
  description,
  type,
  animationIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const view = useIntersection(ref, {
    rootMargin: '0px',
    threshold: 0,
  });

  console.log(view);
  return (
    <Container
      ref={ref}
      className={
        view?.isIntersecting && view?.target ? `bubble--animation` : ''
      }
      animationIndex={animationIndex ? animationIndex % 4 : 0}
    >
      <IconContainer>{icon({ width: 180, height: 180 })}</IconContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <DescriptionContainer>{description}</DescriptionContainer>
      </TitleContainer>
    </Container>
  );
};
