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

const PhoneDataQuery = async () => {
  const { data } = await mockiPhoneData.get(``, {})

  return data.data
}

export const usePhoneDataQuery = (filters: PhoneFilters) => {
  return useQuery<resData[]>([queryName], () => PhoneDataQuery(), {
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
