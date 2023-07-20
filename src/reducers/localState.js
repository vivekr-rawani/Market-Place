export const loadState = () => {
    try {
        const serialState = localStorage.getItem('profile')
        if(serialState === null) 
            return undefined
        else 
            return JSON.parse(serialState)
    } catch (err) {
        return undefined
    }
}