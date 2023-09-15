import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendUrl } from '../../apis/api'
import { DataState } from '../../context/ContextProvider'
import {ImSpinner9} from 'react-icons/im'

const InputForm = () => {
    const [inputUrl, setInputUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [isValidUrl, setIsValidUrl] = useState(false)
    const [message, setMessage] = useState('')

    const { setRequestUrl, setTaskId} = DataState()
    const navigate = useNavigate()

    const handleinputChange = (e) => {
      setInputUrl(e.target.value)

    // Regular expression to validate URLs
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const isValidUrl = urlPattern.test(e.target.value);

    setIsValidUrl(isValidUrl);
    }

    const handleSubmit = async() => {
        if (isValidUrl){
          try {
            setLoading(true)
            const res = await sendUrl(inputUrl);
            const task_id = await res.id
            setTaskId(task_id)
            setRequestUrl(inputUrl)
            setLoading(false)
            setMessage('')
  
  
            // Redirect to another page when url successfully saved 
            setTimeout(() => {
              navigate('/report')
            }, 1000)
  
          } catch (error) {
            // console.log(error)
            setLoading(false)
          }
        }else{
          setMessage('Please enter a valid url')
        }
    }
  return (
    <form method='POST'  className='form__input-url'>
        <input 
            type="text"
            value={inputUrl}
            onChange={handleinputChange} 
            name="url" 
            id="url" 
            placeholder='Website URL'
        />
        {message && <p style={{color: 'red', fontSize: '13px'}}>{message}</p>}
        <button 
          type='button' 
          onClick={handleSubmit} 
          style={{cursor: loading ? 'no-drop' : 'default'}}
          disabled={loading ? true : false}
        >
          Get a free SEO Audit Report 
          {loading ? <ImSpinner9/> : ''}
        </button>
    </form>
  )
}

export default InputForm