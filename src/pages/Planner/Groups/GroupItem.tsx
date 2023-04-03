import { FlexBlock } from '../../../components/LayoutComponents/FlexBlock';
import { CalendarItemLabel, GroupItemCheckbox } from './GroupList.styled';
import { FC, useState } from 'react';
import {
  LoaderIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '../../../components/Icons/Icons';
import { darkColor, defaultColor } from '../../../common/constants';
import { EmptyButtonStyled } from '../../../components/Buttons/EmptyButton.styled';
import { useChangeSelectGroupMutation } from '../../../store/api/planning-api';
import { GroupItemProps } from './groups.types';
import { useCreateEventModal } from '../../../hooks/useCreateEventModal';
import { PreviewDescription } from '../RenderModes/DayCalendar/TaskList/TaskList.styled';

export const GroupItem: FC<GroupItemProps> = ({
  onChange,
  isChecked,
  item,
  isDisabled,
  onDelete,
  onSuccessChangeSelect,
  onEdit,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeSelect] = useChangeSelectGroupMutation();

  const { openModal } = useCreateEventModal({});

  const changeHandler = async (isChecked: boolean) => {
    setIsLoading(true);
    await changeSelect({
      groupId: item._id,
      state: isChecked,
    })
      .unwrap()
      .catch(() => setIsLoading(false))
      .then(async () => {
        if (onSuccessChangeSelect) {
          await onSuccessChangeSelect().then(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      });
  };

  return (
    <li
      onMouseEnter={() => onDelete && setIsHover(true)}
      onMouseLeave={() => onDelete && setIsHover(false)}
    >
      <FlexBlock
        width={'100%'}
        overflow={'hidden'}
        gap={2}
        justify={'space-between'}
      >
        <FlexBlock shrink={1} grow={0} gap={6}>
          {isLoading ? (
            <LoaderIcon size={18} color={item.color} />
          ) : (
            <GroupItemCheckbox
              type={'checkbox'}
              id={item._id}
              color={item.color}
              disabled={isDisabled}
              checked={isChecked}
              onChange={(e) => changeHandler(e.target.checked)}
            />
          )}
          <CalendarItemLabel htmlFor={item._id}>
            <PreviewDescription
              rows={1}
              style={{ maxWidth: '100%', color: darkColor, fontSize: 15 }}
            >
              {item.title}
            </PreviewDescription>
          </CalendarItemLabel>
        </FlexBlock>
        {isHover && (
          <FlexBlock shrink={0} grow={0}>
            {item.type !== 'Invite' && (
              <EmptyButtonStyled
                style={{ padding: 2 }}
                onClick={() =>
                  openModal({
                    group: item._id,
                  })
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
