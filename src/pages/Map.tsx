import { useEffect, useRef, useState } from "react"
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk"
import { geolocation } from "../utils/getLocation"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { TopShadow } from "../components/TopShadow"

export function MapPage() {
    const navigate = useNavigate()

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

    const [trashLocationList, setTrashLocationList] = useState<any>([])

    const [moveLine, setMoveLine] = useState<any>()

    const [trashCount, setTrashCount] = useState(0)
    const [distance, setDistance] = useState(0)
    const [kcal, setKcal] = useState(0)

    const [startTime, setStartTime] = useState(new Date())
    const [savedDuration, setSavedDuration] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isClock, setIsClock] = useState(true)
    const timeRef = useRef<any>(null)

    const interval = 1000
    const markerImage = "/marker.png"
    const trashMarkerImage = "/trash.jpeg"

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

    const addTrash = async () => {
        const getLocation = await geolocation.get()
        setTrashLocationList([...trashLocationList, {
            long: getLocation?.long,
            lat: getLocation?.lat
        }])
    }


    const calculateKcal = () => {
        const kg = 70
        return kg * distance / 1000
    }

    const getDuration = () => {
        return new Date().getTime() - startTime.getTime()
    }


    const startTimer = () => {
        setStartTime(() => new Date())
        setSavedDuration(0)

        timeRef.current = setInterval(() => {
            setDuration((time) => time + 1000)
            console.log("AAAA")
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(timeRef.current)
    }

    const isAvailableAppendLocation = () => {
        try {
            if (locationList.length < 3) {
                return true
            }

            const prevLocation = locationList[locationList.length - 1]
            const R = 6371;
            const dLat = (prevLocation.lat - nowLocation.lat) * (Math.PI / 180)
            const dLon = (prevLocation.long - nowLocation.long) * (Math.PI / 180)
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((nowLocation.lat) * (Math.PI / 180)) * Math.cos((prevLocation.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = (R * c) * 1000; // m단위

            if (d < 5) {
                return false
            }

            return true
        } catch (error) { }
    }

    const handleClickTrash = () => {
        setTrashCount((trash) => trash + 1)
        addTrash()
    }

    const handleClickStopPlogging = () => {
        navigate('/plogging/done')
    }

    const handleClickStopClock = () => {
        setStartTime(() => new Date())
        setSavedDuration((saved) => saved + (new Date().getTime() - startTime.getTime()))
        setIsClock(false)
        stopTimer()
    }

    const handleClickStartClock = () => {
        setStartTime(() => new Date())
        setIsClock(true)
        startTimer()
    }


    useEffect(() => {
        if (isAvailableAppendLocation()) {
            setLocationList([...locationList, {
                long: nowLocation.long,
                lat: nowLocation.lat
            }])
        }

        try {
            setDistance(getGeoLocationLength())
            setKcal(calculateKcal())
        } catch (error) { }
    }, [nowLocation])


    useEffect(() => {
        getFirstLocation()
        startTimer()

        setInterval(() => {
            getGeoLocation()

        }, interval)

        return () => stopTimer()
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
                    strokeWeight={10}
                    strokeColor={"#7FD6E1"}
                    strokeOpacity={1}
                    strokeStyle={"solid"}
                    onCreate={setMoveLine}

                />

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

                {trashLocationList.map((trash: any) => (
                    <MapMarker
                        position={{ lat: trash.lat, lng: trash.long }}
                        image={{
                            src: trashMarkerImage,
                            size: imageSize,
                            options: {
                                spriteSize: spriteSize,
                                spriteOrigin: storeOrigin,
                            },
                        }}
                    />
                ))}


            </Map>

            <b className="absolute top-2 left-2 z-10">{trashCount}개의 쓰레기</b>



            <div className="relative bottom-0 left-0 w-full h-1/2 bg-white z-10">
                <TopShadow />

                <div className="flex pt-2">
                    <div className="flex justify-center flex-1">
                        <b>{kcal}kcal</b>

                    </div>
                    <div className="flex justify-center flex-1">
                        <b>{Math.floor(duration / 60000) + ":" + (duration < 10 ? '0' : '') + ((duration % 60000) / 1000).toFixed(0)}</b>

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
                        {isClock ? (
                            <Button onClick={handleClickStopClock}>시간 중단</Button>

                        ) : (
                            <Button onClick={handleClickStartClock}>시간 재개</Button>

                        )}

                    </div>
                    <div className="flex justify-center flex-1">
                        <Button onClick={handleClickTrash} >쓰레기 주움</Button>
                    </div>
                </div>
            </div>


        </>

    )
}