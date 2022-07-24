export interface LocationProps {
  id: string
  province_id: string
  regency_id: string
  district_id: string
  name: string
}

export type ProvincesProps = Pick<LocationProps, 'id' | 'name'>
export type RegenciesProps = Pick<LocationProps, 'id' | 'name' | 'province_id'>
export type DistrictsProps = Pick<LocationProps, 'id' | 'name' | 'regency_id'>

export type LocProps = Pick<
  LocationProps,
  'province_id' | 'regency_id' | 'district_id'
>
