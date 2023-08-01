export interface LocationProps {
  id: string
  province_id: string
  city_id: string
  district_id: string
  name: string
}

export type ProvincesProps = Pick<LocationProps, 'id' | 'name'>
export type CitiesProps = Pick<LocationProps, 'id' | 'name' | 'province_id'>
export type DistrictsProps = Pick<LocationProps, 'id' | 'name' | 'city_id'>

export type LocProps = Pick<
  LocationProps,
  'province_id' | 'city_id' | 'district_id'
>