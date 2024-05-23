
export function Button({ onClick, children }: any) {
    return (
        <button onClick={onClick} className="w-20 h-20 bg-gray-500 rounded-full text-white z-10">{children}</button>
    )
}