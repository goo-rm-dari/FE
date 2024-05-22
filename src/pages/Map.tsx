import { useEffect, useState } from "react"
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { geolocation } from "../utils/getLocation"

export function MapPage() {
    const [nowLocation, setNowLocation] = useState({
        long: 33.5563,
        lat: 126.79581,
    })

    const [locationList, setLocationList] = useState([{
        long: 33.5563,
        lat: 126.79581,
    }])

    const getGeoLocation = async () => {
        const getLocation = await geolocation.get()
        console.log(getLocation)
        setNowLocation({
            long: getLocation?.long,
            lat: getLocation?.lat
        })

        locationList.push({
            long: getLocation?.long,
            lat: getLocation?.lat
        })

        setLocationList([...locationList])
    }

    useEffect(() => {
        setInterval(() => {
            getGeoLocation()

        }, 1000)
    }, [])

    return (
        <>

            <Map
                center={{ lat: nowLocation.lat, lng: nowLocation.long }}
                style={{ width: "100%", height: "360px" }}
            >
                {locationList.map(geo => (
                    <MapMarker position={{ lat: geo.lat, lng: geo.long }}>
                        <div style={{ color: "#000" }}>Hello World!</div>
                    </MapMarker>
                ))}

            </Map>
        </>

    )
}