import React, {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const ProgressBar = ({percentage, title}) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        // Delay the animation to start after a brief delay (e.g., 500ms)
        const animationTimeout = setTimeout(() => {
        setAnimatedPercentage(percentage ? percentage?.toFixed(0) : 0);
        }, 500);
    
        return () => clearTimeout(animationTimeout);
    }, [percentage]);
          
    return (
    <div>
        <div className='circle-progress'>
            <CircularProgressbar
                value={animatedPercentage}
                text={`${animatedPercentage}%`}
                styles={buildStyles({
                    pathTransitionDuration: 0.5,
                    pathColor: animatedPercentage > 60 ? 'green' : 'yellow'
                })}
            />
            <p style={{textAlign: 'center'}}>{title}</p>
        </div>
    </div>
  )
}

export default ProgressBar