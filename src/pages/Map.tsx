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
    const markerImage = "/marker.png"

    const imageShowSize = 30
    const imageSize = { width: imageShowSize, height: imageShowSize }
    const spriteSize = { width: imageShowSize, height: imageShowSize }
    const storeOrigin = { x: 0, y: 0 }

    const getFirstLocation = async () => {
        const getLocation = await geolocation.get()
        setLocationList([])

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
    }

    useEffect(() => {
        setLocationList([...locationList, {
            long: nowLocation.long,
            lat: nowLocation.lat
        }])
    }, [nowLocation])

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
                style={{ width: "100%", height: "100vh" }}
            >

                <Polyline
                    path={[
                        locationList.map(item => {
                            return { lat: item.lat, lng: item.long }
                        }),
                    ]}
                    strokeWeight={5}
                    strokeColor={"#FFAE00"}
                    strokeOpacity={1}
                    strokeStyle={"solid"}
                />
                {/* <MapMarker position={{ lat: nowLocation.lat, lng: nowLocation.long }}></MapMarker> */}
                <MapMarker
                    position={{ lat: nowLocation.lat, lng: nowLocation.long }} image={{
                        src: markerImage,
                        size: imageSize,
                        options: {
                            spriteSize: spriteSize,
                            spriteOrigin: storeOrigin,
                        },
                    }}
                />
            </Map>
        </>

    )
}