import { useRouter } from "next/router";
import styles from '../src/styles/Toolbar.module.css'

export function Toolbar() {
 const router = useRouter();

 return(
    <div className={styles.main}>
     <div onClick={() => router.push('/')}>Home</div>
     <div onClick={() => router.push('/feed/1')}>Feed</div>
     <div onClick={() => router.push('/eom')}>EOM</div>
     <div onClick={() => window.location.href = 'https://twitter.com/peterpe19719355'}>Twitter</div>
    </div>
 )
}