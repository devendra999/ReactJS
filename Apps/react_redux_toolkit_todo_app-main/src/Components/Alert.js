import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideAlert } from '../slices/alertSlice'

const Alert = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alerts)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideAlert())
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [alert])

  return <div className={`alert alert-${alert.type}`}>{alert.title}</div>
}

export default Alert
