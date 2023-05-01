const timeMachine = {
    secondsTillMidnight() {
        const date = new Date()
        const hr = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()
        const secondsTillMidnight = (24 * 60 * 60) - (hr * 60 * 60) - (min * 60) - sec
        return secondsTillMidnight
    }
}
export default timeMachine