import { FlexBlock } from '@components/LayoutComponents';
import { kitColors } from 'chernikov-kit';
import { FC, ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';


export const Loader: FC<{
  title?: ReactNode;
  children?: ReactNode;
  isActive: boolean;
  size?: number;
}> = ({ title = 'Загрузка...', isActive, children, size }) => {
  if (isActive) {
    return (
      <FlexBlock
        width={'100%'}
        height={'100%'}
        justify={'center'}
        align={'center'}
      >
        <FlexBlock direction={'column'} align={'center'} justify={'center'}>
          <ThreeDots
            height={size || '80'}
            width={size || '80'}
            radius='9'
            color={kitColors.primary}
            ariaLabel='three-dots-loading'
            visible={true}
          />
          {title && <FlexBlock textAlign={'center'}>{title}</FlexBlock>}
        </FlexBlock>
      </FlexBlock>
    );
  }

  return <>{children}</>;
};