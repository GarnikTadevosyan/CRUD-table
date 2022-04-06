import './Realservercrud.css';
import { useEffect, useState } from 'react';
import {db} from './Firebase-config';
import { collection,getDocs,addDoc,updateDoc,deleteDoc,doc } from 'firebase/firestore'

function Realservercrud() {
const usersCollectionRef = collection(db,'users');

const initialValues = {id:'',name:'',email:''}
const [userData,setUserData] = useState(initialValues)
const [users,setUsers] = useState([])
const [editableData,setEditableData] = useState(
       {isEdit:false,userIndex:null}
)
const [nameValid,setNameValid] = useState('');
const [emailValid,setEmailValid] = useState('');
const [nameClass,setNameClass] = useState('');
const [emailClass,setEmailClass] = useState('');

const isFieldsFields = userData.name && userData.email;
const nameDetector = users.find( (user) => user.name == userData.name);
const emailDetector = users.find( (user) => user.email == userData.email)
let regName =  new RegExp(/^\w[A-Z a-z ]{8,20}$/g);
let regEmail = new RegExp(/^\w[A-Za-z0-9._]+@[a-z]+\.[a-z]{2,3}$/g); 

let userNumber = 1;
let name = userData.name
let email = userData.email

useEffect( () => { 
setTimeout(() => {
getDocs(usersCollectionRef)
.then(response => response)
.then(result => {
      let getedUsers = result.docs.map( (doc) => ({...doc.data(),id:doc.id}) ) 
      setUsers(getedUsers)
} )
.catch( err => console.log(err.message))
},2000);
},[users] )
const deleteRequest = (id) => {
      const userDoc = doc(db, 'users',id)
      deleteDoc(userDoc);
}
const postRequest = () => {
      addDoc(usersCollectionRef,{name:userData.name,email:userData.email})
}
const putRequest = (id) => {
      const userDoc = doc(db, 'users',id)
      const updateUser = {name:userData.name,email:userData.email}
      updateDoc(userDoc,updateUser)
}
const createData = () => {
      if(isFieldsFields) {
      if(!editableData.isEdit){
      postRequest();
      };
      if(editableData.isEdit) {
      putRequest(userData.id);
      }else{
      setUsers( (prev) => [...prev,userData] )
      setUserData(initialValues)
      }
    }
    cleaner();
}
const editData = (data) => {
      setUserData(data)
      console.log('userData',userData);
      console.log('editting data',data);
      setEditableData({
        isEdit:true,
        userIndex:data.id
      })
      detect = data.id
}
let detect = null
const deleteData = (id) => {
      detect = id
      deleteRequest(id);
      if (detect === editableData.userIndex) {
            setEditableData({
                  isEdit:false,
                  userIndex:null
            })
            setUserData(initialValues);
            cleaner();
      }
}
const cleaner = () => {
      setUserData(initialValues)
      setEditableData({isEdit:false,userIndex:null})
      setEmailValid('');
      setNameValid('');
      setNameClass('');
      setEmailClass('');
}
const handlerSubmit = (e) => {
      e.preventDefault()
}
const changeName = (e) => {
      let value = e.target.value
      setUserData( (prev) => ({...prev,name:value}) )
      if(value.match(regName) !== null) {
            setNameValid(true)
            setNameClass('valid')
      }else{
            setNameValid('');
            setNameClass('not_valid')
      }
}
const changeEmail = (e) => {
      let value = e.target.value
      setUserData( (prev) => ({...prev,email:value}) )
      if(value.match(regEmail) !== null) {
             setEmailValid(true)
             setEmailClass('valid')
      }else{setEmailValid(''); setEmailClass('not_valid')}
     
}
return (
<div className='wrapper'>
        <h1>CRUD TABLE</h1>
        <div className='wrapper_content'>                 
        <div className='table_container'>
        <table>
{/* --------------------------------thead--------------------------------------- */}            
        <thead>
        <tr>
        <td>№</td> 
        <td>Name</td>
        <td>Email</td>
        <td>{users.length === 0 ? 'GET...' : 'Actions'}</td>
        </tr>
        </thead>
{/* --------------------------------tbody--------------------------------------- */}            
        <tbody>
        {users.map( (user) => {
        return(
               <tr  key={userNumber++}>
                    <td>{userNumber}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                    <div    className='buttons_container'>
                    <button id='put'
                            onClick={() => editData(user)}>
                            edit
                    </button>
                    <button 
                            id='delete'
                            onClick={ () => deleteData(user.id)}>
                            delete/DELETE
                    </button>
                    </div>
                    </td>
                    </tr>)
                 })}
          </tbody>
          </table>
</div> 
{/* --------------------------------form--------------------------------------- */} 
<div className='form_container'>            
          <form   onSubmit={handlerSubmit} onReset={cleaner}>
          <div    className='input_container'>
          <label>Name</label>
          <br/>
          <input  
                  type="text"
                  placeholder='write your name'
                  value={userData.name}
                  onChange={(e) => changeName(e)}
                  className={nameClass}
                  required
                  />
                  <p className={nameValid ? 'valid_message'
                  :'not_valid_message'}>
                  {nameValid ? 'A-Z a-z 8-20 symbols' : 'A-Z a-z 8-20 symbols'}
                  </p>
                  <p className='detector'>{nameDetector ? 'this name include in table': ''}</p>
            <br/>
            <label>Email</label>
            <br/>
            <input 
                  type='email'
                  placeholder='write your email'
                  value={userData.email}
                  onChange={(e) => changeEmail(e)}
                  className={emailClass}
                  required
                  />
                  <p className={emailValid ? 'valid_message'
                  :'not_valid_message'}>
                  {emailValid ? 'A-Za-z0-9._@a-z.a-z(2-3)' : 
                  'A-Za-z0-9._@a-z.a-z(2-3)'}
                  </p>
                  <p className='detector'>{emailDetector ? 'this email include in table': ''}</p>
           </div>
           <div   className='buttons_container'>
           <button 
                  id='reset'
                  type='reset'>
                  Clean/RESET
            </button>
           <button 
                  className={editableData.isEdit ? 'put': 'post'}
                  type='submit'
                  onClick={createData}
                  disabled={!isFieldsFields | !nameValid | !emailValid | nameDetector !== undefined
                  | emailDetector !== undefined}>
                  {editableData.isEdit ? 'Edit/PUT' : 'Add/POST'}
            </button>
            </div>
            </form>
</div> {/* form_container */}
</div> {/* wrapper_content */}
</div>  /* wrapper */);

}
export default Realservercrud;
