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
    value: 15,
    label: "15km/h"
  },
  {
    value: 50,
    label: "50km/h"
  }
]
