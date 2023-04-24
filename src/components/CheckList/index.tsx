import React, { FC, useCallback, useMemo, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import styled, { keyframes } from 'styled-components';

import {
  currentColor,
  defaultColor,
  disabledColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { TimeBadge } from '@components/Badge/Badge';
import { CopyToClipboardButton } from '@components/Buttons/CopyToClipboardButton';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PencilIcon, TrashIcon } from '@components/Icons/Icons';
import { TooltipIcon } from '@components/Icons/TooltipIcon';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import {
  TextInput,
  TextInputProps,
} from '@components/Input/TextInput/TextInput';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { Heading } from '@components/Text/Heading';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { ICheckListItem } from '@planner/types';

const CheckListUL = styled('ul')`
  & {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;
    width: 100%;
  }
`;

const CheckListItemAnimation = keyframes`
  from {
    opacity: .5;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledCheckListItem = styled('li')`
  & {
    display: flex;
    width: 100%;
    flex-direction: row;
    border-left: 4px solid ${currentColor};
    border-top: 1px solid ${disabledColor};
    border-right: 1px solid ${disabledColor};
    border-bottom: 1px solid ${disabledColor};
    padding: 4px;
    border-radius: 0px ${borderRadiusSize.sm} ${borderRadiusSize.sm} 0px;
    animation: ${CheckListItemAnimation} 0.3s ease-out forwards;
  }
`;

const CheckListItemButtons = styled('div')`
  & {
    display: flex;
    gap: 8px;
  }
`;

export interface CheckListProps {
  isLoading?: boolean;
  title: string;
  onChangeTitle?: (value: string) => Promise<boolean>;
  scrollContainerProps?: FlexBlockProps;
  checkList: Array<ICheckListItem>;
  onItemChange?: CheckListItemProps['onChange'];
  //Если нужно очистить поля ввода onAddItem должна вернуть true
  onSaveNewElement?: (title: string) => Promise<boolean>;
  onRemoveItem?: (item: ICheckListItem) => Promise<boolean>;
}

export interface CheckListItemProps {
  item: ICheckListItem;
  onChange?: (
    item: ICheckListItem,
    field: 'item-state' | 'item-title'
  ) => Promise<boolean>;
  onRemove?: (item: ICheckListItem) => Promise<boolean>;
}

export const CheckListItem: FC<CheckListItemProps> = ({
  item,
  onChange,
  onRemove,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeStateHandler = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange &&
        (await onChange(
          { ...item, state: event.target.checked },
          'item-state'
        ));
    },
    [item, onChange]
  );

  const removeHandler = useCallback(async () => {
    onRemove && (await onRemove(item));
  }, [item, onRemove]);

  const changeTitleHandler = useCallback(
    async (title: string): Promise<boolean> => {
      if (!title) {
        return false;
      }

      if (onChange) {
        setIsLoading(true);
        const result = await onChange(
          {
            ...item,
            title,
          },
          'item-title'
        );
        setIsLoading(false);

        if (result) {
          setIsEditMode(false);
        }
      }
      return true;
    },
    [item, onChange, setIsEditMode, setIsLoading]
  );

  return (
    <Tooltip
      placement={'bottom-start'}
      content={
        <CheckListAddInput
          containerProps={{ p: 8, minWidth: 500 }}
          initialValue={item.title}
          onSave={changeTitleHandler}
          label={'Новое название элемента списка'}
          isLoading={isLoading}
        />
      }
      onClickOutside={() => setIsEditMode(false)}
      trigger={'none'}
      arrow={false}
      maxWidth={600}
      theme={'light'}
      delay={[200, 500]}
      offset={[30, -5]}
      interactive={true}
      interactiveBorder={20}
      visible={isEditMode}
    >
      <StyledCheckListItem key={item.title}>
        <FlexBlock
          grow={3}
          direction={'row'}
          height={'100%'}
          onClick={() => setIsEditMode((prev) => !prev)}
        >
          <Checkbox
            type={'checkbox'}
            title={item.title}
            isChecked={item.state}
            onChange={changeStateHandler}
          />
        </FlexBlock>

        <CheckListItemButtons>
          <CopyToClipboardButton content={item.title} />
          <EmptyButtonStyled onClick={removeHandler}>
            <TrashIcon size={16} color={defaultColor} />
          </EmptyButtonStyled>
        </CheckListItemButtons>
      </StyledCheckListItem>
    </Tooltip>
  );
};

interface CheckListAddInputProps
  extends Omit<TextInputProps, 'value' | 'onKeyDown' | 'onChange'> {
  onSave?: CheckListProps['onSaveNewElement'];
  initialValue?: string;
}

export const CheckListAddInput: FC<CheckListAddInputProps> = ({
  onSave,
  initialValue,
  ...inputProps
}) => {
  const [value, setValue] = useState(initialValue || '');

  const pressEnterHandler = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();

      if (e.key === 'Enter') {
        if (!!value.length) {
          const result = onSave && (await onSave(value));

          if (result) {
            setValue('');
          }
        }

        return;
      }
    },
    [value, onSave]
  );

  return (
    <TextInput
      {...inputProps}
      value={value}
      icon={
        <Tooltip
          content={
            'Нажмите Enter, когда фокус установлен на поле ввода (поле ввода обведено синей рамкой), чтобы добавить элемент'
          }
        >
          <TooltipIcon size={20} color={currentColor} />
        </Tooltip>
      }
      onChange={({ target: { value } }) => setValue(value)}
      onKeyDown={pressEnterHandler}
    />
  );
};

export const CheckList: FC<CheckListProps> = ({
  checkList,
  onItemChange,
  onRemoveItem,
  onSaveNewElement,
  scrollContainerProps,
  title,
  onChangeTitle,
  isLoading,
}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);

  const changeTitleHandler = useCallback(
    async (value: string): Promise<boolean> => {
      if (onChangeTitle) {
        const result = await onChangeTitle(value);
        if (result) {
          setIsEditTitle(false);
        }

        return result;
      }
      return false;
    },
    [onChangeTitle]
  );

  const progress = useMemo(() => {
    const completedCount = checkList.filter((item) => !!item.state);

    const result = {
      percent: ((completedCount.length / checkList.length) * 100).toFixed(0),
      completedCount: completedCount.length,
      count: checkList.length,
    };

    if (checkList.length) {
      return (
        <TimeBadge>
          {result.completedCount} / {result.count} ({result.percent}%)
        </TimeBadge>
      );
    }
    return <></>;
  }, [checkList]);

  return (
    <VerticalScroll
      containerProps={scrollContainerProps}
      renderPattern={'top-bottom'}
      placementStatic={'top'}
      gap={12}
      staticContent={
        <FlexBlock direction={'column'} gap={8}>
          <Heading.H3
            style={{
              display: 'flex',
              columnGap: 8,
              alignItems: 'center',
              paddingBottom: 8,
              paddingLeft: 8,
              borderBottom: `1px solid ${disabledColor}`,
              marginBottom: 12,
            }}
          >
            {title}
            {progress}
            <Tooltip
              maxWidth={600}
              content={
                isEditTitle ? (
                  <CheckListAddInput
                    containerProps={{ p: 8, minWidth: 500 }}
                    initialValue={title}
                    label={'Название чек-листа'}
                    onSave={changeTitleHandler}
                  />
                ) : (
                  <></>
                )
              }
              visible={isEditTitle}
              onClickOutside={() => setIsEditTitle(false)}
              interactive={true}
              interactiveBorder={20}
              delay={[200, 500]}
              arrow={false}
              trigger={'none'}
              theme={'light'}
              placement={'bottom'}
              offset={[0, 0]}
            >
              <EmptyButtonStyled onClick={() => setIsEditTitle(true)}>
                <PencilIcon color={currentColor} size={20} />
              </EmptyButtonStyled>
            </Tooltip>
            <Tooltip
              content={
                'Чек-лист это список дел, который необходимо выполнить для завершения события. В бесплатной версии максимальное количество дел - 15. В платной - не ограничено!'
              }
            >
              <TooltipIcon size={20} color={defaultColor} />
            </Tooltip>
            {isLoading && (
              <ColorRing
                visible={isLoading}
                height='25'
                width='25'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={[
                  currentColor,
                  currentColor,
                  currentColor,
                  currentColor,
                  currentColor,
                ]}
              />
            )}
          </Heading.H3>
          {checkList.length <= 15 ? (
            <CheckListAddInput
              label={'Что вы хотите добавить в чек-лист?'}
              onSave={onSaveNewElement}
            />
          ) : (
            <></>
          )}
        </FlexBlock>
      }
    >
      <CheckListUL>
        {checkList.map((item) => (
          <CheckListItem
            key={item._id}
            item={item}
            onChange={onItemChange}
            onRemove={onRemoveItem}
          />
        ))}
      </CheckListUL>
    </VerticalScroll>
  );
};
