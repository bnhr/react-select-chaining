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
			setLocations((prev) => ({ ...prev, [key]: value }))
			if (key === 'province') setLocations((prev) => ({ ...prev, city: '', district: '' }))
			if (key === 'city') setLocations((prev) => ({ ...prev, district: '' }))
		}

	// Display loading or error states
	if (provinceLoading) return <div>
		<p>Loading provinces...</p>
	</div>
	if (provinceError || cityError || districtError) return <div>
		<p>Error occurred while fetching data</p>
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
			</div>
		</div>
	)
}

export default App
