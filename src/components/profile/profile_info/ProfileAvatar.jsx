import React from 'react'
import { Box, Image, FileInput} from 'grommet'

export default function ProfileAvatar({ userAvatar, isOwner ,savePhoto}) {
    const uploadPhoto = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <Box pad="small" width="medium">
            <Image src={userAvatar} />
             <input type={"file"} onChange={uploadPhoto}/>
         
        </Box>
    )
}