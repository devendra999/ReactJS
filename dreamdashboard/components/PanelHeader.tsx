import { Box, Typography } from '@mui/material'
import React from 'react'
import { PanelHeading } from './PanelHeading'
import SwitchButton  from './SwitchButton'

export const PanelHeader = () => {
    return (
        <Box className='panel-header'>
            <Box className='top-bar'>
                <PanelHeading />
                <SwitchButton />
            </Box>
        </Box>
    )
}
