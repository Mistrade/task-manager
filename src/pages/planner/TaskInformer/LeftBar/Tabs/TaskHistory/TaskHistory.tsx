import { useGetEventHistoryQuery } from '@api/planning-api';
import { EventHistoryQueryResult } from '@api/planning-api/types/event-history.types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { Badge } from '@components/Badge/Badge';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Loader } from '@components/Loaders/Loader';
import { Heading } from '@components/Text/Heading';
import { Tooltip } from '@components/Tooltip/Tooltip';
import {
  darkColor,
  defaultColor,
  hoverColor,
  orangeColor,
} from '@src/common/constants';
import dayjs from 'dayjs';
import React, { FC, memo } from 'react';
import { ChatItem } from '../TaskComments/comments.styled';
import { CommentDate } from '../TaskComments/SupportComponents/CommentDate';
import { StyledHistoryList } from './event-history.styled';
import { MergedNote } from './EventHistoryMergedItem';
import { EventHistoryItemController } from './Fields';

export interface TaskHistoryProps {
  taskInfo: EventInfoModel;
}

export const TaskHistory: FC<TaskHistoryProps> = memo(
  ({ taskInfo }) => {
    const {
      data: history,
      isFetching,
      error,
    } = useGetEventHistoryQuery(taskInfo._id, {
      refetchOnMountOrArgChange: 60,
      pollingInterval: 60 * 1000,
    });

    if (!history?.length && isFetching) {
      return <Loader isActive={true} title={'Загрузка истории события'} />;
    }

    if (error && 'data' in error) {
      return (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <ErrorScreen
            title={'Не удалось загрузить историю события'}
            errorType={'ERR_FORBIDDEN'}
            description={
              error.data.info?.message || 'Произошла непредвиденная ошибка'
            }
          />
        </FlexBlock>
      );
    }

    if (!history?.length) {
      return (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <ErrorScreen
            title={'Не удалось загрузить историю события'}
            errorType={'ERR_FORBIDDEN'}
            description={'История данного события не найдена'}
          />
        </FlexBlock>
      );
    }

    if (history.length === 0) {
      return (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <ErrorScreen
            title={'Записи не найдены'}
            errorType={'ERR_FORBIDDEN'}
            description={'Записи в истории этого события не найдены'}
          />
        </FlexBlock>
      );
    }

    return (
      <ScrollVerticalView renderPattern={'top-bottom'}>
        <FlexBlock width={'100%'} gap={12} direction={'column'}>
          {history.map((item) => (
            <MergedNote
              mergeItem={item}
              renderGroup={(item) => (
                <StyledHistoryList>
                  {item.arr.map((historyItem: EventHistoryQueryResult) => (
                    <ChatItem
                      style={{
                        borderBottom: `2px solid ${hoverColor}`,
                        paddingBottom: 8,
                      }}
                    >
                      <FlexBlock gap={4} direction={'row'} align={'center'}>
                        <CommentDate date={dayjs(historyItem.date).toDate()} />
                        {historyItem.isPrivate && (
                          <Tooltip
                            theme={'current'}
                            placement={'top'}
                            interactive={true}
                            interactiveBorder={8}
                            delay={[300, 100]}
                            content={
                              <FlexBlock
                                style={{ textAlign: 'center', fontSize: 14 }}
                                align={'center'}
                                width={'100%'}
                                direction={'column'}
                              >
                                Если запись имеет отметку "Приватная запись" это
                                означает, что видите ее только вы
                                <LinkStyled
                                  style={{
                                    color: '#fff',
                                    textDecoration: 'underline',
                                  }}
                                  to={'/faq/history/notes'}
                                  target={'_blank'}
                                >
                                  Подробнее о записях истории
                                </LinkStyled>
                              </FlexBlock>
                            }
                          >
                            <Badge
                              style={{
                                backgroundColor: orangeColor,
                                fontSize: 14,
                                color: '#fff',
                              }}
                            >
                              Приватная запись
                            </Badge>
                          </Tooltip>
                        )}
                      </FlexBlock>
                      <Heading.H3 style={{ fontSize: 16 }}>
                        {historyItem.snapshotDescription}
                      </Heading.H3>
                      <EventHistoryItemController historyItem={historyItem} />
                    </ChatItem>
                  ))}
                </StyledHistoryList>
              )}
            />
          ))}
          <FlexBlock
            justify={'center'}
            align={'center'}
            fSize={15}
            style={{ color: defaultColor }}
            mb={24}
            gap={6}
          >
            Найдено{' '}
            <span style={{ fontWeight: 'bold', color: darkColor }}>
              {history.length}
            </span>{' '}
            записей в истории события
          </FlexBlock>
        </FlexBlock>
      </ScrollVerticalView>
    );
  },
  (prev, next) => prev.taskInfo._id === next.taskInfo._id
);
