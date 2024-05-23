
import { useState, useEffect, useRef } from "react";
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
import { Button } from "../components/Button";


function Main() {
    const [predictAccuracy, setAccuracy] = useState([])
    const imageRef: any = useRef()

    useEffect(() => {
        predict()
    }, [])

    const predict = async () => {
        const img: any = imageRef.current
        const model = await mobilenet.load();
        const predictions: any = await model.classify(img);

        setAccuracy(predictions)
    }

    const predictionsMap = predictAccuracy.map((item: any) => {
        return <PredictAccuracyItem name={item.className} probability={item.probability}></PredictAccuracyItem>
    })

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 1280, height: 720, facingMode: { exact: "environment" },
                },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.oncanplaythrough = () => {
                    if (canvasRef.current && videoRef.current) {
                        canvasRef.current.width = videoRef.current.videoWidth;
                        canvasRef.current.height = videoRef.current.videoHeight;
                        drawVideoToCanvas();
                    }
                };
            }
        } catch (err) {
            console.error('Error accessing webcam: ', err);
        }
    };

    const drawVideoToCanvas = () => {
        try {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            requestAnimationFrame(drawVideoToCanvas);
        } catch (error) { }
    };

    useEffect(() => {


        startWebcam();
    }, []);



    const handleClickTakePicture = () => {
        imageRef.current.src = canvasRef.current.toDataURL('image/png');
        predict()
    }


    return (
        <header className="bg-white h-100">
            <div className="pt-4">
                <video ref={videoRef} style={{ display: 'none', width: "100%" }} autoPlay playsInline />
                <canvas style={{ width: "100%", border: "0.1rem solid #7FD6E1", borderRadius: "0.25rem" }} ref={canvasRef}></canvas>
            </div>

            <div className="absolute bottom-2 w-full justify-center flex">
                <Button onClick={handleClickTakePicture}>사진 촬영</Button>

            </div>

            <img
                src="/dog.jpg"
                ref={imageRef}
                width="224"
            ></img>
            {predictionsMap}
        </header>
    );
}

function PredictAccuracyItem({ name, probability }: any) {
    return (
        <div className="bg-light p-2 mb-1" role="alert">
            {name} <span className="material-symbols-outlined">chevron_right</span> {probability.toFixed(4)}% 일치율
        </div>
    )
}

// function FileUpload({ image, predict }: any) {
//     const [file, setFile] = useState()
//     const fileRef = useRef()

//     const handleFileChange = (e: any) => {
//         if (!e.target.files) {
//             return 0
//         }

//         const uploadFile = e.target.files[0]

//         setFile(uploadFile)
//         changeFile(uploadFile)
//         console.log(file)
//     }

//     const changeFile = (uploadFile: any) => {
//         const fileUrl = fileToUrl(uploadFile)
//         image.current.src = canvas.toDataURL('image/png');
//         sendToPredict()
//     }

//     const fileToUrl = (targetFile: any) => {
//         const url = URL.createObjectURL(targetFile)
//         return url
//     }

//     const sendToPredict = () => {
//         predict()
//     }

//     const handleClickUpload = () => {
//         const fileC: any = fileRef.current
//         fileC.click()
//     }

//     return (
//         <div className="mb-3">
//             <label htmlFor="formFile hidden" className="form-label">예측할 파일 업로드</label>
//             <input className="form-control hidden" type="file" ref={fileRef} id="formFile" onChange={handleFileChange} />

//             <Button onClick={handleClickUpload}>업로드</Button>
//         </div>
//     )
// }


export function CheckTrashPage() {
    return (
        <div className="m-3">
            <h2 className="text-2xl">쓰레기 사진을 찍어 인증해 주세요</h2>
            <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
            <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
            <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></script>
            <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose"></script>
            <Main></Main>
        </div>
    )
}