import axios from 'axios'
import useSWR from 'swr'

import {
  DistrictsProps,
  ProvincesProps,
  RegenciesProps,
} from '../types/location'

const instance = axios.create({
  baseURL: 'http://www.emsifa.com/api-wilayah-indonesia/api/',
  headers: {
    'Content-type': 'application/json',
  },
})

async function fetcher(url: string) {
  try {
    const res = await instance.get(url)
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

function useRegencies(id: string) {
  const { data, error } = useSWR<RegenciesProps[], unknown>(
    id !== 'init' ? `regencies/${id}.json` : null,
    fetcher
  )

  return {
    regencies: data,
    regenciesLoading: !error && !data,
    regenciesError: error,
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

export { useProvince, useRegencies, useDistricts }
