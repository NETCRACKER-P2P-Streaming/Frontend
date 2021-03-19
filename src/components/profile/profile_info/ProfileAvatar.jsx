import React from 'react'
import { Box, Image} from 'grommet'

export default function ProfileAvatar({ userAvatar, userData }) {
    return (
        <Box pad="small" width="medium">
            <Image src={userAvatar} />
        </Box>
    )
}