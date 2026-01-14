import { useState } from 'react'
import {
	useCityQuery,
	useDistrictQuery,
	useProvinceQuery,
} from './locations/use-location'
import { Select } from './locations/select'

function App() {
	const [locations, setLocations] = useState({
		province: '',
		city: '',
		district: '',
	})

	// Queries for fetching province, city, and district data
	const {
		data: provinceData,
		isLoading: provinceLoading,
		error: provinceError,
	} = useProvinceQuery()

	const {
		data: cityData,
		isLoading: cityLoading,
		error: cityError,
	} = useCityQuery(locations.province)

	const {
		data: districtData,
		isLoading: districtLoading,
		error: districtError,
	} = useDistrictQuery(locations.city)

	// Handle selection changes
	const handleLocationChange =
		(key: keyof typeof locations) => (value: string) => {
			setLocations((prev) => {
				const updates = { ...prev, [key]: value }
				if (key === 'province') {
					updates.city = ''
					updates.district = ''
				} else if (key === 'city') {
					updates.district = ''
				}
				return updates
			})
		}

	// Display loading or error states
	if (provinceLoading) return <div>
		<p>Loading provinces...</p>
	</div>
	if (provinceError) return <div>
		<p>Error loading provinces: {provinceError.message}</p>
	</div>
	if (cityError) return <div>
		<p>Error loading cities: {cityError.message}</p>
	</div>
	if (districtError) return <div>
		<p>Error loading districts: {districtError.message}</p>
	</div>

	return (
		<div className="grid h-full place-content-center bg-blue-100">
			<div className="mx-auto w-[500px] rounded-lg bg-white p-4 shadow-md">
				<h1 className="text-xl font-semibold">React Select Chaining</h1>
				<form className="mt-4 flex flex-col gap-2">
					{/* Province Select */}
					<Select
						label="Province"
						name="province"
						options={provinceData}
						value={locations.province}
						onChange={handleLocationChange('province')}
						loading={provinceLoading}
					/>

					{/* City Select */}
					<Select
						label="City"
						name="city"
						options={cityData}
						value={locations.city}
						onChange={handleLocationChange('city')}
						disabled={!locations.province}
						loading={cityLoading}
					/>

					{/* District Select */}
					<Select
						label="District"
						name="district"
						options={districtData}
						value={locations.district}
						onChange={handleLocationChange('district')}
						disabled={!locations.city}
						loading={districtLoading}
					/>
				</form>

				{/* Display selected location */}
				{locations.province && locations.city && locations.district && (
					<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
						<h2 className="text-lg font-semibold text-green-800">Selected Location:</h2>
						<p className="text-green-700 mt-1">
							{provinceData?.find(p => p.id === locations.province)?.name} → {' '}
							{cityData?.find(c => c.id === locations.city)?.name} → {' '}
							{districtData?.find(d => d.id === locations.district)?.name}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
