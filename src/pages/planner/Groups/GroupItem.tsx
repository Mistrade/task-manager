import { FC, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { darkColor, defaultColor } from '@src/common/constants/constants';
import { Delay } from '@src/common/functions';
import { GroupItemProps } from '@src/pages/planner/Groups/types';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PencilIcon, PlusIcon, TrashIcon } from '@components/Icons/Icons';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { fromRightToLeftAnimation } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

const shortKeyFrame = keyframes`
  0% {
    transform: scale(0.7);
    opacity: .7;
  }
  70% {
    transform: scale(1.1);
    opacity: .9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const bubbleAnimation = css`
  transform: scale(0);
  animation: ${shortKeyFrame} 0.3s ease-in-out forwards;
`;

const CustomContainer = styled('li')<{
  delay: number;
  pattern: 'full' | 'short';
}>`
  ${(_) =>
    _.pattern === 'short' ? bubbleAnimation : fromRightToLeftAnimation};
  animation-delay: ${(_) => _.delay || 0}ms;
`;

export const GroupItem: FC<GroupItemProps> = ({
  onChange,
  item,
  onDelete,
  onEdit,
  renderPattern = 'full',
  index = 0,
  onContextMenu,
  onCreateEvent,
  isFetching,
  replaceChangeHandler,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeHandler = async (isChecked: boolean) => {
    if (onChange) {
      if (replaceChangeHandler) {
        await onChange({
          groupId: item._id,
          state: isChecked,
        });
      } else {
        setIsLoading(true);
        await onChange({
          groupId: item._id,
          state: isChecked,
        })
          .catch(() => setIsLoading(false))
          .then(async () => {
            Delay(1000).then(() => setIsLoading(false));
          });
      }
    }
  };

  return (
    <CustomContainer
      pattern={renderPattern}
      delay={index * 50}
      onMouseEnter={() => renderPattern !== 'short' && setIsHover(true)}
      onMouseLeave={() => renderPattern !== 'short' && setIsHover(false)}
      onContextMenu={onContextMenu}
    >
      <FlexBlock
        width={'100%'}
        overflow={'hidden'}
        gap={2}
        justify={renderPattern !== 'short' ? 'space-between' : 'center'}
      >
        <FlexBlock shrink={1} grow={0} gap={6}>
          <Checkbox
            type={'checkbox'}
            iconProps={{
              color: item.color,
              size: renderPattern === 'short' ? 30 : 20,
            }}
            isLoading={isLoading || isFetching}
            onChange={(e) => changeHandler(e.target.checked)}
            isChecked={item.isSelected}
            id={item._id}
            title={
              renderPattern !== 'short' ? (
                <CutText
                  rows={1}
                  style={{
                    maxWidth: '100%',
                    color: darkColor,
                    fontSize: 15,
                  }}
                >
                  {item.title}
                </CutText>
              ) : (
                <></>
              )
            }
          />
        </FlexBlock>
        {isHover && (
          <FlexBlock shrink={0} grow={0}>
            {item.type !== 'Invite' && (
              <EmptyButtonStyled
                style={{ padding: 2 }}
                onClick={() => onCreateEvent && onCreateEvent(item)}
              >
                <PlusIcon size={14} color={defaultColor} />
              </EmptyButtonStyled>
            )}

            {item.editable && onEdit && (
              <EmptyButtonStyled
                style={{ padding: 2 }}
                onClick={() => onEdit(item._id)}
              >
                <PencilIcon size={14} color={defaultColor} />
              </EmptyButtonStyled>
            )}
            {item.deletable && onDelete && (
              <EmptyButtonStyled
                style={{ padding: 2 }}
                onClick={() => onDelete(item)}
              >
                <TrashIcon size={14} color={defaultColor} />
              </EmptyButtonStyled>
            )}
          </FlexBlock>
        )}
      </FlexBlock>
    </CustomContainer>
  );
};
