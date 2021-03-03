import React from 'react'
import { Box} from 'grommet'

export default function ProfileAvatar({ userAvatar, userData }) {
    return (
        <Box pad="small" width="medium">
            <img src={userAvatar} />
        </Box>
    )
}