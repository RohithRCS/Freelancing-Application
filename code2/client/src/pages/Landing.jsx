import React, { useEffect } from 'react'
import '../styles/landing.css'
import {PiStudent} from 'react-icons/pi'
import {FaHandHoldingWater} from 'react-icons/fa'
import {MdHealthAndSafety} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'

const Landing = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("usertype") === 'freelancer'){
      navigate("/freelancer")
    } else if (localStorage.getItem("usertype") === 'client'){
      navigate("/client")
    } else if (localStorage.getItem("usertype") === 'admin'){
      navigate("/admin")
    }
  })


  return (
    <div className="landing-page">

        <div className="landing-hero">

            <div className='landing-nav'>
              <h3>RPS Works</h3>
            </div>

            <div className="landing-hero-text">

                <h1>Unlock New Possibilities and Unleash Your Full Potential</h1>
                <p>Step into a world of limitless opportunities with RPS Works, where your talent seamlessly connects with the perfect projects. Whether you're a seasoned freelancer or just starting out, our platform offers the tools, support, and network you need to elevate your craft and thrive in a competitive marketplace. With RPS Works, you’re not just taking on freelance jobs you’re embarking on a journey of growth, innovation, and success. Unlock your creative power, collaborate with global businesses, and turn your skills into a rewarding career. Start your freelancing journey today, and let your work speak for itself as you reach new heights of achievement and fulfillment. </p>
                <button onClick={()=> navigate('/authenticate')}>Sign in</button>
            </div>

        </div>

    </div>
  )
}

export default Landing