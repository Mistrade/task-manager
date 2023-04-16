import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css } from 'styled-components';

import {
  addNull,
  generateHoursArray,
  generateMinuteArray,
} from '@src/common/functions';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { TimeSelectorButton } from '@pages/planner/Planner.styled';

interface TimeSelectorProps {
  currentDate: Date;
  minuteStep?: number;
  onChange?: (date: Date) => void;
}

export const TimeSelector: FC<TimeSelectorProps> = ({
  currentDate,
  minuteStep = 5,
  onChange,
}) => {
  const hours = useMemo(() => {
    return generateHoursArray({ start: 0, end: 23 });
  }, []);

  const minutes = useMemo(() => {
    return generateMinuteArray({ step: 1 });
  }, [minuteStep]);

  const handler = useCallback(
    (value: number, type: 'hour' | 'minute') => {
      if (onChange) {
        const d = dayjs(currentDate);
        const r = d.set(type, value);
        console.log(d.toDate(), r.toDate());
        onChange(r.toDate());
        setLastModify((prev) => ({
          hour: type === 'hour' ? value : prev.hour,
          minute: type === 'minute' ? value : prev.minute,
        }));
      }
    },
    [onChange, currentDate]
  );

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const [lastModify, setLastModify] = useState({
    minute: currentDate.getMinutes(),
    hour: currentDate.getHours(),
  });

  const autoFocus = () => {
    const { minute, hour } = lastModify;

    const minuteButton: HTMLButtonElement | undefined =
      minuteRef.current?.querySelector(`[data-title="minute_${minute}"]`) as
        | HTMLButtonElement
        | undefined;
    if (minuteButton) {
      setTimeout(() => {
        minuteButton.scrollIntoView({ block: 'center' });
      }, 0);
    }

    const hourButton: HTMLButtonElement | undefined =
      hourRef.current?.querySelector(`[data-title="hour_${hour}"]`) as
        | HTMLButtonElement
        | undefined;
    if (hourButton) {
      setTimeout(() => {
        hourButton.scrollIntoView({ block: 'center' });
      }, 0);
    }
  };
  useEffect(() => {
    autoFocus();
  }, [currentDate]);

  return (
    <FlexBlock maxHeight={'inherit'} gap={4}>
      <FlexBlock
        direction={'column'}
        maxHeight={225}
        overflowY={'scroll'}
        ref={hourRef}
        additionalCss={css`
          &::-webkit-scrollbar {
            width: 0;
          }

          scroll-snap-type: y mandatory;
        `}
      >
        {hours.map((value, index, array) => (
          <TimeSelectorButton
            key={value}
            data-title={`hour_${value}`}
            isSelected={currentDate.getHours() === value}
            type={'button'}
            onClick={() => handler(value, 'hour')}
          >
            {addNull(value)}
          </TimeSelectorButton>
        ))}
      </FlexBlock>
      <FlexBlock
        direction={'column'}
        maxHeight={225}
        overflowY={'scroll'}
        ref={minuteRef}
        additionalCss={css`
          &::-webkit-scrollbar {
            width: 0;
          }

          scroll-snap-type: y mandatory;
        `}
      >
        {minutes.map((value, index, array) => (
          <TimeSelectorButton
            key={value}
            data-title={`minute_${value}`}
            isSelected={currentDate.getMinutes() === value}
            type={'button'}
            onClick={() => handler(value, 'minute')}
          >
            {addNull(value)}
          </TimeSelectorButton>
        ))}
      </FlexBlock>
    </FlexBlock>
  );
};
