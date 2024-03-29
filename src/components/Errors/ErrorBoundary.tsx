import { Component, ReactNode } from 'react';

import { FlexBlock } from '@components/LayoutComponents';

import { ErrorScreen, ErrorScreenProps } from './ErrorScreen';

export class ErrorBoundary extends Component<
  { children: ReactNode } & ErrorScreenProps,
  { error: boolean }
> {
  constructor(props: any) {
    super(props);
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render(): JSX.Element {
    if (this.state?.error) {
      return (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <ErrorScreen
            title={this.props.title}
            description={this.props.description}
            errorType={this.props.errorType}
          />
        </FlexBlock>
      );
    }

    return <>{this.props.children}</>;
  }
}
