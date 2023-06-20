import React, { useEffect } from 'react'

const useCustomhooksfortitle = (count) => {
    useEffect(() => {
        console.log('I am first one Outside');
        if (count >= 1) {
            document.title = `Chats (${count})`
        } else {
            document.title = `Chats `
        }
    }, [count]);
}

export default useCustomhooksfortitle;