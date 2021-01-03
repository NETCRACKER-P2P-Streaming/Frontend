import React from 'react'
import {Box, Heading} from 'grommet'
import SignActions from './sign_btns/SignActions'


export default function Header(props) {
    const elementsProps = {
        headerWrapperStyle: {
            tag: 'header',
            direction: 'row',
            justify: 'between',
            pad: 'medium',
            background: 'brand',
            elevation: 'medium'
        },
        headingStyle: {
            level: 1,
            alignSelf: 'center'
        }
    }

    return (
        <Box {...elementsProps.headerWrapperStyle}>
            <Heading {...elementsProps.headingStyle}>
                P2P&nbsp;SERVICE
            </Heading>
            <SignActions/>
        </Box>
    )
}
