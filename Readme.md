import {db} from './Firebase-config'
import { collection,getDocs,addDoc,updateDoc,deleteDoc,doc } from 'firebase/firestore'


//read
useEffect( () => {
   const getData = () => {
         getDocs(usersCollectionRef)
         .then( resp => resp)
         .then( result => {
          let userData = result.docs.map( (doc) => ({...doc.data(),id:doc.id}) )
          setUsers([...userData]);    
         })
         .catch( err => console.log(err) );
   }
   getData();     
},[users] )
//create
const createData = () => {
      addDoc(usersCollectionRef,{name:newName,email:newEmail}) 
}
//update
const updateData = (id,name,email) => {
      const userDoc = doc(db, 'users',id)
      const updateName = {name:name + '_update'}
      updateDoc(userDoc,updateName)
}
//delete
const deleteData = (id) => {
      const userDoc = doc(db, 'users',id)
      deleteDoc(userDoc);
}