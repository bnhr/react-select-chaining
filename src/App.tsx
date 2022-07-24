import * as React from 'react'
import { useDistricts, useProvince, useRegencies } from './lib/fetcher'

function App() {
  const [location, locationSet] = React.useState({
    regencyID: 'init',
    districtID: 'init',
  })

  const { provinces, provincesLoading, provincesError } = useProvince()

  const { regencies, regenciesLoading, regenciesError } = useRegencies(
    location.regencyID
  )

  const { districts, districtsLoading, districtsError } = useDistricts(
    location.districtID
  )

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    locationSet({ regencyID: value, districtID: 'init' })
  }

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    locationSet({ ...location, districtID: value })
  }

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    console.log(value)
  }

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center">
      <form className="flex flex-col bg-blue-50 p-8 min-w-[500px] mx-auto space-y-5 rounded-md">
        <h1 className="text-2xl font-semibold">Input Asal Anda</h1>
        <label htmlFor="provinsi" className="flex flex-col space-y-2">
          <span className="text-gray-600 text-lg">Provinsi</span>
          <select name="provinsi" id="provinsi" onChange={handleProvinceChange}>
            <option value="pilihan" hidden>
              Pilih Provinsi
            </option>
            {provincesLoading ? (
              <option value="loading">loading data..</option>
            ) : null}
            {provincesError ? (
              <option value="error">error to fetch province</option>
            ) : null}

            {provinces?.length !== 0 ? (
              <>
                {provinces?.map(prov => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </label>

        <label htmlFor="kota" className="flex flex-col space-y-2">
          <span className="text-gray-600 text-lg">Kota/Kabupaten</span>
          <select name="kota" id="kota" onChange={handleRegencyChange}>
            <option value="pilihan" hidden>
              Pilih Kota/Kabupaten
            </option>

            {regenciesLoading ? (
              <option value="loading">loading regencies data..</option>
            ) : null}
            {regenciesError ? (
              <option value="error">error to fetch regencies data...</option>
            ) : null}
            {regencies?.length !== 0 ? (
              <>
                {regencies?.map(reg => (
                  <option key={reg?.id} value={reg?.id}>
                    {reg?.name}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </label>

        <label htmlFor="kecamatan" className="flex flex-col space-y-2">
          <span className="text-gray-600 text-lg">Kecamatan</span>
          <select
            name="kecamatan"
            id="kecamatan"
            onChange={handleDistrictChange}
          >
            <option value="pilihan" hidden>
              Pilih Kecamatan
            </option>

            {districtsLoading ? (
              <option value="loading">loading districts data..</option>
            ) : null}
            {districtsError ? (
              <option value="error">error to fetch districts data..'</option>
            ) : null}
            {districts?.length !== 0 ? (
              <>
                {districts?.map(dist => (
                  <option key={dist?.id} value={dist?.id}>
                    {dist?.name}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </label>

        <button type="submit" className="bg-blue-800 text-blue-100 px-2 py-3">
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
