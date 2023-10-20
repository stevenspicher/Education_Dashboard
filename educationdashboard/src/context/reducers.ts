export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SAVE_REPORT':
            return state = {...state, report: action.report}
        default:
            return state
    }
}