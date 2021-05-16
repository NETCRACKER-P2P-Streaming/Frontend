import React, {useEffect, useState} from 'react'
import {Main} from 'grommet'
import StreamPageContainer from './stream_main/StreamPageContainer'
import {Route} from 'react-router-dom'
import StartStreamPageContainer from './start_stream_page/StartStreamPageContainer'
import useWindowDimensions from '../../utils/useWindowDimention'
import StreamContainer from './stream/StreamContainer'

export default function MainBody() {

    // Данные, необходимые для выбора высоты элемента
    const {height, width} = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)
    useEffect(
        () => setHeaderHei(document.querySelector('header')?.clientHeight),
        [height, width]
    )

    return (
        <Main>
            <Route
                path={'/'}
                exact={true}
                render={() => <StreamPageContainer
                    height={height}
                    width={width}
                    headerHei={headerHei}
                />}
            />
            <Route
                path={'/start-stream'}
                exact={true}
                render={() => <StartStreamPageContainer
                    height={height}
                    headerHei={headerHei}
                />}
            />
            <Route
                path={'/start-stream/:id'}
                exact={true}
                render={() => <StartStreamPageContainer
                    height={height}
                    headerHei={headerHei}
                />}
            />
            <Route
                path={'/stream/:streamId?'}
                exact={true}
                render={params => <StreamContainer
                    {...params}
                />}
            />
        </Main>
    )
}
