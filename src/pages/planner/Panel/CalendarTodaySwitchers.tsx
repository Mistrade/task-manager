import { changeDateOfPattern } from '@planner-reducer/index';
import { useAppDispatch } from '@redux/hooks/hooks';
import React, { FC, useCallback } from 'react';

import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import { disableReRender } from '@src/common/utils/react-utils';

import { DatePickerSwitch } from '@components/DatePicker/DatePickerSwitch';

export const CalendarTodaySwitchers: FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const changeHandler = useCallback((pattern: ShortChangeCurrentPattern) => {
    dispatch(changeDateOfPattern({ pattern }));
  }, []);

  return <DatePickerSwitch onClick={changeHandler} />;
}, disableReRender);
