import { kitColors } from 'chernikov-kit';
import { FC, ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { Arrow, IconProps, PlusIcon } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';


export interface AccordionProps {
  containerProps?: FlexBlockProps;
  title: ReactNode;
  children: ReactNode;
  initialState?: boolean;
  iconProps?: IconProps;
  zIndex?: number;
  action?: {
    type: 'add';
    onClick: () => void;
  };
}

const ContentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 6px;
  align-items: center;
  background-color: inherit;
`;

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ActionContainer = styled('div')`
  display: flex;
  justify-self: flex-end;
`;

const ArrowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: flex-end;
`;

const IsOpenContainer = styled('div')`
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  height: fit-content;
  padding: 6px 0px;
  z-index: 0;
  display: flex;
`;

export const Accordion: FC<AccordionProps> = ({
  title,
  zIndex,
  iconProps,
  children,
  initialState = true,
  action,
  containerProps,
}) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  return (
    <FlexBlock
      {...containerProps}
      width={'100%'}
      direction={'column'}
      additionalCss={css`
        transition: all 0.6s ease-in-out;
        z-index: 0;
        height: fit-content;
        // max-height:
        //   ? pxToCssValue(ref.current ? ref.current.offsetHeight + 50 : 'none')
        //   : pxToCssValue(titleContainerRef.current?.offsetHeight || 'none')};
        //overflow: hidden;
      `}
    >
      <ContentContainer ref={titleContainerRef}>
        <ArrowContainer>
          <EmptyButtonStyled
            onClick={() => setIsOpen((prev) => !prev)}
            style={{
              padding: 4,
              transition: `transform .3s ease-in`,
              transform: `rotate(${isOpen ? '90deg' : '0deg'})`,
            }}
          >
            <Arrow color={kitColors.primary} {...iconProps} />
          </EmptyButtonStyled>
        </ArrowContainer>
        <TitleContainer>{title}</TitleContainer>
        {action && (
          <ActionContainer>
            <EmptyButtonStyled onClick={action.onClick}>
              <PlusIcon size={20} />
            </EmptyButtonStyled>
          </ActionContainer>
        )}
      </ContentContainer>
      {isOpen && <IsOpenContainer ref={ref}>{children}</IsOpenContainer>}
    </FlexBlock>
  );
};