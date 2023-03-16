import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { DatePickerProps } from '../../pages/Planner/planner.types';
import { SelectListContainer } from '../Input/SelectInput/SelectListContainer';
import { DatePickerPaper } from './DatePickerPaper';
import { SelectInput } from '../Input/SelectInput/SelectInput';
import { FlexBlock } from '../LayoutComponents/FlexBlock';
import { Button } from '../Buttons/Buttons.styled';
import { EmptyButtonStyled } from '../Buttons/EmptyButton.styled';
import dayjs from 'dayjs';
import { DateHelper } from '../../common/calendarSupport/dateHelper';

export const DatePicker: FC<DatePickerProps> = memo(
  ({
    onFocus,
    currentDate,
    label,
    onChange,
    containerProps,
    isDirty,
    errorMessage,
    icon,
    actionHandler,
    actions,
    iconPlacement,
    disabledOptions,
    useForceUpdateValue = false,
    onDecline,
  }) => {
    const [stateValue, setStateValue] = useState<Date | null>(currentDate);

    const clickSaveHandler = useCallback(() => {
      onChange && onChange(stateValue);
    }, [stateValue]);

    const clickDeclineHandler = useCallback(() => {
      onDecline && onDecline();
      setStateValue(currentDate);
    }, []);

    useEffect(() => {
      const d = dayjs(currentDate);
      if (d.isValid()) {
        const isSame = d.isSame(stateValue, 'minute');
        if (currentDate && useForceUpdateValue && !isSame) {
          console.log('123');
          setStateValue(currentDate);
        }
      }
    }, [currentDate?.toString(), useForceUpdateValue]);

    return (
      <SelectInput
        placeholder={'Выберите дату'}
        onFocus={onFocus}
        data={[]}
        renderData={(data) => (
          <SelectListContainer maxHeight={500} width={'100%'}>
            <FlexBlock direction={'column'} width={'100%'} pb={4}>
              <DatePickerPaper
                disabledOptions={disabledOptions}
                currentDate={stateValue || dayjs().toDate()}
                onChange={(date) => {
                  setStateValue(date);
                }}
              />
              <FlexBlock
                direction={'row'}
                width={'100%'}
                align={'center'}
                justify={'flex-end'}
                gap={8}
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    clickSaveHandler();
                    // methods.focusOut()
                  }}
                >
                  Сохранить
                </Button>
                <EmptyButtonStyled
                  onClick={(e) => {
                    e.stopPropagation();
                    clickDeclineHandler();
                    // methods.focusOut()
                  }}
                >
                  Отменить
                </EmptyButtonStyled>
              </FlexBlock>
            </FlexBlock>
          </SelectListContainer>
        )}
        value={stateValue ? DateHelper.getHumanizeDateValue(stateValue) : ''}
        label={label}
        containerProps={containerProps}
        isDirty={!!isDirty}
        errorMessage={`${errorMessage || ''}`}
        actionHandler={actionHandler}
        readOnly={true}
        icon={icon}
        iconPlacement={iconPlacement}
        actions={actions}
      />
    );
  }
);
