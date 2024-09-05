import React from 'react';
import Link from '@mui/material/Link';

 const LinkItem = (props) => {
    return (
        <>
            <Link href={props.href} className={` link-text ${props.className}` }>{props.linktext}</Link>
        </>
    )
}

export default LinkItem;