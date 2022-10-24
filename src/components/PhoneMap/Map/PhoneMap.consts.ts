export const center: { lat: number; lng: number } = {
  lat: 9.6,
  lng: 10.4
}

export const containerStyle: { width: string; height: string } = {
  width: "100%",
  height: `${(window.innerHeight * 0.8).toFixed()}px`
}

export const sliderMarks = [
  {
    value: 0,
    label: "0km/h"
  },
  {
    value: 10,
    label: "10km/h"
  },
  {
    value: 20,
    label: "20km/h"
  },
  {
    value: 40,
    label: "40km/h"
  },
  {
    value: 60,
    label: "60km/h"
  }
]
