import { Component, ReactNode } from 'react';
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
        <ErrorScreen
          title={this.props.title}
          description={this.props.description}
          errorType={this.props.errorType}
        />
      );
    }

    return <>{this.props.children}</>;
  }
}
