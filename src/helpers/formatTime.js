export const formatTime = (time) => {
    const saat =  time.split("h")[0]
    const dakika = time.split("h")[1].split("m")[0]

    return `${saat}saat ${dakika}dakika`
}