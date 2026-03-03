import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                    <div className="text-center max-w-lg">
                        <div className="font-serif text-8xl text-saffron-DEFAULT mb-6">!</div>
                        <h1 className="font-serif text-4xl text-forest mb-4">Something went wrong</h1>
                        <p className="font-body text-forest/60 mb-8">
                            We encountered an unexpected error. Please refresh the page to try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
