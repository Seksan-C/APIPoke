import React,{useState} from 'react'
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai'

function LikePoke() {
    const [like,setLike] = useState(false);

    const toggleLike = () =>{
        setLike((check) => !check)
    }

  return (
    <button onClick={toggleLike}>
        {like ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  )
}

export default LikePoke
