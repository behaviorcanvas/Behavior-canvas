import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, errorMessage: '' });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      let friendlyDetail = 'Please refresh the page or return to the homepage.';
      try {
        const parsed = JSON.parse(this.state.errorMessage);
        if (parsed?.operationType && parsed?.error) {
          friendlyDetail = `Access or connectivity note during ${parsed.operationType} on ${parsed.path || 'record'}: ${parsed.error}`;
        }
      } catch {
        friendlyDetail = this.state.errorMessage || friendlyDetail;
      }

      return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#514458] flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-[#514458]/10 shadow-sm p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#F4E4ED] text-[#514458] flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-medium text-[#514458] mb-3">
              Something Interrupted This View
            </h1>
            <p className="text-sm text-[#514458]/75 leading-relaxed mb-6 break-words">
              {friendlyDetail}
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#514458] text-white text-sm font-medium hover:bg-[#3f3445] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
