import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { CheckboxStyledInput } from '@components/Input/Checkbox/Checkbox.styled';
import { ChangeEvent, FC, useRef } from 'react';
import {
  EmptyCheckboxIcon,
  FillCheckboxIcon,
} from '@components/Icons/InputIcons/Checkbox';
import { IconProps } from '@components/Icons/Icons';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { StyledLabel } from '@components/Input/Input.styled';
import { darkColor } from '@src/common/constants';
import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';

export interface CheckboxProps {
  type: 'checkbox' | 'radio';
  title: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  iconProps?: Omit<IconProps, 'onClick'>;
  id?: string;
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
    <FlexBlock
      direction={'row'}
      justify={'flex-start'}
      align={'center'}
      width={'100%'}
      overflow={'hidden'}
    >
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
      <StyledLabel>
        <CutText rows={2} color={darkColor} fontSize={14}>
          {title}
        </CutText>
      </StyledLabel>
    </FlexBlock>
  );
};
