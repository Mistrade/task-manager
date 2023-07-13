import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { FlexBlock } from '@components/LayoutComponents';

const StyledToggleButtonContainer = styled('label')`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ToggleButtonContainer: FC<{
  button: ReactNode;
  focusElementId: string;
}> = ({ button, focusElementId }) => {
  return (
    <StyledToggleButtonContainer htmlFor={focusElementId}>
      <FlexBlock grow={0} shrink={0}>
        {button}
      </FlexBlock>
    </StyledToggleButtonContainer>
  );
};
