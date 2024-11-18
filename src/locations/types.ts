export interface BaseLocation {
	id: string
	name: string
}

export type ProvinceProps = BaseLocation

export type CityProps = BaseLocation & {
	province_id: string
}

export type DistrictProps = BaseLocation & {
	regency_id: string
}
