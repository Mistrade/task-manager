import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { FC, useState } from 'react';

import { darkColor, defaultColor } from '@src/common/constants/constants';
import { SERVICES_NAMES } from '@src/common/constants/enums';
import { Delay, getPath } from '@src/common/functions';
import { GroupItemProps } from '@src/pages/planner/Groups/types';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PencilIcon, PlusIcon, TrashIcon } from '@components/Icons/Icons';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

export const GroupItem: FC<GroupItemProps> = ({
  onChange,
  item,
  onDelete,
  onEdit,
  renderPattern,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const layout = useAppSelector(plannerSelectLayout);

  const { openModal } = useCreateEventModal();

  const changeHandler = async (isChecked: boolean) => {
    if (onChange) {
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
  };

  return (
    <li
      onMouseEnter={() => renderPattern !== 'short' && setIsHover(true)}
      onMouseLeave={() => renderPattern !== 'short' && setIsHover(false)}
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
            isLoading={isLoading}
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
                onClick={() =>
                  openModal(
                    {
                      group: item._id,
                    },
                    {
                      useReturnBackOnDecline: true,
                      modalPath: getPath(
                        SERVICES_NAMES.PLANNER,
                        layout,
                        'event/create'
                      ),
                    }
                  )
                }
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
    </li>
  );
};
