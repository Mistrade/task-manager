import { useGroupList } from '@hooks/useGroupList';
import React from 'react';

import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { Delay } from '../../../common/functions';
import { GroupItem } from './GroupItem';
import { GroupListStyled } from './styled';

export const GroupListShort = () => {
  const { currentData, onDelete, onEdit, changeHandler } = useGroupList();

  return (
    <FlexBlock direction={'column'} width={'100%'} grow={3} overflow={'hidden'}>
      {/*<FlexBlock direction={'column'} height={'100%'}>*/}
      <VerticalScroll useShadow={true} renderPattern={'top-bottom'}>
        <GroupListStyled>
          {currentData?.data?.map((item) => {
            return (
              <Tooltip
                content={item.title}
                theme={'light'}
                placement={'right'}
                delay={100}
              >
                <GroupItem
                  renderPattern={'short'}
                  item={item}
                  key={item._id}
                  onDelete={onDelete}
                  isChecked={item.isSelected}
                  onEdit={onEdit}
                  onSuccessChangeSelect={async () => await Delay(1000)}
                  onChange={changeHandler}
                />
              </Tooltip>
            );
          })}
        </GroupListStyled>
      </VerticalScroll>
      {/*</FlexBlock>*/}
    </FlexBlock>
  );
};
