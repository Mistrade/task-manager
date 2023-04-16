import React from 'react';
import styled from 'styled-components';

import { currentColor, defaultColor } from '@src/common/constants';

import { LinkStyled } from '@components/Buttons/Link.styled';

export const HeaderDefaultLink = styled(LinkStyled)`
  font-size: 16px;
  border: 1px solid ${defaultColor};
  padding: 6px 16px;
  outline: none;
  cursor: pointer;
`;

export const HeaderLinkStyled = styled(HeaderDefaultLink)`
  & {
    border: none;
    transition: all 0.6s ease-in-out;
    background-color: #fff;
    color: ${defaultColor};
    text-decoration: none;
  }

  &.active {
    background-color: ${currentColor};
    color: #fff;
  }

  &:hover {
    text-decoration: none;
    background-color: ${currentColor};
    color: #fff;
  }
`;
