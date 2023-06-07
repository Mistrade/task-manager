import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { kitColors } from 'chernikov-kit';
import React, { FC, useContext, useRef, useState } from 'react';
import { Route, useParams } from 'react-router';
import { Routes } from 'react-router-dom';

import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';

import Badge from '@components/Badge';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents';
import { Loader } from '@components/Loaders/Loader';
import { Switcher } from '@components/Switcher/Switcher';
import { CutText } from '@components/Text/Text';

import { PlannerNavLink } from '@planner/styled';

import {
  useCreateFinanceModelMutation,
  useGetFinanceModelsQuery,
  useGetFinanceOperationListQuery,
} from '@api/finance-api';
import {
  FINANCE_SOURCE_MODELS,
  IFinanceModel,
  IGetFinanceModelsReturned,
} from '@api/finance-api/types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';

import { darkColor } from '../../../../../../common/constants/constants';
import { UserInfoContext } from '../../../../../../context/userInfo.context';
import { OperationsTable } from './components/Table';
import { getFinanceOperationValue } from './utils/table.config';


export const OnlyPremiumModuleAccessScreen = () => {
  const userInfo = useContext(UserInfoContext);
  const navigate = useSearchNavigate();

  return (
    <FlexBlock
      width={'100%'}
      justify={'center'}
      align={'flex-start'}
      height={'100%'}
    >
      <CenteredContainer>
        <ErrorScreen
          title={'Данный раздел доступен только с премиум версией'}
          description={
            'Выберите подходящий тарифный план или соберите собственный, чтобы пользоваться всеми возможностями сервиса'
          }
          errorType={'ONLY_PREMIUM'}
          action={{
            title: 'Получить премиум',
            onClick() {
              navigate(`/profile/${userInfo?._id}/tariff`);
            },
          }}
        />
      </CenteredContainer>
    </FlexBlock>
  );
};

export const FinanceCore: FC<{ eventInfo: EventInfoModel }> = ({
  eventInfo,
}) => {
  const { currentData, isLoading } = useGetFinanceModelsQuery({
    _id: eventInfo._id,
    sourceModel: FINANCE_SOURCE_MODELS.EVENT,
  });

  const [create, { isLoading: isCreateLoading }] =
    useCreateFinanceModelMutation();

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loader isActive={true} title={'Загружаем фин. модели'} />
      </CenteredContainer>
    );
  }

  if (!!currentData?.switcherData?.length) {
    return (
      <FlexBlock
        direction={'column'}
        grow={3}
        gap={6}
        width={'100%'}
        overflow={'hidden'}
      >
        <FlexBlock width={'100%'} borderBottom={`1px solid ${kitColors.disabled}`}>
          <Switcher
            switchersList={currentData.switcherData}
            badgeProps={{ type: 'primary' }}
            component={(data) => {
              return (
                <PlannerNavLink
                  to={data.item.type}
                  relative={'route'}
                  title={data.item.title}
                >
                  <CutText rows={1} fontSize={15}>
                    {data.item.title}
                  </CutText>
                  <Badge type={data.item.badgeType}>
                    <CutText rows={1} fontSize={14} color={darkColor}>
                      {getFinanceOperationValue(data.item.badgeValue)}
                    </CutText>
                  </Badge>
                </PlannerNavLink>
              );
            }}
          />
        </FlexBlock>
        <Routes>
          <Route
            index={true}
            element={
              <CenteredContainer>
                <ErrorScreen
                  title={'Выберите фин.модель сверху'}
                  errorType={'SYSTEM_ERROR'}
                />
              </CenteredContainer>
            }
          />
          <Route
            path={':modelId'}
            element={
              <FinanceInterceptor
                eventInfo={eventInfo}
                models={currentData.models || {}}
                switcherData={currentData?.switcherData}
              />
            }
          />
        </Routes>
      </FlexBlock>
    );
  }

  return (
    <CenteredContainer>
      <ErrorScreen
        title={'Вы еще не создали финансовую модель для этого события'}
        errorType={'ERR_FORBIDDEN'}
        action={{
          title: 'Создать фин. модель',
          onClick() {
            create({
              _id: eventInfo._id,
              sourceModel: FINANCE_SOURCE_MODELS.EVENT,
              title: 'Основа',
            }).unwrap();
          },
          isLoading: isCreateLoading,
        }}
      />
    </CenteredContainer>
  );
};

enum OPERATION_TABS {
  'LIST' = 'list',
  'ANALYTIC' = 'analytic',
}

const FinanceInterceptor: FC<{
  models: { [key in ObjectId]: IFinanceModel };
  eventInfo: EventInfoModel;
  switcherData: IGetFinanceModelsReturned['switcherData'];
}> = ({ models, eventInfo, switcherData }) => {
  const { modelId } = useParams<{ modelId: ObjectId }>();

  if (modelId && models[modelId]) {
    return (
      <FinanceModule
        eventInfo={eventInfo}
        model={models[modelId]}
        switcherData={switcherData}
      />
    );
  }

  return (
    <CenteredContainer>
      <Loader isActive={true} title={'Загрузка данных'} />
    </CenteredContainer>
  );
};

const tabs = [
  { title: 'Список операций', type: OPERATION_TABS.LIST },
  { title: 'Отчет', type: OPERATION_TABS.ANALYTIC },
];
export const FinanceModule: FC<{
  eventInfo: EventInfoModel;
  model: IFinanceModel;
  switcherData: IGetFinanceModelsReturned['switcherData'];
}> = ({ eventInfo, model, switcherData }) => {
  const { currentData, isLoading } = useGetFinanceOperationListQuery(
    model._id,
    { skip: !model?._id }
  );

  const [selectedTab, setSelectedTab] = useState<OPERATION_TABS>(
    OPERATION_TABS.LIST
  );

  const ref = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(true);

  return (
    <FlexBlock direction={'column'} gap={8} grow={3} overflow={'hidden'}>
      <FlexBlock
        height={'100%'}
        direction={'column'}
        overflow={'hidden'}
        pt={6}
        className={'height--container'}
      >
        {/*<FlexBlock*/}
        {/*  width={'100%'}*/}
        {/*  direction={'row'}*/}
        {/*  mb={8}*/}
        {/*  gap={8}*/}
        {/*  justify={'space-between'}*/}
        {/*  align={'center'}*/}
        {/*>*/}
        {/*  <Switcher*/}
        {/*    switchersList={tabs}*/}
        {/*    selected={selectedTab}*/}
        {/*    badges={{ [OPERATION_TABS.LIST]: currentData?.data?.length || 0 }}*/}
        {/*  />*/}
        {/*  <Tooltip*/}
        {/*    trigger={'click'}*/}
        {/*    interactive={true}*/}
        {/*    content={*/}
        {/*      <FinanceForm*/}
        {/*        initialDate={dayjs(eventInfo.time).toDate()}*/}
        {/*        onSave={async (item, isUpdateMode) => {*/}
        {/*          await createOperation({*/}
        {/*            count: item.count,*/}
        {/*            value: item.value,*/}
        {/*            date: item.date,*/}
        {/*            operationType: item.operationType,*/}
        {/*            name: item.name,*/}
        {/*            model: model?._id || '',*/}
        {/*            description: item.description,*/}
        {/*            sourceModel:*/}
        {/*              model?.modelPath || FINANCE_SOURCE_MODELS.EVENT,*/}
        {/*            sourceModelId: model?.model || '',*/}
        {/*          }).unwrap();*/}
        {/*          return;*/}
        {/*        }}*/}
        {/*        isLoading={isCreateLoading}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    theme={'light'}*/}
        {/*    maxWidth={400}*/}
        {/*    placement={'bottom'}*/}
        {/*  >*/}
        {/*    <Button style={{ flexShrink: 0, width: 'fit-content' }}>*/}
        {/*      Добавить*/}
        {/*    </Button>*/}
        {/*  </Tooltip>*/}
        {/*  <EmptyButtonStyled*/}
        {/*    onClick={() => setShowFilters((prev) => !prev)}*/}
        {/*    style={{ flexShrink: 0, width: 'fit-content', padding: '6px 10px' }}*/}
        {/*  >*/}
        {/*    {showFilters ? 'Скрыть' : 'Показать'} фильтры*/}
        {/*  </EmptyButtonStyled>*/}
        {/*</FlexBlock>*/}
        <FlexBlock
          direction={'column'}
          grow={3}
          maxHeight={'100%'}
          className={'scroll--height--container'}
          position={'relative'}
          overflow={'hidden'}
          ref={ref}
        >
          {model && (
            <OperationsTable
              switcherData={switcherData}
              isLoading={isLoading}
              eventInfo={eventInfo}
              model={model}
              operationsList={currentData?.data || []}
              showFilters={showFilters}
              maxHeight={(ref.current?.offsetHeight || 470) - 4}
            />
          )}
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};