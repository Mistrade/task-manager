import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { disableReRender } from '@src/common/utils/react-utils';

import { DoubleArrow } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';

import { PlannerOptionPanelContainer } from '@planner/styled';
import { DaySettingsPanelProps } from '@planner/types';

import { darkColor, disabledColor } from '../../../common/constants/constants';
import {
  Delay,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../common/functions';
import { FullPanelContent } from './Full';
import { ShortPanelContent } from './Short';

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
  transition: all 0.25s ease-in-out;
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
      Delay(250).then(() => {
        setIsOpen(animationIsOpen);
      });
    }
  }, [animationIsOpen]);

  return (
    <PlannerOptionPanelContainer
      state={animationIsOpen}
      style={{ paddingBottom: 12 }}
    >
      {isOpen ? (
        <FullPanelContent canDestroy={!animationIsOpen} />
      ) : (
        <ShortPanelContent />
      )}
      <FlexBlock>
        <ToggleIsOpenButton
          state={isOpen}
          onToggle={() => setAnimationIsOpen((prev) => !prev)}
        />
      </FlexBlock>
    </PlannerOptionPanelContainer>
  );
}, disableReRender);
