import styled from 'styled-components';
import React, { FC, ReactNode } from 'react';
import { ErrorTypes } from '../../store/api/rtk-api.types';

interface DefaultInformerProps {
  type: ErrorTypes;
}

const StyledInformer = styled('div')<DefaultInformerProps>`
  display: flex;
  padding: 8px;
  flex-direction: column;
  gap: 8px;
`;

const StyledInformerHeader = styled('h4')`
  width: 100%;
  font-size: 17px;
  font-weight: bold;
  font-style: normal;
  font-family: Helvetica, sans-serif;
`;

const StyledInformerText = styled('p')`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  font-family: Helvetica, sans-serif;
`;

interface InformerProps extends DefaultInformerProps {
  header?: ReactNode;
  text: ReactNode;
}

export const Informer: FC<InformerProps> = ({ type, header, text }) => {
  return (
    <StyledInformer type={type}>
      {header && <StyledInformerHeader>{header}</StyledInformerHeader>}
      <StyledInformerText>{text}</StyledInformerText>
    </StyledInformer>
  );
};
