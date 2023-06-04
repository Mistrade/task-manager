import { ConnectTypesArray } from './Connect/ChainsShowcase';
import { ConnectChains } from './Connect/ConnectChains';
import { ChainsRenderModeList } from './View/ViewTypes/ChainsRenderModeList';
import { ChildrenEventList } from './View/ViewTypes/ChildrenEventList';
import { EVENT_DEPENDENCIES_MAP } from './event-chains.types';
import { useGetEventChainsQuery } from '@api/planning-api';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { TooltipIcon } from '@components/Icons/TooltipIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { Loader } from '@components/Loaders/Loader';
import { Switcher } from '@components/Switcher/Switcher';
import {
  dateToPlannerDate,
  getSearchStringFromEntries,
  plannerDateToSearchParams,
} from '@planner-reducer/utils';
import { PlannerNavLink } from '@planner/styled';
import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';
import { Tooltip } from 'chernikov-kit';
import { FC, memo, useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';


interface EventChainsTabProps {
  taskItem: EventInfoModel;
}

export const EventChainsTab: FC<EventChainsTabProps> = memo(
  ({ taskItem }) => {
    const [addChains, setAddChains] = useState(false);
    const [initialType, setInitialType] =
      useState<EVENT_DEPENDENCIES_MAP | null>(null);

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
              badges={{
                [EVENT_DEPENDENCIES_MAP.CHILD_OF]:
                  chainsObject.data.childrenEvents?.length || 0,
                [EVENT_DEPENDENCIES_MAP.PARENT_OF]: chainsObject.data
                  .parentEvent
                  ? 1
                  : 0,
                [EVENT_DEPENDENCIES_MAP.LINKED_FROM]: chainsObject.data
                  .linkedFromEvent
                  ? 1
                  : 0,
                [EVENT_DEPENDENCIES_MAP.ALL]: 0,
              }}
              switchersList={[
                { title: 'Все', type: EVENT_DEPENDENCIES_MAP.ALL },
                {
                  title: 'Клонировано от',
                  type: EVENT_DEPENDENCIES_MAP.LINKED_FROM,
                },
                ...ConnectTypesArray,
              ]}
              component={({ item, badge }) => (
                <PlannerNavLink
                  to={{
                    pathname: item.type,
                    search: getSearchStringFromEntries(
                      plannerDateToSearchParams(
                        dateToPlannerDate(taskItem.time)
                      )
                    ),
                  }}
                  relative={'route'}
                  end
                >
                  {item.title}
                  {badge || ''}
                </PlannerNavLink>
              )}
            >
              <FlexBlock
                pb={4}
                gap={6}
                width={'100%'}
                align={'center'}
                justify={'flex-end'}
              >
                <EmptyButtonStyled onClick={() => setAddChains(true)}>
                  Добавить
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
        <Routes>
          <Route
            index={true}
            element={
              <ChainsRenderModeList
                eventItem={taskItem}
                chains={chainsObject.data}
                onConnectChains={() => {}}
              />
            }
          />
          <Route
            path={EVENT_DEPENDENCIES_MAP.CHILD_OF}
            element={
              <ChildrenEventList
                childrenEvents={chainsObject.data.childrenEvents}
                emptyComponent={
                  <CenteredContainer>
                    <ErrorScreen
                      title={'Дочерние зависимости не найдены'}
                      errorType={'BAD_REQUEST'}
                      action={{
                        title: 'Добавить',
                        onClick() {},
                      }}
                    />
                  </CenteredContainer>
                }
              />
            }
          />
          <Route
            path={EVENT_DEPENDENCIES_MAP.PARENT_OF}
            element={
              <ChildrenEventList
                childrenEvents={
                  chainsObject.data.parentEvent
                    ? [chainsObject.data.parentEvent]
                    : []
                }
                emptyComponent={
                  <CenteredContainer>
                    <ErrorScreen
                      title={'Родительские зависимости не найдены'}
                      errorType={'BAD_REQUEST'}
                      action={{
                        title: 'Добавить',
                        onClick() {},
                      }}
                    />
                  </CenteredContainer>
                }
              />
            }
          />
          <Route
            path={EVENT_DEPENDENCIES_MAP.LINKED_FROM}
            element={
              <ChildrenEventList
                childrenEvents={
                  chainsObject.data.linkedFromEvent
                    ? [chainsObject.data.linkedFromEvent]
                    : []
                }
                emptyComponent={
                  <CenteredContainer>
                    <ErrorScreen
                      title={'Данное событие не является клоном'}
                      errorType={'BAD_REQUEST'}
                    />
                  </CenteredContainer>
                }
              />
            }
          />
        </Routes>
        {/*{renderMode === 'list' && (*/}
        {/*	<ChainsRenderModeList*/}
        {/*		onConnectChains={() => setAddChains(true)}*/}
        {/*		eventItem={taskItem}*/}
        {/*		chains={chainsObject?.data}*/}
        {/*	/>*/}
        {/*)}*/}
        {/*{renderMode === 'tree' && (*/}
        {/*	<CenteredContainer>*/}
        {/*		<ErrorScreen*/}
        {/*			title={'Раздел в разработке'}*/}
        {/*			errorType={'BAD_REQUEST'}*/}
        {/*			description={*/}
        {/*				'Этот раздел находится в разработке и скоро им можно будет пользоваться.'*/}
        {/*			}*/}
        {/*		/>*/}
        {/*	</CenteredContainer>*/}
        {/*)}*/}
      </VerticalScroll>
    );
  },
  (prev, next) => prev.taskItem._id === next.taskItem._id
);