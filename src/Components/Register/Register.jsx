import axios from 'axios';
import Joi, { allow, string } from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Register() 
{

  let [user,setUser] = useState({
    name : '',
    email :'',
    phone :'',
    password : '',
    rePassword:'',
  })

  let [errorResponse,seterrorResponse] = useState('');
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();
  let [errorList,setErrorList] = useState([]);

  function addUser(e)
  {
    let myUser = {...user};
    myUser[ e.target.name ] = e.target.value;
    setUser(myUser);
    // console.log(myUser)
  }

  async function userData(e)
  {
    e.preventDefault();
    setLoading(true);

    let valid = validData();
    console.log(valid);
    if(valid.error != null)
    {
     console.log('3andy mashakel'); 
     setLoading(false);
     setErrorList(valid.error.details)
    }
    else
    {
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',user);
      setLoading(false);
      // console.log(data.message);
  
      if(data.message == 'success'){
        localStorage.setItem('moviesUserToken', data.token);
        navigate('/login');
        // console.log(data);
        console.log('yaaaa')
      }
      else
      {
        // console.log(data);
        seterrorResponse(data.message);
      }
    }
    
  }

  function validData()
  {
    let schema = Joi.object(
      {
        name:Joi.string().min(3).max(10),
        phone:Joi.string().required(),
        email : Joi.string().required().email( { tlds: {allow:['com','net']} } ) ,
        password : Joi.string().required().pattern( new RegExp(/^[a-z]{3,10}[0-9]/) ),
        rePassword: Joi.string().required()
      }
    )
    return schema.validate(user, {abortEarly : false} );
  }

  return <>

    <h2 className='text-center text-info'>Regestration Form</h2>
  
    <form onSubmit={userData}>

      {/* {errorList.length > 0 ? errorList.map((el) => <div className='text-danger'>{el.path[0] == 'password' ? 'enter vaild pass' : el.message}</div>) : ""} */}

      <div className='my-3'>
        <label htmlFor="name">Name :</label>
        <input onChange={addUser} className='form-control mt-3' name='name' id='name' type="text" />

        {/* {errorList.length > 0 ? errorList.map( (error,index) => 
        <div key={index} className='alert alert-danger w-75 my-2'>
          {error.path[0] == 'first_name' ? error.message : '' } 
        </div> ) : ''
        } */}

      </div>

      <div className='my-3'>
        <label htmlFor="email">Email :</label>
        <input onChange={addUser} className='form-control mt-3' name='email' id='email' type="email" />
        {errorResponse == '' ? '' : <div className="alert alert-danger w-75 my-3">{errorResponse}</div> }

        {/* {errorList.length > 0 ? errorList.map( (error,index) => 
        <div key={index} className='alert alert-danger w-75 my-2'>
          {error.path[3] == 'email' ? error.message : '' } 
        </div> ) : ''
        } */}

      </div>

      <div className='my-3'>
  <label htmlFor="last_name">Phone :</label>
  <input onChange={addUser} className='form-control mt-3' name='phone' id='phone' type="tel" />

  {/* {errorList.length > 0 ? errorList.map( (error,index) => 
  <div key={index} className='alert alert-danger w-75 my-2'>
    {error.path[1] == 'last_name' ? error.message : '' } 
  </div> ) : ''
  } */}

      </div>

      <div className='my-3'>
        <label htmlFor="password">Password :</label>
        <input onChange={addUser} className='form-control mt-3' name='password' id='password' type="password" />
        {errorResponse == '' ? '' : <div className="alert alert-danger w-75 my-3">{errorResponse}</div> }
        
        {/* {errorList.length > 0 ? errorList.map( (error,index) => 
        <div key={index} className='alert alert-danger w-75 my-2'>
          {error.path[4] == 'password' ? error.message : '' } 
        </div> ) : ''
        } */}

      </div>

      <div className='my-3'>
        <label htmlFor="rePassword">Re-password :</label>
        <input onChange={addUser} className='form-control mt-3' name='rePassword' id='rePassword' type="password" />
        {errorResponse == '' ? '' : <div className="alert alert-danger w-75 my-3">{errorResponse}</div> }
        
        {/* {errorList.length > 0 ? errorList.map( (error,index) => 
        <div key={index} className='alert alert-danger w-75 my-2'>
          {error.path[4] == 'password' ? error.message : '' } 
        </div> ) : ''
        } */}

      </div>

      {errorList.length > 0 ? errorList.map( (error,index) => <div key={index} className='alert alert-danger w-75 py-2 my-4'>{error.message}</div> ) : ''}

      {loading ?  

        <button className='btn btn-info btn-md my-2' type='submit'> 
          <i className='fa-solid fa-spinner fa-spin'></i> 
        </button> 
        :
        <button className='btn btn-info btn-md my-2' type='submit'>Create Account</button> 
      }
      
    </form>
  
  
  </>
}

