import styles from '../styles/components/Profile.module.css';

export function Profile(){
    return (
        <div className ={ styles.profileContainer}>
            <img src = "https://github.com/DevDosSantosLucas.png" alt = "Lucas Ribeiro dos Santos" />
            <div>
                <strong>Lucas Ribeiro dos Santos</strong>
                <p> 
                    <img src = "icons/level.svg" alt ="level" />
                    Level 1
                </p>                
            </div>
        </div>
    )
}