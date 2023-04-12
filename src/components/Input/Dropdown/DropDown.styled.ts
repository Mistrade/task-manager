import styled from 'styled-components';
import { defaultColor } from '@src/common/constants';
import { DropDownContainerProps } from '@components/Input/Dropdown/types';

export const StyledDropDownContainer = styled('div')<DropDownContainerProps>`
  & {
    display: flex;
    position: absolute;
    width: max-content;
    visibility: ${(_) => (_.isOpen ? 'visible' : 'hidden')};
    top: calc(100% + 20px);
    left: 0;
    z-index: ${(_) => (_.isOpen ? 1 : -1)};
  }

  &:after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255);
    transform: rotate(45deg);
    position: absolute;
    top: -10px;
    left: 15px;
    border-left: solid 1px ${defaultColor};
    border-top: solid 1px ${defaultColor};
    z-index: 0;
  }
`;
