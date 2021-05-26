/**
 * Селектор списка стримов из Redux state
 *
 * @param state - redux state
 * @returns Состояние списка стримов
 */
export function selectStreamsList(state) {
    return state.streams.streamsList
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

export function selectIsPasswordFormOpen(state) {
    return state.app.isPasswordFormOpen
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

/**
 * Селектор размерности пагинации стримов
 *
 * @param state - redux state
 * @returns {number} Размер пагинации стримов
 */
export function selectStreamPageSize(state) {
    return state.streams.pageSize
}

/**
 * Селектор коллекции категорий из redux state
 *
 * @param state - redux state
 * @returns {[]} Коллекция категорий из redux state
 */
export function selectCategoriesList(state) {
    return state.categories.categoriesList
}

/**
 * Селектор общего колличества полученных категорий
 *
 * @param state - redux state
 * @returns {number} Общее колличество полученных категорий из redux state
 */
export function selectCategoriesTotalCount(state) {
    return state.categories.totalCount
}

/**
 * Селектор размерности пагинации категорий
 *
 * @param state - redux state
 * @returns {number} Размерность пагинации для категорий
 */
export function selectCategoriesPageSize(state) {
    return state.categories.pageSize
}

/**
 * Селектор доступных сортировок стримов
 *
 * @param state - redux state
 * @returns {*} Коллекция объектов с полями title - Название сортировки, value - ключ
 */
export function selectStreamsSortingTypes(state) {
    return state.streams.types
}

/**
 * Селектор доступных порядков сортировки
 *
 * @param state - redux state
 * @returns {*} Коллекция объектов с полями title - Название порядка сортировки, value - ключ
 */
export function selectStreamsSortingOrders(state) {
    return state.streams.orders
}

/**
 * Селектор открытого актуального стрима
 *
 * @param state - redux state
 * @returns {*} Объект актуального стрима
 */
export function selectActualStream(state) {
    return state.streams.actualStream
}

/**
 * Селектор возможных состояний stream для стримера
 *
 * @param state - redux state
 * @returns {*} Объект возможных состояний стрима
 */
export function selectStreamerStreamStates(state) {
    return state.streams.streamerStreamStates
}

/**
 * Селектор возможных состояний stream для зрителя
 *
 * @param state - redux state
 * @returns {*} Объект возможных состояний стрима
 */
export function selectViewerStreamStates(state) {
    return state.streams.viewerStreamStates
}

export function selectProfileStreamsList(state) {
    return state.profilePage.streams
}