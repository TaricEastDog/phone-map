import { mockiPhoneData } from "../apis/mockiApi"
import { useQuery } from "@tanstack/react-query"

import { PhoneFilters } from "../components/PhoneMap/Map/PhoneMap"

const queryName = "phoneData"

export interface resData {
  id: string
  imei: string
  last_altitude: string
  last_heartbeat: string
  last_latitude: string
  last_longitude: string
  last_speed: string
  last_status: string
  last_track_time: string
  sim_number: string
}

const PhoneDataQuery = async (filters: PhoneFilters) => {
  const { data } = await mockiPhoneData.get(``, {})

  let filteredData: any = data.data

  // if (!filters.status) {
  //   filteredData = data.data.filter(
  //     (phone: any) => phone.last_status === "No Alarm"
  //   )
  // }

  // filteredData = filteredData.filter(
  //   (phone: any) =>
  //     phone.last_speed >= filters.minSpeed &&
  //     phone.last_speed <= filters.maxSpeed
  // )

  return filteredData
}

export const usePhoneDataQuery = (filters: PhoneFilters) => {
  return useQuery<resData[]>([queryName], () => PhoneDataQuery(filters), {
    select: (data) =>
      data.filter((phone) =>
        !filters.status
          ? phone.last_status.includes("No Alarm") &&
            parseFloat(phone.last_speed) >= filters.minSpeed &&
            parseFloat(phone.last_speed) <= filters.maxSpeed
          : phone &&
            parseFloat(phone.last_speed) >= filters.minSpeed &&
            parseFloat(phone.last_speed) <= filters.maxSpeed
      )
  })
}
