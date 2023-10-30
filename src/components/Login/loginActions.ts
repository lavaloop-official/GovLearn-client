const changeType = (type: string) => ({
    type: 'CHANGE_TYPE',
    payload: type
})

const changeOpen = (open: boolean) => ({
    type: 'CHANGE_OPEN',
    payload: open
})

const changeLoading = (loading: boolean) => ({
    type: 'CHANGE_LOADING',
    payload: loading
})

export {
    changeType,
    changeOpen,
    changeLoading
}