import { FC, ReactNode, useState } from 'react';
import { css } from 'styled-components';

import { currentColor } from '@src/common/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { Arrow, IconProps, PlusIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';


export interface AccordionProps {
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

export const Accordion: FC<AccordionProps> = ({
  title,
  zIndex,
  iconProps,
  children,
  initialState = true,
  action,
}) => {
  const [isOpen, setIsOpen] = useState(initialState);

  return (
    <FlexBlock
      width={'100%'}
      direction={'column'}
      additionalCss={css`
        transition: 0.6s ease-in-out;
      `}
      // overflow={'hidden'}
    >
      <FlexBlock
        direction={'row'}
        justify={'space-between'}
        gap={6}
        // pl={6}
        // pr={6}
        align={'center'}
        bgColor={'inherit'}
      >
        <FlexBlock
          direction={'row'}
          gap={6}
          align={'center'}
          justify={'flex-end'}
        >
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
        </FlexBlock>
        <FlexBlock direction={'row'} width={'100%'}>
          {title}
        </FlexBlock>
        {action && (
          <FlexBlock
            additionalCss={css`
              justify-self: flex-end;
            `}
          >
            <EmptyButtonStyled onClick={action.onClick}>
              <PlusIcon size={20} />
            </EmptyButtonStyled>
          </FlexBlock>
        )}
      </FlexBlock>
      {isOpen && (
        <FlexBlock
          direction={'column'}
          width={'100%'}
          style={{ height: isOpen ? 'fit-content' : '0px' }}
          pt={isOpen ? 6 : 0}
          pb={isOpen ? 6 : 0}
          overflow={isOpen ? 'unset' : 'hidden'}
        >
          {children}
        </FlexBlock>
      )}
    </FlexBlock>
  );
};