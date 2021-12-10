import React, {ReactElement} from 'react'
import ResponsiveAppBar from '../../components/app-bar/AppBar'

const Main: React.FC = (): ReactElement => {
    return (
        <>
            <ResponsiveAppBar />
            <h2>Welcome!</h2>
        </>
    )
}

export default Main
