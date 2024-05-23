import { useEffect, useState } from "react"
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk"
import { geolocation } from "../utils/getLocation"
import { Button } from "../components/Button"

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
    const [kcal, setKcal] = useState(0)

    const [startTime, setStartTime] = useState(new Date())
    const [duration, setDuration] = useState("")

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

    const calculateKcal = () => {
        const kg = 70
        return kg * distance / 1000
    }

    const getDuration = () => {
        const milliseconds = new Date().getTime() - startTime.getTime()

        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return minutes + ":" + (milliseconds < 10 ? '0' : '') + seconds;
    }

    const handleClickTrash = () => {
        setTrashCount((trash) => trash + 1)
    }

    const handleClickStopPlogging = () => {
        setTrashCount((trash) => trash + 1)
    }

    useEffect(() => {
        setLocationList([...locationList, {
            long: nowLocation.long,
            lat: nowLocation.lat
        }])

        try {
            setDistance(getGeoLocationLength())
            setKcal(calculateKcal())
        } catch (error) { }
    }, [nowLocation])

    useEffect(() => {
        getFirstLocation()

        setInterval(() => {
            getGeoLocation()

        }, interval)

        setInterval(() => {
            setDuration(getDuration())

        }, 1000)
    }, [])

    return (
        <>

            <Map
                center={{ lat: firstLocation.lat, lng: firstLocation.long }}
                style={{ width: "100%", height: "50vh" }}
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

            <b className="absolute top-2 left-2 z-10">{trashCount}개의 쓰레기</b>

            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-10">

                <div className="flex pt-2">
                    <div className="flex justify-center flex-1">
                        <b>{kcal}kcal</b>

                    </div>
                    <div className="flex justify-center flex-1">
                        <b>{duration}</b>

                    </div>
                    <div className="flex justify-center flex-1">
                        <b>{distance / 1000}km</b>
                    </div>
                </div>

                <div className="flex pt-2 bottom-4 absolute w-full">
                    <div className="flex justify-center flex-1">
                        <Button onClick={handleClickStopPlogging} >플로깅 종료</Button>

                    </div>
                    <div className="flex justify-center flex-1">

                    </div>
                    <div className="flex justify-center flex-1">
                        <Button onClick={handleClickTrash} >쓰레기 주움</Button>
                    </div>
                </div>
            </div>


        </>

    )
}