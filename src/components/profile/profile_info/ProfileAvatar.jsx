import React from 'react'
import { Box, Image, FileInput, Button} from 'grommet'
import userPhoto from './avatar_img.png'

export default function ProfileAvatar({ userAvatar, deletePhoto,uploadPhoto,setAvatarImage}) {
    const onUploadPhoto = (e) => {
        if (e.target.files.length) {
            uploadPhoto(e.target.files[0])
        }
    }
    const deleteThePhoto = (e) => {
        deletePhoto().then(  () => { window.location.reload()})
    }
    return (
        <Box pad="small" width="medium">
           <Image 
                fit="contain"
                src={userAvatar || userPhoto}
            />
            <FileInput onChange={onUploadPhoto}/>
         <Button label="Delete photo" onClick={deleteThePhoto }></Button>
         <Button label="Upload photo" onClick={     ()=>{    window.location.reload()}
}></Button>


        </Box>
    )
}