import React, { FC, ReactElement, cloneElement, memo } from 'react';

import { FlexBlock } from '@components/LayoutComponents';

import { borderRadiusSize } from '../../common/css/mixins';
import { FlexBlockProps } from '../LayoutComponents/FlexBlock';
import { DefaultTextInputProps } from './TextInput/TextInput';


interface InputGroupProps extends Omit<FlexBlockProps, 'children'> {
  children: Array<ReactElement<Required<DefaultTextInputProps>>>;
}

export const InputGroup: FC<InputGroupProps> = memo(({
  children,
  ...flexBlockProps
}) => {
  return (
    <FlexBlock {...flexBlockProps}>
      {React.Children.map(children, (child, index) => {
        const isFirst = index === 0 && children.length !== 1;
        const isLast = index === children.length - 1 && children.length !== 1;

        let borderRadius: string = '0px';
        if (isFirst) {
          borderRadius = `${borderRadiusSize.sm} 0px 0px ${borderRadiusSize.sm}`;
        } else if (isLast) {
          borderRadius = `0px ${borderRadiusSize.sm} ${borderRadiusSize.sm} 0px`;
        }
        
        if (borderRadius) {
          return cloneElement(child, {
            ...child.props,
            style: { borderRadius, ...child.props.style },
          });
        }

        return child;
      })}
    </FlexBlock>
  );
})