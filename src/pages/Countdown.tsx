import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function CountdownPage() {
    const navigate = useNavigate()
    const [count, setCount] = useState(3)
    const [startTime, setStartTime] = useState(new Date())

    useEffect(() => {
        if (count <= 0) {
            navigate('/')
        }
    }, [count])

    useEffect(() => {
        setInterval(() => {
            const mls = startTime.getTime() - new Date().getTime()
            console.log(mls)
            setCount((cnt) => 3 - Math.round(Math.abs(mls / 1000)))
        }, 980)
    }, [])

    return (
        <div className="flex w-full h-full justify-center items-center align-middle font-bold text-6xl animate-ping duration-1000	">
            {count}
        </div>
    )
}