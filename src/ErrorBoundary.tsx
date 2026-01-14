import React, { Component, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error caught by boundary:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="grid h-full place-content-center bg-red-100">
					<div className="mx-auto w-[500px] rounded-lg bg-white p-4 shadow-md">
						<h1 className="text-xl font-semibold text-red-600">Something went wrong</h1>
						<p className="mt-2 text-gray-600">
							{this.state.error?.message || 'An unexpected error occurred'}
						</p>
						<button
							className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
							onClick={() => this.setState({ hasError: false })}
						>
							Try again
						</button>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}
