import React, { useState, useEffect } from 'react'
import { Box, Button, Form, FormField, TextInput } from 'grommet'

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const handleSubmit = (formData) => {
        props.updateStatus(status).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <Box>
            { !editMode &&
                <Box>
                    <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || "-------"}</span>
                </Box>
            }
            {editMode && 
                <Form 
                    onSubmit={handleSubmit}
                    value={status}
                    onChange={(nextValue) => setStatus(nextValue)}
                >
                        <FormField label="Status" name={'status'} >                
                            <TextInput 
                                name={'status'}
                                value={status} 
                            />
                        </FormField>
                        <Button label={'Change status'} primary type="submit" />&nbsp;
                        <Button label='Cancel' color='border' onClick={() => { setEditMode(false) }} />
                </Form>
            }
        </Box>
    )
}

export default ProfileStatus