import {Box} from '@mui/material'
import type {ReactNode} from 'react'

interface BookGridProps {
    children: ReactNode
}

export default function BookGrid({children}: BookGridProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 2,
            }}
        >
            {children}
        </Box>
    )
}