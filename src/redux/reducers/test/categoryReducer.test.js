import {store} from '../../store'
import {getCategoriesToSearchFromServ} from '../category_reducer'
import {getCategoriesToSearch} from '../../../API/category_api'
import {selectCategoriesList} from "../../selectors/selectors";

jest.mock('../../../API/category_api', () => ({
    __esModule: true,
    getCategoriesToSearch: jest.fn()
}))

describe('Get categories to search test',() => {
    it('Get categories test', async () => {
        expect(selectCategoriesList(store.getState()).length).toBe(0)
        getCategoriesToSearch.mockImplementation(async () => [
            {
                name: 'category 1',
                id: 1
            },
            {
                name: 'category 2',
                id: 2
            }
        ])
        const getCategoriesToSearchFromServFunc = getCategoriesToSearchFromServ()
        await getCategoriesToSearchFromServFunc(store.dispatch)
        expect(selectCategoriesList(store.getState()).length).toBe(2)
        expect(selectCategoriesList(store.getState())).toStrictEqual([
            {
                name: 'category 1',
                id: 1
            },
            {
                name: 'category 2',
                id: 2
            }
        ])
    })
})