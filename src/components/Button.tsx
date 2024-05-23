
export function Button({ onClick, children }: any) {
    return (
        <button onClick={onClick} className="w-20 h-20 bg-gray-500 rounded-full text-white z-10">{children}</button>
    )
}

export function PrimaryButton({ onClick, children, type = "text" }: any) {
    return (
        <button type={type} onClick={onClick} className="w-full bg-gray-400 p-3 rounded-md text-gray-50" style={{ backgroundColor: "#7FD6E1" }}>{children}</button>
    )
}

export function OutlineButton({ onClick, children, type = "text" }: any) {
    return (
        <button type={type} onClick={onClick} className="bg-gray-400 p-3 rounded-md text-gray-50" style={{ color: "#7FD6E1", border: "0.1rem solid #7FD6E1", backgroundColor: "#7FD6E11A", borderRadius: "100px", width: "auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>{children}</button>
    )
}

export function OutlineWhiteButton({ onClick, children, type = "text" }: any) {
    return (
        <button type={type} onClick={onClick} className="bg-gray-400 p-3 rounded-md text-gray-50" style={{ color: "#000000", border: "0.1rem solid #C1C1C1", backgroundColor: "#ffffff", borderRadius: "100px", width: "auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>{children}</button>
    )
}

export function CircleButton({ onClick, children, color = "#000000" }: any) {
    return (
        <button onClick={onClick} className="w-20 h-20 bg-gray-500 rounded-full text-white z-10" style={{ backgroundColor: color, fontSize: "1.25rem", display: "flex", justifyContent: "center", alignItems: "center" }}>{children}</button>
    )
}