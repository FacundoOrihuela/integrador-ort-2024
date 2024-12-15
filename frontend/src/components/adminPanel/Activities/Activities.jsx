import React from 'react'
import ActivitiesList from './ActivitiesList'
import Header from '../../Header'
import CreateActivity from './CreateActivity'

const Activities = () => {
  return (
    <div>
        <ActivitiesList />
        <CreateActivity />
    </div>
  )
}

export default Activities