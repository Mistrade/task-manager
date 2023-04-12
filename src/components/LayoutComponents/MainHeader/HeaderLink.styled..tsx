import styled from 'styled-components';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { currentColor, defaultColor } from '@src/common/constants';
import React from 'react';

export const HeaderDefaultLink = styled(LinkStyled)`
  font-size: 16px;
  border: 1px solid ${defaultColor};
  padding: 6px 16px;
  outline: none;
  cursor: pointer;
`;

export const HeaderLinkStyled = React.memo(styled(HeaderDefaultLink)<{
  selected: boolean;
}>`
  & {
    transition: all 0.3s ease-in-out;
    background-color: ${(props) => (props.selected ? currentColor : '#fff')};
    color: ${(props) => (props.selected ? '#fff' : defaultColor)};
  }

  &:hover {
    background-color: ${currentColor};
    color: #fff;
  }
`);
