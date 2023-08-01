import { ChangeEvent, useState } from 'react'
import { useCities, useDistricts, useProvince } from './lib/fetcher'

function App() {
  const [location, locationSet] = useState({
    cityID: 'init',
    districtID: 'init',
  })

  const { provinces, provincesError, provincesLoading } = useProvince()
  const { cities, citiesError, citiesLoading } = useCities(
    location.cityID
  )
  const { districts, districtsError, districtsLoading } = useDistricts(
    location.districtID
  )

  const onProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    locationSet({ cityID: e.target.value, districtID: 'init' })
  }

  const onCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    locationSet({ ...location, districtID: e.target.value })
  }

  const onDstrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('selected district', e.target.value)
  }

  return (
    <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <div className='border border-gray-400 rounded-sm p-6 min-w-[350px] space-y-5'>
        <h1 className='text-xl font-semibold'>Choose Address</h1>
        <form className='space-y-5'>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='province' className='text-gray-600'>
              Province
            </label>
            <select
              name='province'
              id='province'
              className='p-2 border border-gray-300 rounded-md'
              onChange={e => onProvinceChange(e)}
            >
              <option value='choose province' hidden>
                Choose province
              </option>
              {provincesLoading ? (
                <option value='fetching province' hidden>
                  fetching province
                </option>
              ) : null}
              {provincesError ? (
                <option value='error fetching province' hidden>
                  error fetching province
                </option>
              ) : null}
              {provinces?.map(province => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='city' className='text-gray-600'>
              City
            </label>
            <select
              name='city'
              id='city'
              className='p-2 border border-gray-300 rounded-md'
              onChange={e => onCityChange(e)}
            >
              <option value='choose city' hidden>
                Choose city
              </option>
              {citiesLoading ? (
                <option value='fetching city' hidden>
                  fetching city
                </option>
              ) : null}
              {citiesError ? (
                <option value='error fetching city' hidden>
                  error fetching city
                </option>
              ) : null}
              {cities?.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='district' className='text-gray-600'>
              District
            </label>
            <select
              name='district'
              id='district'
              className='p-2 border border-gray-300 rounded-md'
              onChange={e => onDstrictChange(e)}
            >
              <option value='choose district' hidden>
                Choose district
              </option>
              {districtsLoading ? (
                <option value='fetching district' hidden>
                  fetching district
                </option>
              ) : null}
              {districtsError ? (
                <option value='error fetching district' hidden>
                  error fetching district
                </option>
              ) : null}
              {districts?.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className='!mt-10'>
            <button
              type='submit'
              className='block w-full bg-gray-800 text-gray-50 py-2 px-3 rounded-md'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
