import React from 'react'
import { Box, Image, FileInput, Button } from 'grommet'
import userPhoto from './avatar_img.png'
import { Trash } from 'grommet-icons'

export default function ProfileAvatar({ userAvatar, deletePhoto, 
                                        uploadPhoto, setAvatarImage }) {
    const onUploadPhoto = (e) => {
        if (e.target.files.length) {
            uploadPhoto(e.target.files[0])
        }
    }
    const deleteThePhoto = (e) => {
          deletePhoto().then(
            () => {
                setAvatarImage('')
            }
        )
    }
    return (
        <Box width="medium">
            {userAvatar ?
                <Image
                    key={Date.now()}
                    fit="cover"
                    src={`${userAvatar}?${new Date().getTime()}`}
                /> : 
                <Image
                    key={Date.now()}
                    fit="contain"
                    src={userPhoto}
                />}
            <Box
                justify={'start'}
                direction={'row'}
                margin={{'top':'xsmall'}}
            >
                <FileInput onChange={onUploadPhoto} />
                <Button
                    margin={{'left':'medium'}}
                    icon={<Trash />}
                    size={'small'}
                    plain={'true'}
                    onClick={deleteThePhoto}>
                </Button>
            </Box>
        </Box>
    )
}