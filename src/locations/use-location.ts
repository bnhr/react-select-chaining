import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ofetch } from 'ofetch'
import { CityProps, DistrictProps, ProvinceProps } from './types'

const BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api'

// Generic fetcher function to handle API requests
async function fetcher<TResult>(url: string): Promise<TResult> {
	try {
		return await ofetch<TResult>(url)
	} catch (error) {
		console.error('Fetch error:', error)
		throw error
	}
}

// Hook to fetch provinces
export function useProvinceQuery(): UseQueryResult<ProvinceProps[], Error> {
	return useQuery({
		queryKey: ['province'],
		queryFn: () => fetcher<ProvinceProps[]>(`${BASE_URL}/provinces.json`),
	})
}

// Hook to fetch cities within a province
export function useCityQuery(
	provId: string | null,
): UseQueryResult<CityProps[], Error> {
	return useQuery({
		queryKey: ['city', provId],
		queryFn: () => fetcher<CityProps[]>(`${BASE_URL}/regencies/${provId}.json`),
		enabled: !!provId, // Only fetch if provId is provided
	})
}

// Hook to fetch districts within a city
export function useDistrictQuery(
	cityId: string | null,
): UseQueryResult<DistrictProps[], Error> {
	return useQuery({
		queryKey: ['district', cityId],
		queryFn: () =>
			fetcher<DistrictProps[]>(`${BASE_URL}/districts/${cityId}.json`),
		enabled: !!cityId, // Only fetch if cityId is provided
	})
}
