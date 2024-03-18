import React, { useEffect, useState } from 'react';

const Offerwatch = () => {
  const [time, setTime] = useState({ days: 29, hours: 23, min: 59, sec: 60 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        let { days, hours, min, sec } = prevTime;

        sec -= 1;
        if (sec === 0) {
          min -= 1;
          sec = 59;
        }
        if (min === 0) {
          hours -= 1;
          min = 59;
        }
        if (hours === 0) {
          days -= 1;
          hours = 23;
        }

        return { days, hours, min, sec };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=''>
        <div className='poppins flex gap-4 my-3'>
            <div>
                <p className='w-[45px] h-[45px] mb-0 bg-white text-center rounded-full items-center flex justify-center '>{time.days} </p>
                <p className='text-slate-500 ms-1 w-fit'>Days</p>
            </div>
            <div>
                <p className='w-[45px] h-[45px] mb-0 bg-white text-center rounded-full items-center flex justify-center '>{time.hours} </p>
                <p className='text-slate-500 ms-1  w-fit'>Hrs</p>
            </div>
            <div>
                <p className='w-[45px] h-[45px] mb-0 bg-white text-center rounded-full items-center flex justify-center '>{time.min} </p>
                <p className='text-slate-500  ms-1 w-fit'>Min</p>
            </div>
            <div>
                <p className='w-[45px] h-[45px] mb-0 bg-white text-center rounded-full items-center flex justify-center '>{time.sec} </p>
                <p className='text-slate-500 ms-1  w-fit'>Secs</p>
            </div>

        </div> 
    </div>
  );
};

export default Offerwatch;
