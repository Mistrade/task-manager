import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { disableReRender } from '@src/common/utils/react-utils';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { DoubleArrow, SettingsIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { OptionPanelCalendar } from '@planner/Panel/Calendar';
import { CalendarCurrentTitle } from '@planner/Panel/CalendarCurrentTitle';
import { PlannerSelectLayout } from '@planner/Panel/SelectLayout';
import { PlannerOptionPanelContainer } from '@planner/styled';
import { DaySettingsPanelProps } from '@planner/types';

import {
  currentColor,
  darkColor,
  disabledColor,
} from '../../../common/constants/constants';
import {
  Delay,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../common/functions';
import { GroupList } from '../Groups';
import { GroupListShort } from '../Groups/GroupListShort';
import { CalendarHeaderAddButton } from './CalendarHeaderAddButton';
import { CalendarTodaySwitchers } from './CalendarTodaySwitchers';

const ToggleIsOpenButtonContainer = styled('div')`
  position: absolute;
  bottom: 30px;
  right: 0;
  transform: translateX(50%);
  width: fit-content;
  height: fit-content;
`;

const ToggleButton = styled('button')<{ state: boolean }>`
  outline: none;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid ${disabledColor};
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  opacity: 1;
  ${(_) => {
    if (_.state) {
      return css`
        transform: rotate(180deg);
      `;
    } else {
      return css`
        transform: rotate(0deg);
      `;
    }
  }}
`;

interface ToggleIsOpenButtonProps {
  state: boolean;

  onToggle(): void;
}

const ToggleIsOpenButton: FC<ToggleIsOpenButtonProps> = ({
  state,
  onToggle,
}) => {
  return (
    <ToggleIsOpenButtonContainer id={'toggle--is--open'}>
      <ToggleButton onClick={onToggle} state={state}>
        <DoubleArrow size={24} color={darkColor} />
      </ToggleButton>
    </ToggleIsOpenButtonContainer>
  );
};

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(
    !!getFromLocalStorage<boolean>('panelState')
  );

  const [animationIsOpen, setAnimationIsOpen] = useState(isOpen);

  useEffect(() => {
    setToLocalStorage('panelState', animationIsOpen);
    if (animationIsOpen) {
      setIsOpen(animationIsOpen);
    } else {
      Delay(500).then(() => {
        setIsOpen(animationIsOpen);
      });
    }
  }, [animationIsOpen]);

  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  const toggleContent = (
    <>
      <CalendarCurrentTitle />
      <FlexBlock
        mt={12}
        justify={'center'}
        width={'100%'}
        p={`3px 12px`}
        shrink={0}
      >
        <CalendarTodaySwitchers />
      </FlexBlock>
      <OptionPanelCalendar />
    </>
  );

  return (
    <PlannerOptionPanelContainer
      state={animationIsOpen}
      style={{ paddingBottom: 12 }}
    >
      <FlexBlock
        direction={'column'}
        gap={isOpen ? 12 : 24}
        height={'100%'}
        minWidth={'100%'}
      >
        <PlannerSelectLayout pattern={isOpen ? 'full' : 'short'} />
        {isOpen ? (
          toggleContent
        ) : (
          <FlexBlock
            width={'100%'}
            justify={'center'}
            align={'center'}
            direction={'column'}
            gap={24}
          >
            <CalendarHeaderAddButton />
            <Tooltip
              content={toggleContent}
              theme={'light'}
              placement={'right-start'}
              delay={100}
              visible={tooltipIsOpen}
              onClickOutside={() => setTooltipIsOpen(false)}
              interactive={true}
              interactiveBorder={20}
            >
              <EmptyButtonStyled
                onClick={() => setTooltipIsOpen((prev) => !prev)}
              >
                <SettingsIcon size={30} color={currentColor} />
              </EmptyButtonStyled>
            </Tooltip>
          </FlexBlock>
        )}
        {isOpen ? <GroupList /> : <GroupListShort />}
      </FlexBlock>
      <FlexBlock>
        <ToggleIsOpenButton
          state={isOpen}
          onToggle={() => setAnimationIsOpen((prev) => !prev)}
        />
      </FlexBlock>
    </PlannerOptionPanelContainer>
  );
}, disableReRender);
