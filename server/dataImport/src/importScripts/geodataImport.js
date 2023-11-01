import district_demographic_join from "../assets/district_demographic_join.json"
import etl_district_full_data_with_geometries from "../assets/etl_district_full_data_with_geometries.json"

export const geoDataConversion = () => {
    district_demographic_join.features.forEach((district) => {

        console.log(district)
    })
};