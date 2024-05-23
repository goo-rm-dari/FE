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

    const [moveLine, setMoveLine] = useState<any>()

    const [trashCount, setTrashCount] = useState(0)
    const [distance, setDistance] = useState(0)

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
        setNowLocation({
            long: getLocation?.long,
            lat: getLocation?.lat
        })
    }

    const getGeoLocationLength = () => {
        return Math.round(moveLine.getLength())
    }

    const handleClickTrash = () => {
        setTrashCount((trash) => trash + 1)
    }


    useEffect(() => {
        setLocationList([...locationList, {
            long: nowLocation.long,
            lat: nowLocation.lat
        }])

        try {
            setDistance(getGeoLocationLength())
        } catch (error) { }
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
                    onCreate={setMoveLine}

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

            <button onClick={handleClickTrash} className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-sm p-4 text-white z-10">{trashCount}개의 쓰레기를 주움</button>
            <div className="fixed top-1 left-1 z-20">{distance}m 이동</div>
        </>

    )
}