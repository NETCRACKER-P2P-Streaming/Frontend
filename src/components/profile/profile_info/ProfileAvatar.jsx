import React from 'react'
import { Box, Heading, Avatar } from 'grommet'

export default function ProfileAvatar({ userAvatar, userData }) {
    return (
        <Box pad="small">
            <img src={userAvatar} />
        </Box>
    )
}