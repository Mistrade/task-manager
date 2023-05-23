import { FC, memo, useState } from 'react';

import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { TooltipIcon } from '@components/Icons/TooltipIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { Loader } from '@components/Loaders/Loader';
import { Switcher } from '@components/Switcher/Switcher';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { useGetEventChainsQuery } from '@api/planning-api';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';

import { ConnectChains } from './Connect/ConnectChains';
import { ChainsRenderModeList } from './View/ViewTypes/ChainsRenderModeList';
import { ConnectChainsType } from './event-chains.types';

interface EventChainsTabProps {
  taskItem: EventInfoModel;
}

export const EventChainsTab: FC<EventChainsTabProps> = memo(
  ({ taskItem }) => {
    const [addChains, setAddChains] = useState(false);
    const [initialType, setInitialType] = useState<ConnectChainsType | null>(
      null
    );
    const [renderMode, setRenderMode] = useState<'list' | 'tree'>('list');

    const {
      data: chainsObject,
      isFetching,
      refetch,
    } = useGetEventChainsQuery(taskItem._id, {
      skip: !taskItem._id,
      pollingInterval: addChains ? undefined : 10 * 60 * 1000,
      refetchOnMountOrArgChange: true,
    });

    if (addChains) {
      return (
        <FlexBlock height={'100%'} width={'100%'}>
          <ConnectChains
            excludeEventId={[
              taskItem._id,
              ...(chainsObject?.data?.childrenEvents?.map((item) => item._id) ||
                []),
            ]}
            initialState={initialType}
            taskInfo={taskItem}
            onSuccess={() => {
              setAddChains(false);
              setInitialType(null);
              refetch();
            }}
            onGoBack={() => {
              setAddChains(false);
              setInitialType(null);
            }}
          />
        </FlexBlock>
      );
    }

    if (!chainsObject && isFetching) {
      return (
        <CenteredContainer>
          <Loader isActive={true} title={'Ищем связи события...'} />
        </CenteredContainer>
      );
    }

    if (!chainsObject) {
      return (
        <CenteredContainer>
          <ErrorScreen
            title={'Связи не найдены'}
            errorType={'SYSTEM_ERROR'}
            description={'Не удалось найти связи с другими событиями'}
          />
        </CenteredContainer>
      );
    }

    if (
      !chainsObject.data?.childrenEvents?.length &&
      !chainsObject.data?.parentEvent &&
      !chainsObject.data?.linkedFromEvent
    ) {
      return (
        <CenteredContainer>
          <ErrorScreen
            title={'Событие не связано с другими'}
            errorType={'ERR_FORBIDDEN'}
            description={'Это событие пока что не связано с другими событиями!'}
            action={{
              title: 'Добавить связи',
              onClick: () => {
                setAddChains(true);
              },
            }}
          />
        </CenteredContainer>
      );
    }

    return (
      <VerticalScroll
        placementStatic={'top'}
        containerProps={{ height: '100%' }}
        staticContent={
          <FlexBlock width={'100%'} align={'center'}>
            <Switcher
              switchersList={[
                { title: 'Список', type: 'list' },
                { title: 'Древовидная структура', type: 'tree' },
              ]}
              onClick={(item) => setRenderMode(item.type)}
              selected={renderMode}
            >
              <FlexBlock
                pb={4}
                gap={6}
                width={'100%'}
                align={'center'}
                justify={'flex-end'}
              >
                <EmptyButtonStyled onClick={() => setAddChains(true)}>
                  Создать связи
                </EmptyButtonStyled>
                <Tooltip
                  interactiveBorder={4}
                  interactive={true}
                  delay={200}
                  content={
                    <LinkStyled
                      style={{ color: '#fff', textDecoration: 'underline' }}
                      to={'/faq/chains'}
                      target={'_blank'}
                    >
                      Подробнее о связях
                    </LinkStyled>
                  }
                >
                  <TooltipIcon size={20} />
                </Tooltip>
              </FlexBlock>
            </Switcher>
          </FlexBlock>
        }
        renderPattern={'top-bottom'}
        gap={12}
      >
        {renderMode === 'list' && (
          <ChainsRenderModeList
            onConnectChains={() => setAddChains(true)}
            eventItem={taskItem}
            chains={chainsObject?.data}
          />
        )}
        {renderMode === 'tree' && (
          <CenteredContainer>
            <ErrorScreen
              title={'Раздел в разработке'}
              errorType={'BAD_REQUEST'}
              description={
                'Этот раздел находится в разработке и скоро им можно будет пользоваться.'
              }
            />
          </CenteredContainer>
        )}
      </VerticalScroll>
    );
  },
  (prev, next) => prev.taskItem._id === next.taskItem._id
);
