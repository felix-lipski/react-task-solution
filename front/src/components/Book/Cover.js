import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCover }     from "../../redux/reducer";

const Cover = ({url, id}) => {
  const cover = useSelector(state => state.covers[id])
  const dispatch = useDispatch()
  const [outside, setOutside] = useState('')

  useEffect(() => {
    !cover && dispatch(getCover(id))
    setOutside(cover)
  }, [cover])

  return (
    <img src={outside} style={{"width": "100px", "padding": "20px"}}/>
  )
}

export default Cover
