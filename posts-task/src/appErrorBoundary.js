import React from 'react';

class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error caught by AppErrorBoundary:', error);
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        })
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                </div>
            )
        }
        return this.props.children; // render children when no error has been caught
    }
}

export default AppErrorBoundary;