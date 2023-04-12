import { changeDateOfPattern } from '@planner-reducer/index';
import { DatePickerSwitch } from '@planner/Header/DatePickerSwitch';
import { useAppDispatch } from '@redux/hooks/hooks';
import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC, useCallback } from 'react';

export const CalendarTodaySwitchers: FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const changeHandler = useCallback((pattern: ShortChangeCurrentPattern) => {
    dispatch(changeDateOfPattern({ pattern }));
  }, []);

  return <DatePickerSwitch onClick={changeHandler} />;
}, disableReRender);
