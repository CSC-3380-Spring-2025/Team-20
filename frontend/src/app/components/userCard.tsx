import React from 'react';
//use the type script DEFAULT Session Type
import { DefaultSession } from 'next-auth';


export default function UserCard({user} : {user:DefaultSession["user"]}) {

    //use automatic typeing within our default name using ? to not assume the name exists
    
  return (
    <div className={styles.card}>
      
      <div className={styles.cardContent}>
        <p>Current Logged In User</p>
        <h2 className={styles.title}>{user?.name}</h2>
        <p className={styles.description}>
          {user?.email}
        </p>
      </div>
      <div className={styles.cardFooter}>
        <button className={styles.button}>Action</button>
      </div>
    </div>
  );
}

const styles = {
  card: 'max-w-sm rounded overflow-hidden shadow-lg bg-white',
  cardContent: 'px-6 py-4',
  title: 'text-xl font-semibold text-gray-800',
  description: 'text-gray-700 text-base',
  cardFooter: 'px-6 py-4',
  button: 'bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700'
};
