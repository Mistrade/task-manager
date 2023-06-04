import { FC } from 'react';

import { CutText, CutTextProps } from '@components/Text/Text';

interface OperationTableCellTextProps extends CutTextProps {
  value: string | number;
}

export const OperationTableCellText: FC<OperationTableCellTextProps> = ({
  value,
  ...cutTextProps
}) => {
  return (
    <CutText rows={1} fontSize={14} title={`${value}`} {...cutTextProps}>
      {value}
    </CutText>
  );
};
