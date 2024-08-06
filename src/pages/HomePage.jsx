import React from 'react'
import Feed from '../components/Feed'
import CreatePost from '../components/CreatePost'
import Filter from '../components/Filter'

const HomePage = () => {
    return (
        <>
            <CreatePost />
            <Filter />
            <Feed />
        </>
    )
}

export default HomePage
