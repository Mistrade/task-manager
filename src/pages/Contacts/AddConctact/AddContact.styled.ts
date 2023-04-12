import { borderRadiusSize } from '@src/common/borderRadiusSize';
import styled from 'styled-components';
import { disabledColor } from '@src/common/constants';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

export const AddContactContainer = styled('div')`
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

export const ContactBlock = styled(FlexBlock)`
  width: 100%;
  display: flex;
  border-radius: ${borderRadiusSize.sm};
  background-color: #fff;
  box-shadow: 0px 4px 16px 4px ${disabledColor};
  //border: 1px solid ${disabledColor};
`;
