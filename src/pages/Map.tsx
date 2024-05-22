import { useEffect, useState } from "react"
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk"
import { geolocation } from "../utils/getLocation"

export function MapPage() {

    const [firstLocation, setFirstLocation] = useState({
        long: 33.5563,
        lat: 126.79581,
    })
    const [nowLocation, setNowLocation] = useState({
        long: 33.5563,
        lat: 126.79581,
    })

    const [locationList, setLocationList] = useState([{
        long: 33.5563,
        lat: 126.79581,
    }])

    const interval = 2000

    const getFirstLocation = async () => {
        const getLocation = await geolocation.get()
        setFirstLocation({
            long: getLocation?.long,
            lat: getLocation?.lat
        })

    }

    const getGeoLocation = async () => {
        const getLocation = await geolocation.get()
        console.log(getLocation)
        setNowLocation({
            long: getLocation?.long,
            lat: getLocation?.lat
        })

        if (locationList.length == 1) {
            locationList.pop()
        }

        locationList.push({
            long: getLocation?.long,
            lat: getLocation?.lat
        })

        setLocationList([...locationList])
    }

    useEffect(() => {
        getFirstLocation()
        setInterval(() => {
            getGeoLocation()

        }, interval)
    }, [])

    return (
        <>

            <Map
                center={{ lat: firstLocation.lat, lng: firstLocation.long }}
                style={{ width: "100%", height: "360px" }}
            >

                <Polyline
                    path={[
                        locationList.map(item => {
                            return { lat: item.lat, lng: item.long }
                        }),
                    ]}
                    strokeWeight={5}
                    strokeColor={"#FFAE00"}
                    strokeOpacity={0.7}
                    strokeStyle={"solid"}
                />
                <MapMarker position={{ lat: nowLocation.lat, lng: nowLocation.long }}></MapMarker>

            </Map>
        </>

    )
}