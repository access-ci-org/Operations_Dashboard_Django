export default function DefaultReducer(state, newState) {
    if (Array.isArray(state)) {
        return [
            ...newState
        ]
    } else if (typeof state === "number" || typeof state === "string" || state === null || state === undefined) {
        return newState
    } else if (typeof state === "object") {
        return {
            ...newState
        }
    }
}