
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