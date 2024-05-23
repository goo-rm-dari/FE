
function Progressbar({
    percent = 10
}: {
    percent?: number;
}) {

    return (
        <div
            style={{
                width: "100%",
                position: "relative",
                height: "0.5rem",
                transition: "0.3s",
                backgroundColor: "#E0E0E0",
                borderRadius: "0.4rem",
            }}
        >
            <div
                style={{
                    width: percent >= 100 ? "100%" : `${percent}%`,
                    position: "absolute",
                    backgroundColor: "#7FD6E1",
                    borderRadius: "0.4rem",
                    height: "0.5rem",
                    transition: "0.3s",
                }}
            ></div>
        </div>
    );
}

export { Progressbar };