import { FC } from 'react';

import { ERROR_IMAGES, defaultColor } from '@src/common/constants';
import { scaleAnimation } from '@src/common/cssMixins';
import { DocumentErrorTypes } from '@src/common/types';

import { ButtonWithLoading } from '@components/Buttons/ButtonWithLoading';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';


export interface ActionItemProps {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
}

export interface ErrorScreenProps {
  description?: string;
  title: string;
  errorType: DocumentErrorTypes;
  action?: ActionItemProps;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
  description,
  title,
  errorType,
  action,
}) => {
  return (
    <FlexBlock
      justify={'center'}
      wrap={'wrap'}
      width={'100%'}
      gap={12}
      additionalCss={scaleAnimation}
    >
      <FlexBlock justify={'center'} align={'center'} width={'100%'}>
        {ERROR_IMAGES[errorType]}
      </FlexBlock>
      <FlexBlock width={'100%'} justify={'center'}>
        <Heading.H2
          style={{
            textAlign: 'center',
            fontSize: 28,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Heading.H2>
      </FlexBlock>
      <FlexBlock width={'100%'} justify={'center'}>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.5,
            textAlign: 'center',
            color: defaultColor,
            whiteSpace: 'pre-wrap',
          }}
        >
          {description}
        </p>
      </FlexBlock>
      {action && (
        <FlexBlock width={'100%'} justify={'center'}>
          <ButtonWithLoading
            buttonType={'primary'}
            type={'button'}
            isLoading={action.isLoading}
            onClick={action.onClick}
          >
            {action.title}
          </ButtonWithLoading>
        </FlexBlock>
      )}
    </FlexBlock>
  );
};