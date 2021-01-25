import {store} from '../../store'
import {getStreamsFromServ} from '../stream_reducer'
import {getStreams} from '../../../API/streams_api'
import {getUser} from '../../../API/user_api'
import {selectStreamsList} from "../../selectors/selectors";

jest.mock('../../../API/user_api', () => ({
    __esModule: true,
    getUser: jest.fn()
}))

jest.mock('../../../API/streams_api', () => ({
    __esModule: true,
    getStreams: jest.fn()
}))


describe('Get streams from server test',() => {

    it('Get streams with and without replace', async () => {
        let streamsList = selectStreamsList(store.getState())
        expect(streamsList.length).toBe(0)
        const getStreamsImpl = async (streamsProps) => {
            return [
                {
                    title: 'stream 1',
                    userId: '1'
                },
                {
                    title: 'stream 2',
                    userId: '2'
                }
            ]
        }
        async function getUserImpl(userId) {
            return {
                userAttributes: [
                    {name: 'sub', value: userId},
                    {name: 'second_name', value: userId + ' again'}
                ]
            }
        }

        getStreams.mockImplementation(getStreamsImpl)
        getUser.mockImplementation(getUserImpl)

        const getStreamsFromServWithReplaceFunc = getStreamsFromServ(
            true,
            '',
            [],
            'DATE',
            false
        )
        await getStreamsFromServWithReplaceFunc(store.dispatch, store.getState)

        streamsList = selectStreamsList(store.getState())
        expect(streamsList.length).toBe(2)

        expect(streamsList).toStrictEqual([
            {
                title: 'stream 1',
                userId: '1',
                user: {
                    sub: '1',
                    second_name: '1 again'
                }
            },
            {
                title: 'stream 2',
                userId: '2',
                user: {
                    sub: '2',
                    second_name: '2 again'
                }
            }
        ])


        const getStreamsFromServWithoutReplaceFunc = getStreamsFromServ(
            false,
            '',
            [],
            'DATE',
            false
        )
        await getStreamsFromServWithoutReplaceFunc(store.dispatch, store.getState)

        streamsList = selectStreamsList(store.getState())
        expect(streamsList.length).toBe(4)

        expect(streamsList).toStrictEqual([
            {
                title: 'stream 1',
                userId: '1',
                user: {
                    sub: '1',
                    second_name: '1 again'
                }
            },
            {
                title: 'stream 2',
                userId: '2',
                user: {
                    sub: '2',
                    second_name: '2 again'
                }
            },
            {
                title: 'stream 1',
                userId: '1',
                user: {
                    sub: '1',
                    second_name: '1 again'
                }
            },
            {
                title: 'stream 2',
                userId: '2',
                user: {
                    sub: '2',
                    second_name: '2 again'
                }
            }
        ])
    })
})