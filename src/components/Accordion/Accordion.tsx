import { FC, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

import { currentColor } from '@src/common/constants/constants';

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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 6px 0px;
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

  return (
    <FlexBlock
      {...containerProps}
      width={'100%'}
      direction={'column'}
      additionalCss={css`
        transition: 0.6s ease-in-out;
      `}
    >
      <ContentContainer>
        <ArrowContainer>
          <EmptyButtonStyled
            onClick={() => setIsOpen((prev) => !prev)}
            style={{
              padding: 4,
              transition: `transform .3s ease-in`,
              transform: `rotate(${isOpen ? '90deg' : '0deg'})`,
            }}
          >
            <Arrow color={currentColor} {...iconProps} />
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
      {isOpen && <IsOpenContainer>{children}</IsOpenContainer>}
    </FlexBlock>
  );
};
