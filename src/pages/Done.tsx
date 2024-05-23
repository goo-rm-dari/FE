import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import { Progressbar } from "../components/Progress";
import { Title } from "../components/Title";
import { DataType, useDone } from "../hooks/useDone";
import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';


export function DonePage() {
    const navigate = useNavigate();
    const { get } = useDone()
    const [data, setData] = useState<DataType>({
        timer: "{string}",
        distance: "{string}",
        kcal: 0,
        locationList: [{ lat: 0, long: 0 }]
    })

    const handleClickComplate = () => {
        navigate("/")
    }

    useEffect(() => {
        setData(get())
    }, [])

    return (
        <div className="">

            <div className="p-6 gap-4 flex flex-col">

                <Title>광치기 해변에서<br />{get().distance}km를 이동했어요 </Title>

                <Map
                    center={{ lat: get().locationList[0].lat, lng: get().locationList[0].long }}
                    style={{ width: '100%', height: '30vh' }}
                >
                    <Polyline
                        path={[
                            get().locationList.map(item => {
                                return { lat: item.lat, lng: item.long };
                            }),
                        ]}
                        strokeWeight={10}
                        strokeColor={'#7FD6E1'}
                        strokeOpacity={1}
                        strokeStyle={'solid'}
                    />

                </Map>


                <div className='flex pt-2'>
                    <div className='flex flex-1 justify-center flex-col items-center gap-2'>
                        <b>
                            {get().timer}
                        </b>
                        <p style={{ color: "#828282" }}>시간</p>

                    </div>
                    <div className='flex flex-1 justify-center flex-col items-center gap-2'>
                        <b style={{ fontSize: "1.5rem" }}>{get().kcal}kcal</b>
                        <p>칼로리</p>
                    </div>

                    <div className='flex flex-1 justify-center flex-col items-center gap-2'>
                        <b>{get().distance}km</b>
                        <p style={{ color: "#828282" }}>거리</p>

                    </div>
                </div>

                <br />

                <Progressbar></Progressbar>

            </div>

            <div className="absolute p-6 bottom-2 w-full justify-center flex items-center">
                <PrimaryButton
                    onClick={handleClickComplate}
                >
                    완료
                </PrimaryButton>
            </div>
        </div>
    )
}