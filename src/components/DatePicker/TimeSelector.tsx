import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  addNull,
  generateHoursArray,
  generateMinuteArray,
} from '@src/common/functions';

import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';

import { TimeSelectorButton } from '@planner/styled';

type TimeButtonUnitTypes = 'hour' | 'minute';

interface TimeButtonProps {
  isSelected: boolean;
  value: number;
  unitType: TimeButtonUnitTypes;

  handler(value: number, type: TimeButtonUnitTypes): void;
}

const TimeButton: FC<TimeButtonProps> = ({
  isSelected,
  value,
  handler,
  unitType,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isSelected && ref.current) {
      timeoutId = setTimeout(() => {
        ref.current?.scrollIntoView({ block: 'center' });
      }, 0);
    }

    return () => {
      if (timeoutId && ref.current) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSelected]);

  return (
    <TimeSelectorButton
      autoFocus={isSelected}
      key={value}
      ref={isSelected ? ref : undefined}
      data-title={`hour_${value}`}
      isSelected={isSelected}
      type={'button'}
      onClick={(event) => {
        handler(value, unitType);
      }}
    >
      {addNull(value)}
    </TimeSelectorButton>
  );
};

interface TimeSelectorProps {
  currentDate: Date;
  minuteStep?: number;
  onChange?: (date: Date) => void;
}

export const TimeSelector: FC<TimeSelectorProps> = ({
  currentDate,
  minuteStep = 1,
  onChange,
}) => {
  const hours = useMemo(() => {
    return generateHoursArray({ start: 0, end: 23 });
  }, []);

  const minutes = useMemo(() => {
    return generateMinuteArray({ step: minuteStep });
  }, [minuteStep]);

  const handler = useCallback(
    (value: number, type: 'hour' | 'minute') => {
      if (onChange) {
        const d = dayjs(currentDate);
        const r = d.set(type, value);
        onChange(r.toDate());
      }
    },
    [onChange, currentDate]
  );

  return (
    <FlexBlock height={'100%'} gap={4}>
      <VerticalScroll renderPattern={'top-bottom'}>
        {hours.map((value, index, array) => {
          const isSelected = currentDate.getHours() === value;
          return (
            <TimeButton
              key={`hour_${value}`}
              isSelected={isSelected}
              value={value}
              handler={handler}
              unitType={'hour'}
            />
          );
        })}
      </VerticalScroll>
      <VerticalScroll renderPattern={'top-bottom'}>
        {minutes.map((value, index, array) => {
          const isSelected = currentDate.getMinutes() === value;
          return (
            <TimeButton
              key={`minute_${value}`}
              isSelected={isSelected}
              value={value}
              handler={handler}
              unitType={'minute'}
            />
          );
        })}
      </VerticalScroll>
    </FlexBlock>
  );
};
