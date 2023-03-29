import { Toolbar } from 'components/toolbar';
import styles from '../styles/EOM.module.css';

export default function EOM({ employee }) {
    console.log(employee);
 return(
    <div className="page-container">
      <Toolbar/>
     <div className={styles.main}>
      <h1>Employee Of The Month</h1> 

      <div className={styles.employeeOfTheMonth}>
       <h3>Howard Harrison</h3>
       <h4>Software Engineer</h4>
       <img src='https://avatars.githubusercontent.com/u/104686360?v=4' />
       <p>I'm interested in programming and love to build amazing projects</p>
      </div> 
     </div>
    </div>
 )
};

export const getServerSideProps = async pageContext => {
    const apiRespone = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth');
    const employee = await apiRespone.json();
    return {
     props: {
        employee
     }
    }
}