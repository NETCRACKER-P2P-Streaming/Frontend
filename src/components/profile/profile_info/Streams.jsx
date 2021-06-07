import React, { useState, useEffect } from 'react'
import { Box, Button, Form, FormField, TextInput } from 'grommet'

function Streams  (props)  {
    
    return (
        <Tabs>
        <Tab title="tab 1">
          <Box pad="medium">One</Box>
        </Tab>
        <Tab title="tab 2">
          <Box pad="medium">Two</Box>
        </Tab>
      </Tabs>
    )
}

export default Streams
