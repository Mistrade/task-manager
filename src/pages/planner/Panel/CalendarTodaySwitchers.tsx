import { DatePickerSwitch } from '@components/DatePicker/DatePickerSwitch';
import { changeDateOfPattern } from '@planner-reducer/index';
import { TimeSelectorButton } from '@planner/styled';
import { useAppDispatch } from '@redux/hooks/hooks';
import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC, useCallback } from 'react';


export const CalendarTodaySwitchers: FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const changeHandler = useCallback((pattern: ShortChangeCurrentPattern) => {
    dispatch(changeDateOfPattern({ pattern }));
  }, []);

  return (
    <DatePickerSwitch
      centerElement={
        <TimeSelectorButton onClick={() => changeHandler('today')}>
          Сегодня
        </TimeSelectorButton>
      }
      onChange={changeHandler}
    />
  );
}, disableReRender);