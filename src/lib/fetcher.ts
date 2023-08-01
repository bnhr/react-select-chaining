import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'

import {
  DistrictsProps,
  ProvincesProps,
  CitiesProps
} from '../types/location'

const instance = axios.create({
  baseURL: 'http://www.emsifa.com/api-wilayah-indonesia/api/',
  headers: {
    'Content-type': 'application/json',
  },
})

async function fetcher<TResponse>(url: string) {
  try {
    const res: AxiosResponse<TResponse> = await instance.get(url)
    return res.data
  } catch (error) {
    throw new Error('error occurred')
  }
}

function useProvince() {
  const { data, error } = useSWR<ProvincesProps[], unknown>(
    'provinces.json',
    fetcher
  )

  return {
    provinces: data,
    provincesLoading: !error && !data,
    provincesError: error,
  }
}

function useCities(id: string) {
  const { data, error } = useSWR<CitiesProps[], unknown>(
    id !== 'init' ? `regencies/${id}.json` : null,
    fetcher
  )

  return {
    cities: data,
    citiesLoading: !error && !data,
    citiesError: error,
  }
}

function useDistricts(id: string) {
  const { data, error } = useSWR<DistrictsProps[], unknown>(
    id !== 'init' ? `districts/${id}.json` : null,
    fetcher
  )

  return {
    districts: data,
    districtsLoading: !error && !data,
    districtsError: error,
  }
}

export { useProvince, useCities, useDistricts }