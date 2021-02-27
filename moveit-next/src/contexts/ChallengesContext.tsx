import { createContext, useState,ReactNode, useEffect} from 'react';

import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number ;
}
interface ChallengesContextData{
    level: number;
    challengesCompleted:number;
    experienceNextLevel:number;
    currentExperience:number;
    activeChallenge: challenge;
    levelUp: () =>void;
    startNewChallenge:() =>void;
    resetChallenge:() => void;
    completeChallenge:()=>void;
    closeLevelUpModal:() =>void;
}

interface ChallengesProviderProps {
    children: ReactNode; 
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext =createContext({}as ChallengesContextData)

export function ChallengesProvider({
    children,
    ...rest
    }:ChallengesProviderProps){
    const [level,setLevel] = useState(rest.level??1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience??0);
    const [challengesCompleted,setChallengesCompleted] = useState(rest.challengesCompleted??0);
   
    const [activeChallenge,setActiveChallenge] = useState(null)
    
    const experienceNextLevel = Math.pow((level +1)* 4  ,2)
    const [isLevelUpModalOpen,setIsLevelUpModalOpen] = useState(false);

    useEffect(() =>{
       Notification.requestPermission 
    },[])

    useEffect(() =>{
        Cookies.set('level',String(level))
        Cookies.set('currentExperience',String(currentExperience))
        Cookies.set('challengesCompleteds',String(challengesCompleted))


    },[level,currentExperience,challengesCompleted])

    function levelUp(){
        setLevel(level +1);
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)

    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() *  challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission ==='granted'){
            new Notification('Novo deasafio >< ', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount} =activeChallenge;

        let finalExperience = currentExperience +amount ;
        
        if(finalExperience>= experienceNextLevel) {
            finalExperience = finalExperience - experienceNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted +1);
    }   
    return(
        <ChallengesContext.Provider
         value ={
        {level,levelUp,currentExperience,
        challengesCompleted,startNewChallenge,
        activeChallenge,resetChallenge,
        experienceNextLevel,
        completeChallenge,
        closeLevelUpModal
        }
        }>
        
        {children}
        {   isLevelUpModalOpen  &&    <LevelUpModal/> }

        </ChallengesContext.Provider>
    )


}