import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { Flex, Text, borderRadiusSizes, kitColors } from 'chernikov-kit';
import React, { FC, useContext, useRef, useState } from 'react';
import { Route, useParams } from 'react-router';
import { Link, Routes } from 'react-router-dom';

import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';

import Badge from '@components/Badge';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { EssenceContainer } from '@components/Essences/EventEssence/event-essence.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';
import { Loader } from '@components/Loaders/Loader';

import {
  useCreateFinanceModelMutation,
  useGetFinanceModelsQuery,
  useGetFinanceOperationListQuery,
} from '@api/finance-api';
import {
  FINANCE_OPERATION_TYPES,
  FINANCE_SOURCE_MODELS,
  IFinanceModel,
  IGetFinanceModelsReturned,
} from '@api/finance-api/types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';

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
        <Routes>
          <Route
            index={true}
            element={
              <Flex
                height={'100%'}
                grow={3}
                direction={'column'}
                justify={'flex-start'}
                width={'100%'}
                mt={12}
                gap={12}
              >
                <Flex direction={'column'} gap={6} grow={0} shrink={0}>
                  <Flex width={'100%'} justify={'space-between'} pl={12} pr={8}>
                    <Text rows={1} fontSize={18} weight={'bold'}>
                      Мои цели
                    </Text>
                    <EmptyButtonStyled>
                      <PlusIcon size={20} />
                    </EmptyButtonStyled>
                  </Flex>
                  <Flex
                    borderRadius={borderRadiusSizes.sm}
                    border={`1px solid ${kitColors.disabled}`}
                    width={'100%'}
                    minHeight={60}
                  ></Flex>
                </Flex>
                <Flex direction={'column'} gap={6} grow={0} shrink={0}>
                  <Flex width={'100%'} justify={'space-between'} pl={12} pr={8}>
                    <Text rows={1} fontSize={18} weight={'bold'}>
                      Мои счета
                    </Text>
                    <EmptyButtonStyled>
                      <PlusIcon size={20} />
                    </EmptyButtonStyled>
                  </Flex>
                  <Flex
                    borderRadius={borderRadiusSizes.sm}
                    border={`1px solid ${kitColors.disabled}`}
                    width={'100%'}
                    minHeight={60}
                  ></Flex>
                </Flex>
                <Flex
                  direction={'row'}
                  width={'100%'}
                  gap={16}
                  grow={0}
                  maxHeight={330}
                  basis={'100%'}
                >
                  <Flex
                    direction={'column'}
                    gap={6}
                    grow={3}
                    shrink={0}
                    basis={'calc(75% - 8px)'}
                  >
                    <Flex
                      width={'100%'}
                      justify={'space-between'}
                      pl={12}
                      pr={8}
                    >
                      <Text rows={1} fontSize={18} weight={'bold'}>
                        Фин. модели события
                      </Text>
                      <EmptyButtonStyled>
                        <PlusIcon size={20} />
                      </EmptyButtonStyled>
                    </Flex>
                    <Flex
                      height={'100%'}
                      direction={'column'}
                      maxHeight={300}
                      minHeight={60}
                      borderRadius={borderRadiusSizes.sm}
                      border={`1px solid ${kitColors.disabled}`}
                      width={'100%'}
                    >
                      <VerticalScroll
                        renderPattern={'top-bottom'}
                        useShadow={true}
                        containerProps={{ pl: 6, pr: 6 }}
                      >
                        {currentData?.initial.map((item) => (
                          <Link
                            to={item._id}
                            relative={'route'}
                            style={{ textDecoration: 'none' }}
                            key={item._id}
                          >
                            <EssenceContainer>
                              <Flex
                                width={'100%'}
                                align={'center'}
                                justify={'space-between'}
                                direction={'row'}
                                gap={12}
                              >
                                <Text
                                  rows={1}
                                  fontSize={16}
                                  color={kitColors.dark}
                                >
                                  {item.title}
                                </Text>
                                <Flex gap={6}>
                                  <Badge
                                    type={
                                      item.analytic.profit > 0
                                        ? FINANCE_OPERATION_TYPES.INCOME
                                        : FINANCE_OPERATION_TYPES.CONSUMPTION
                                    }
                                  >
                                    {getFinanceOperationValue(
                                      item.analytic.profit
                                    )}
                                  </Badge>
                                  <Text
                                    rows={1}
                                    fontSize={15}
                                    color={kitColors.dark}
                                  >
                                    {(item.analytic.profitPercent > 0
                                      ? '+'
                                      : '') +
                                      item.analytic.profitPercent?.toFixed(2) +
                                      '%'}
                                  </Text>
                                </Flex>
                              </Flex>
                            </EssenceContainer>
                          </Link>
                        ))}
                      </VerticalScroll>
                    </Flex>
                  </Flex>
                  <Flex
                    direction={'column'}
                    gap={6}
                    grow={3}
                    shrink={0}
                    basis={'calc(25% - 8px)'}
                    minWidth={200}
                  >
                    <Flex
                      width={'100%'}
                      justify={'space-between'}
                      pl={12}
                      pr={8}
                    >
                      <Text rows={1} fontSize={18} weight={'bold'}>
                        Категории
                      </Text>
                      <EmptyButtonStyled>
                        <PlusIcon size={20} />
                      </EmptyButtonStyled>
                    </Flex>
                    <Flex
                      height={'100%'}
                      direction={'column'}
                      maxHeight={300}
                      minHeight={60}
                      borderRadius={borderRadiusSizes.sm}
                      border={`1px solid ${kitColors.disabled}`}
                      width={'100%'}
                    ></Flex>
                  </Flex>
                </Flex>
                <Flex direction={'column'} gap={6} grow={0} shrink={0}>
                  <Flex width={'100%'} justify={'space-between'} pl={12} pr={8}>
                    <Text rows={1} fontSize={18} weight={'bold'}>
                      Шаблоны
                    </Text>
                    <EmptyButtonStyled>
                      <PlusIcon size={20} />
                    </EmptyButtonStyled>
                  </Flex>
                  <Flex
                    borderRadius={borderRadiusSizes.sm}
                    border={`1px solid ${kitColors.disabled}`}
                    width={'100%'}
                    minHeight={60}
                  ></Flex>
                </Flex>
              </Flex>
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
          <Route
            path={'create'}
            element={
              <Flex>
                <Text rows={1} fontSize={18} weight={'bold'}>
                  Создайте новую фин.модель
                </Text>
              </Flex>
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

export const FinanceModule: FC<{
  eventInfo: EventInfoModel;
  model: IFinanceModel;
  switcherData: IGetFinanceModelsReturned['switcherData'];
}> = ({ eventInfo, model, switcherData }) => {
  const { currentData, isLoading } = useGetFinanceOperationListQuery(
    model._id,
    { skip: !model?._id }
  );

  const ref = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(true);

  return (
    <FlexBlock direction={'column'} gap={8} grow={3} overflow={'hidden'}>
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
  );
};