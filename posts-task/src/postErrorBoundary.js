import React from "react";

class PostErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('postErrorBoundary caught an error', {
            postId: this.props.postId,
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack
        });

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });

        //trigger parent component to reload
        if (this.props.onRetry) {
            this.props.onRetry(this.props.postId)
        }
    };

    render() {
        if(this.state.hasError){
            <div>
                <div><h2>failed to load post</h2></div>
                <p>{this.state.error?.message || 'an unexpected error occurred'}</p>
            </div>

        }

        return this.props.children;
    }
}

export default PostErrorBoundary;