import styled from 'styled-components';
import { borderRadiusSize, disabledColor } from '../../../common/constants';

export const AddContactContainer = styled('div')`
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

export const ContactBlock = styled('div')`
  width: 100%;
  display: flex;
  padding: 24px;
  border-radius: ${borderRadiusSize.sm};
  background-color: #fff;
  box-shadow: 0px 4px 16px 4px ${disabledColor};
  //border: 1px solid ${disabledColor};
`;
