import { FC, useState } from 'react';

import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { Tooltip } from '@components/Tooltip/Tooltip';

import {
  darkColor,
  defaultColor,
  disabledColor,
} from '../../../common/constants/constants';
import { GroupItem } from './GroupItem';
import { GroupLogo } from './styled';
import { BaseGroupItemProps } from './types';

export const GroupItemWithContextMenu: FC<BaseGroupItemProps> = ({
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  return (
    <Tooltip
      placement={'right-start'}
      delay={100}
      theme={'light'}
      interactive={true}
      interactiveBorder={20}
      visible={isOpen}
      onClickOutside={() => setIsOpen(false)}
      content={
        <SelectListContainer>
          <FlexBlock
            mt={8}
            mb={4}
            borderBottom={`1px solid ${disabledColor}`}
            pb={8}
            pl={8}
            gap={6}
          >
            <GroupLogo color={props.item?.color || defaultColor} size={20} />
            <CutText
              rows={2}
              fontSize={16}
              color={darkColor}
              style={{ textAlign: 'center' }}
            >
              {props.item.title}
            </CutText>
          </FlexBlock>
          <SelectItemContainer
            onClick={async () => {
              if (onChange) {
                setIsFetching(true);
                onChange({
                  state: !props.item.isSelected,
                  groupId: props.item._id,
                }).finally(() => {
                  setIsFetching(false);
                });
              }
            }}
          >
            {`${
              props.item.isSelected ? 'Скрыть' : 'Показать'
            } события этой группы`}
          </SelectItemContainer>
          {props.item.type !== 'Invite' && (
            <SelectItemContainer
              onClick={() => {
                props.onCreateEvent && props.onCreateEvent(props.item);
                setIsOpen(false);
              }}
            >
              Создать событие
            </SelectItemContainer>
          )}
          {props.item.editable && (
            <SelectItemContainer
              onClick={() => {
                props.onEdit && props.onEdit(props.item._id);
                setIsOpen(false);
              }}
            >
              Редактировать
            </SelectItemContainer>
          )}
          {props.item.deletable && (
            <SelectItemContainer
              onClick={() => {
                props.onDelete && props.onDelete(props.item);
                setIsOpen(false);
              }}
            >
              Удалить
            </SelectItemContainer>
          )}
        </SelectListContainer>
      }
    >
      <GroupItem
        {...props}
        replaceChangeHandler={true}
        isFetching={isFetching}
        onChange={async () => {
          setIsOpen(true);
        }}
      />
    </Tooltip>
  );
};
