import { GroupListStyled } from './GroupList.styled';
import { GroupItem } from './GroupItem';
import { useGetGroupsListQuery } from '../../../store/api/planning-api';
import { usePlanner } from '../../../hooks/usePlanner';
import { Delay } from '../../../common/functions';

export const GroupList = () => {
  const { currentData, isFetching, refetch } = useGetGroupsListQuery({});
  const { onSelectRemovedGroup, onCreateGroup } = usePlanner();

  return (
    <GroupListStyled>
      {currentData?.data?.map((item) => {
        return (
          <GroupItem
            item={item}
            key={item._id}
            onDelete={onSelectRemovedGroup}
            isChecked={item.isSelected}
            onEdit={onCreateGroup}
            onSuccessChangeSelect={async () => await Delay(1000)}
          />
        );
      })}
    </GroupListStyled>
  );
};
