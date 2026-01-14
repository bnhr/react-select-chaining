import clsx from 'clsx'
import { BaseLocation } from './types'

type SelectProps = {
	label: string
	name: string
	options: BaseLocation[] | undefined
	value: string
	onChange: (value: string) => void
	disabled?: boolean
	loading?: boolean
	error?: string
}

export function Select({
	label,
	name,
	options,
	value,
	onChange,
	disabled = false,
	loading = false,
	error,
}: SelectProps) {
	const errorId = `${name}-error`

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name}>{label}</label>
			<select
				name={name}
				id={name}
				aria-describedby={error ? errorId : undefined}
				aria-invalid={!!error}
        className={clsx(
          'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition duration-150 ease-in-out',
          {
            'border-red-500 focus:ring-red-200': !!error,
            'bg-blue-100 border-blue-300 text-blue-800 cursor-not-allowed': disabled || loading,
            'bg-white border-blue-500 text-blue-900 hover:border-blue-600 focus:border-blue-700 focus:ring-blue-200': !disabled && !loading && !error
          }
        )}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled || loading}
			>
				<option value="" disabled>
					{loading ? `Loading ${label}...` : `Select ${label}`}
				</option>
				{!loading && options?.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
			{error && (
				<p id={errorId} className="text-sm text-red-600" role="alert">
					{error}
				</p>
			)}
		</div>
	)
}
