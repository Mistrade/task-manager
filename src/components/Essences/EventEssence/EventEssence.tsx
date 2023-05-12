import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useCallback, useMemo, useState } from 'react';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';
import { darkColor } from '@src/common/constants/constants';
import { getPath } from '@src/common/functions';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { Arrow } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { HistoryDescriptionField } from '@pages/planner/EventInfo/LeftBar/Tabs/TaskHistory/Fields/HistoryDescriptionField';
import { EventGroupButton } from '@pages/planner/EventInfo/SupportsComponent/EventGroupButton';
import { EventPriorityButton } from '@pages/planner/EventInfo/SupportsComponent/EventPriorityButton';
import { EventStatusButton } from '@pages/planner/EventInfo/SupportsComponent/EventStatusButton';

import { CalendarPriorityKeys, TaskStatusesType } from '@planner/types';

import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { ObjectId } from '@api/rtk-api.types';

import Badge from '../../Badge';
import { EssenceContainer, EventEssenceTitle } from './event-essence.styled';

export interface EventEssenceProps {
  status: TaskStatusesType | null;
  priority: CalendarPriorityKeys | null;
  title: string;
  createdAt?: Date | string | Dayjs;
  description?: string;
  group?: GroupModelResponse | null;
  time?: Date | string | Dayjs | null;
  timeEnd?: Date | string | Dayjs | null;
  eventId?: ObjectId | null;
  isSnapshot?: boolean;
  containerProps?: { id?: string };
  onTitleClick?: (eventId?: ObjectId | null) => void;
}

export const EventEssence: FC<EventEssenceProps> = ({
  status,
  priority,
  title,
  isSnapshot,
  containerProps,
  onTitleClick,
  ...optionalFields
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasOptionalInfo = useMemo(() => {
    return Object.keys(optionalFields).length > 0;
  }, [optionalFields]);

  const titleClickHandler = useCallback(() => {
    onTitleClick && onTitleClick(optionalFields.eventId);
  }, [onTitleClick, optionalFields.eventId]);

  //TODO раздробить верстку на мелкие компоненты
  return (
    <EssenceContainer {...containerProps}>
      <FlexBlock gap={6} align={'center'} direction={'row'}>
        {!isOpen && (
          <>
            <EventStatusButton
              iconProps={{
                size: 20,
              }}
              withTooltipInfo={true}
              status={status}
              renderText={false}
              isDisabled={true}
            />
            <EventPriorityButton
              withTooltipInfo={true}
              iconProps={{
                size: 20,
              }}
              isDisabled={true}
              priority={priority}
              renderText={false}
            />
            {optionalFields.group && (
              <EventGroupButton
                group={optionalFields.group}
                isDisabled={true}
                withTooltipInfo={true}
                iconProps={{ size: 20 }}
                renderText={false}
              />
            )}
          </>
        )}
        <EventEssenceTitle onClick={titleClickHandler}>
          <CutText color={darkColor} title={title} rows={1} fontSize={16}>
            {title}
          </CutText>
        </EventEssenceTitle>
        {isSnapshot && (
          <Tooltip
            content={
              'Snapshot - означает, что данные для этой записи фиксировались в конкретный момент времени и могут отличаться от текущих. Чтобы получить актуальную информацию о событии, разверните его стрелочкой справа и нажмите "Перейти к оригиналу"'
            }
          >
            <Badge type={'primary'}>Snapshot</Badge>
          </Tooltip>
        )}
        {hasOptionalInfo && (
          <Tooltip
            content={
              isOpen
                ? 'Скрыть подробную информацию'
                : 'Смотреть подробную информацию'
            }
            delay={[500, 100]}
          >
            <EmptyButtonStyled
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
            >
              <Arrow transform={`rotate(${isOpen ? 180 : 90}deg)`} size={20} />
            </EmptyButtonStyled>
          </Tooltip>
        )}
      </FlexBlock>
      {isOpen && hasOptionalInfo && (
        <FlexBlock direction={'column'} width={'100%'} gap={6} pl={12}>
          <FlexBlock direction={'row'} gap={20}>
            <FlexBlock direction={'column'} gap={6} basis={'50%'}>
              {optionalFields.createdAt && (
                <FlexBlock style={{ whiteSpace: 'pre-wrap', fontSize: 14 }}>
                  Создано{' '}
                  <Badge type={'primary'}>
                    {DateHelper.getHumanizeDateValue(
                      dayjs(optionalFields.createdAt).toDate(),
                      {
                        withTime: true,
                        monthPattern: 'full',
                      }
                    )}
                  </Badge>
                </FlexBlock>
              )}
              {optionalFields.time && optionalFields.timeEnd && (
                <FlexBlock
                  style={{ whiteSpace: 'pre-wrap' }}
                  direction={'column'}
                  gap={6}
                >
                  <FlexBlock fSize={14}>
                    Начало{' '}
                    <Badge type={'primary'}>
                      {DateHelper.getHumanizeDateValue(
                        dayjs(optionalFields.time).toDate(),
                        {
                          withTime: true,
                          monthPattern: 'short',
                        }
                      )}
                    </Badge>
                  </FlexBlock>
                  <FlexBlock fSize={14}>
                    Конец{' '}
                    <Badge type={'primary'}>
                      {DateHelper.getHumanizeDateValue(
                        dayjs(optionalFields.timeEnd).toDate(),
                        {
                          withTime: true,
                          monthPattern: 'short',
                        }
                      )}
                    </Badge>
                  </FlexBlock>
                </FlexBlock>
              )}
              {optionalFields.eventId && (
                <FlexBlock>
                  <LinkStyled
                    to={getPath(
                      'planner/day/event/info',
                      optionalFields.eventId
                    )}
                    target={'_blank'}
                  >
                    Перейти к оригиналу
                  </LinkStyled>
                </FlexBlock>
              )}
            </FlexBlock>
            <FlexBlock direction={'column'} gap={6} basis={'50%'}>
              <FlexBlock>
                <EventStatusButton
                  iconProps={{
                    size: 20,
                  }}
                  status={status}
                  renderText={true}
                  isDisabled={true}
                />
              </FlexBlock>
              <FlexBlock>
                <EventPriorityButton
                  iconProps={{
                    size: 20,
                  }}
                  isDisabled={true}
                  priority={priority}
                  renderText={true}
                />
              </FlexBlock>
              {optionalFields.group && (
                <FlexBlock>
                  <EventGroupButton
                    group={optionalFields.group}
                    withTooltipInfo={false}
                    isDisabled={true}
                    iconProps={{ size: 20 }}
                    renderText={true}
                  />
                </FlexBlock>
              )}
            </FlexBlock>
          </FlexBlock>
          {optionalFields.description && (
            <FlexBlock width={'100%'}>
              <HistoryDescriptionField
                useCopied={false}
                value={optionalFields.description}
              />
            </FlexBlock>
          )}
        </FlexBlock>
      )}
    </EssenceContainer>
  );
};
