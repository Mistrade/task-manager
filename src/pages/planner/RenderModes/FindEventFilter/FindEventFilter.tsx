import React, { FC, ReactNode, useCallback, useContext } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { SelectPriorityInput } from '@components/Input/SelectInput/CalendarSelectInputs/SelectPriorityInput';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { TaskListEventFiltersContainer } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { Switcher } from '@components/Switcher/Switcher';
import { IFindEventFilterProps } from './find-event-filters.types';
import {
  PLANNER_LAYOUTS,
  TaskStatusesList,
} from '@src/common/constants';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FiltersIcon, SettingsIcon } from '@components/Icons/Icons';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { Button } from '@components/Buttons/Buttons.styled';
import { PlannerContext } from '@src/Context/planner.context';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { Heading } from '@components/Text/Heading';

export const LayoutNames: { [key in PLANNER_LAYOUTS]: string } = {
  [PLANNER_LAYOUTS.DAY]: 'День',
  [PLANNER_LAYOUTS.WEEK]: 'Неделя',
  [PLANNER_LAYOUTS.MONTH]: 'Месяц',
  [PLANNER_LAYOUTS.YEAR]: 'Год',
  [PLANNER_LAYOUTS.LIST]: 'Список',
  [PLANNER_LAYOUTS.FAVORITES]: 'Избранное',
};

export const FindEventFilter: FC<IFindEventFilterProps> = ({
  values,
  onChangeHandlers,
  onFocusHandlers,
  statusBadges,
  isLoading,
}) => {
  const { currentStatus, currentLayout } = useContext(PlannerContext);

  const renderDataViewDaysOfWeek = useCallback(
    (data: Array<{ title: string; value: boolean }>): ReactNode => {
      return (
        <SelectListContainer>
          {data.map((item) => (
            <SelectItemContainer
              isSelected={false}
              key={item.title}
              // onClick={}
            >
              {item.title}
            </SelectItemContainer>
          ))}
        </SelectListContainer>
      );
    },
    []
  );

  return (
    <TaskListEventFiltersContainer>
      <FlexBlock
        width={'100%'}
        gap={2}
        position={'relative'}
        direction={'column'}
      >
        <Switcher
          isLoading={isLoading}
          switchersList={TaskStatusesList}
          onClick={(item) => onChangeHandlers.taskStatus(item.type)}
          selected={currentStatus}
          badges={statusBadges}
        >
          <Tooltip
            theme={'light'}
            trigger={'click'}
            interactive={true}
            interactiveBorder={10}
            arrow={false}
            hideOnClick={true}
            placement={'bottom-end'}
            maxWidth={500}
            content={
              <FlexBlock
                direction={'column'}
                justify={'center'}
                align={'center'}
                p={8}
                gap={12}
              >
                <Heading.H2 style={{ marginBottom: 12 }}>
                  Настройки режима "{LayoutNames[currentLayout]}"
                </Heading.H2>
                <FlexBlock direction={'row'} gap={12}>
                  <TextInput
                    label={'Событий в списке'}
                    value={'5'}
                    onChange={() => {}}
                  />
                  <SelectInput
                    onChange={() => {}}
                    label={'Отображать дни недели'}
                    data={
                      [
                        { title: 'Да', value: true },
                        { title: 'Нет', value: false },
                      ] as Array<{ title: string; value: boolean }>
                    }
                    value={'Да'}
                    renderData={renderDataViewDaysOfWeek}
                  />
                </FlexBlock>
                <SelectInput
                  onChange={() => {}}
                  label={'Отображать кол-во событий по статусам'}
                  data={
                    [
                      { title: 'Да', value: true },
                      { title: 'Нет', value: false },
                    ] as Array<{ title: string; value: boolean }>
                  }
                  value={'Да'}
                  renderData={renderDataViewDaysOfWeek}
                />
                <SelectInput
                  onChange={() => {}}
                  label={'Отображать порядковый номер недели'}
                  data={
                    [
                      { title: 'Да', value: true },
                      { title: 'Нет', value: false },
                    ] as Array<{ title: string; value: boolean }>
                  }
                  value={'Да'}
                  renderData={renderDataViewDaysOfWeek}
                />
                <FlexBlock direction={'row'} gap={12}>
                  <SelectInput
                    onChange={() => {}}
                    label={'Отображение колонок'}
                    data={
                      [
                        { title: 'Растягивать', value: true },
                        { title: 'Сжимать', value: false },
                        { title: 'Автоматически', value: true },
                      ] as Array<{ title: string; value: boolean }>
                    }
                    value={'Автоматически'}
                    renderData={renderDataViewDaysOfWeek}
                  />
                  <SelectInput
                    onChange={() => {}}
                    label={'Быстрый доступ'}
                    data={
                      [
                        { title: 'Включено', value: true },
                        { title: 'Отключено', value: false },
                      ] as Array<{ title: string; value: boolean }>
                    }
                    value={'Включено'}
                    renderData={renderDataViewDaysOfWeek}
                  />
                </FlexBlock>
              </FlexBlock>
            }
          >
            <FlexBlock p={4}>
              <EmptyButtonStyled>
                <FlexBlock gap={6} align={'center'}>
                  Настройки
                  <SettingsIcon size={24} />
                </FlexBlock>
              </EmptyButtonStyled>
            </FlexBlock>
          </Tooltip>
          <Tooltip
            maxWidth={300}
            content={
              <FlexBlock
                direction={'column'}
                gap={12}
                width={280}
                p={'12px 4px 6px 4px'}
              >
                <TextInput
                  value={values.title || ''}
                  onChange={(e) => onChangeHandlers.title(e.target.value)}
                  onFocus={(e) =>
                    onFocusHandlers && onFocusHandlers('title', e)
                  }
                  label={'Название'}
                  placeholder={'Найдем совпадения по названию'}
                />
                <SelectPriorityInput
                  useClearItem={true}
                  selected={values.priority || null}
                  onChange={onChangeHandlers.priority}
                  onFocus={(e) =>
                    onFocusHandlers && onFocusHandlers('priority', e)
                  }
                  label={'Приоритет'}
                  placeholder={'Приоритет сужает поиск'}
                />
                <Checkbox
                  type={'checkbox'}
                  title={'(D) Скрыть события с участниками'}
                  id={'events-with-members-filter'}
                  onChange={() => {}}
                  iconProps={{
                    size: 20,
                  }}
                />
                <Checkbox
                  onChange={() => {}}
                  type={'checkbox'}
                  title={'(D) Только сквозные события'}
                  id={'events-with-members-filter'}
                  iconProps={{
                    size: 20,
                  }}
                />
                <FlexBlock width={'100%'} justify={'center'} align={'center'}>
                  <Button type={'button'}>Очистить фильтры</Button>
                </FlexBlock>
              </FlexBlock>
            }
            trigger={'click'}
            hideOnClick={true}
            theme={'light'}
            interactiveBorder={10}
            interactive={true}
            arrow={false}
            placement={'bottom-end'}
          >
            <FlexBlock p={4}>
              <EmptyButtonStyled>
                <FlexBlock gap={6} align={'center'}>
                  Фильтры
                  <FiltersIcon size={24} />
                </FlexBlock>
              </EmptyButtonStyled>
            </FlexBlock>
          </Tooltip>
        </Switcher>
      </FlexBlock>
    </TaskListEventFiltersContainer>
  );
};
