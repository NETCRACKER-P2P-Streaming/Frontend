import React from 'react'
import { Box, Image, FileInput} from 'grommet'
import userPhoto from './avatar_img.png'

export default function ProfileAvatar({ userAvatar, isOwner ,changePhoto,
                                        deletePhoto,uploadPhoto }) {
    const onChangePhoto = (e) => {
        if (e.target.files.length) {
            changePhoto(e.target.files[0])
        }
    }
    const onUploadPhoto = (e) => {
        if (e.target.files.length) {
            uploadPhoto(e.target.files[0])
        }
    }
    const onDeletePhoto = (e) => {
        deletePhoto()
    }
    return (
        <Box pad="small" width="medium">
            {
            userAvatar
                ? 
            <><Image    
                fit="contain"
                src={userAvatar} 
            />
            <FileInput onChange={onChangePhoto}/></>
         :<><b>You have no photo</b>
         <FileInput onChange={onUploadPhoto}/></>}
        </Box>
    )
}