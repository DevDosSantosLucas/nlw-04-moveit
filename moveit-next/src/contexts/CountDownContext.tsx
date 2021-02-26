import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {ChallengesContext} from './ChallengesContext'


interface CountDownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive:boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}
interface CountDownProviderProps{
    children: ReactNode
}
export const CountDownContext = createContext({} as CountDownContextData)

let countDownTimeout: NodeJS.Timeout;
export function CountDownProvider({children}:CountDownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time,setTime] = useState(0.1 * 60) /* 25 minutos X 60*/
    const [isActive,setIsActive] = useState(false)
    const [hasFinished,setHasFinished] = useState(false)
    const minutes = Math.floor(time / 60) ;
    const seconds = time % 60 ;

    function startCountDown(){
        setIsActive(true);
    }
    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setIsActive(false)
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    useEffect(()=>{
        if(isActive && time > 0 ){
            setTimeout(()=>{
                setTime(time - 1);
            },1000);
        }else if(isActive && time === 0) {
            // console.log("finalizou")
            setHasFinished(true);
            setIsActive(false)
            startNewChallenge()
        }
    },[isActive,time])

    return (
        <CountDownContext.Provider value = {{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
        }}>
            {children}
        </CountDownContext.Provider>
    )
}