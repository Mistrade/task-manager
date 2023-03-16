import { FlexBlock } from '../../LayoutComponents/FlexBlock';
import { CheckboxStyledInput } from './Checkbox.styled';
import { ChangeEvent, FC, useRef } from 'react';
import {
  EmptyCheckboxIcon,
  FillCheckboxIcon,
} from '../../Icons/InputIcons/Checkbox';
import { IconProps } from '../../Icons/Icons';
import { StyledLabel } from '../Input.styled';
import { EmptyButtonStyled } from '../../Buttons/EmptyButton.styled';
import { darkColor } from '../../../common/constants';

export interface CheckboxProps {
  type: 'checkbox' | 'radio';
  title: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  iconProps?: Omit<IconProps, 'onClick'>;
  id: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  type,
  onChange,
  id,
  title,
  isChecked,
  iconProps,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <FlexBlock direction={'row'} justify={'flex-start'} align={'center'}>
      <CheckboxStyledInput
        type={type}
        onChange={onChange}
        id={id}
        ref={ref}
        checked={isChecked}
      />
      <EmptyButtonStyled
        onClick={() => ref.current?.click() && console.log('click')}
      >
        {isChecked ? (
          <FillCheckboxIcon {...iconProps} />
        ) : (
          <EmptyCheckboxIcon {...iconProps} />
        )}
      </EmptyButtonStyled>
      <StyledLabel style={{ color: darkColor, fontSize: 14 }}>
        {title}
      </StyledLabel>
    </FlexBlock>
  );
};
