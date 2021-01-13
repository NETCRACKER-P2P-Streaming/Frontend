/**
 * Селектор списка стримов из Redux state
 *
 * @param state - redux state
 * @returns Состояние списка стримов
 */
export function selectStreamsListSelect(state) {
    return state.streams.streamsList
}

/**
 * Селектор общего колличества стримов из Redux state
 *
 * @param state - redux state
 * @returns Состояние общего колличества стримов из Redux state
 */
export function selectStreamsTotalCount(state) {
    return state.streams.totalCount
}

/**
 * Селектор загрузки приложения из Redux state
 *
 * @param state - redux state
 * @returns Состояние загрузки приложения изи Redux state
 */
export function selectAppLoading(state) {
    return state.app.loading
}

/**
 * Селектор флага открытия \ закрытия формы авторизации из Redux state
 *
 * @param state - redux state
 * @returns Состояние открытия \ закрытия окна авторизации
 */
export function selectIsAuthFormOpen(state) {
    return state.app.isAuthFormOpen
}

/**
 * Селектор состояния данных пользователя из Redux state
 *
 * @param state - redux state
 * @returns Данные пользователя из Redux state
 */
export function selectUserData(state) {
    return state.user.userData
}