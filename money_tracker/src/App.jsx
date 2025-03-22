
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [name,setName]=useState("")
  const [datetime,setDateTime]=useState("")
  const [description,setDescription]=useState("")
  const [transactions,setTransactions] = useState([])
  const [balance,setBalance]= useState(0)

  const getTransactions = async ()=>{
    const url= import.meta.env.VITE_API_URL + "/transactions"
    const response = await fetch(url)
    return await response.json()
    
}

useEffect(()=>{
  getTransactions().then(transactions=>{setTransactions(transactions)})
},[])




  const price = name.split(" ")[0]
  
  
    const addNewTransaction = ()=>{
      
    const url= import.meta.env.VITE_API_URL + "/transaction"
    
    fetch(url,{
      method : 'POST',
      headers : {'Content-type':'application/json'},
      body: JSON.stringify({name: name.substring(price.length+1),price,description,datetime})
    }).then(res =>{
      
      setName("")
      setDescription("")
      setDateTime("")
      res.json().then(json =>{
        console.log("result : ", json);
        
      })
    }).catch(err => {
      console.error("fetching error : ", err.message);
      
    });
  }
  
  let bal=0;
  useEffect(()=>{

    for(const transaction of transactions)
      {
        bal= bal+ transaction.price
      }
      
      setBalance(bal)
      console.log(bal); 
    },[transactions])

    const handleclear= ()=>{
      const url= import.meta.env.VITE_API_URL + "/deletetransactions"
      fetch(url,{
        method : 'POST',
      headers : {'Content-type':'application/json'},
      body: JSON.stringify({})
      }).then(res=> res.json().then(json =>{
        console.log(json.message)
        window.location.reload()
      } 
    ))
    }
 

  return (
    <>
    <main>


     <h1>rs {balance}<span>.00</span> </h1>

     <button className='clear' onClick={handleclear}>clear all</button>

     <form onSubmit={addNewTransaction}>
        <div className='basic'>

        <input type="text"
         value={name} 
         onChange={ev => setName(ev.target.value)} 
         placeholder={'+200 samsung TV'}/>

        <input 
        type="datetime-local"
        value={datetime}
        onChange={e => setDateTime(e.target.value)} />
        </div>
        <div className='description'>

        <input type="text"
        value={description}
        onChange={e =>setDescription(e.target.value)}
        placeholder={'description'} />
        </div>

        <button type='submit'> add new transaction</button>
     </form>

     {transactions.length>0 && transactions.map(transaction =>(
      <div key={transaction._id}>
     <div className="transactions">
      <div className="transaction">
        <div className="left">
          <div className="name">{transaction.name}</div>
          <div className="description">{transaction.description}</div>
        </div>
        <div className="right">
          <div className={"price"+ (transaction.price<0?' red':' green')}>{transaction.price}</div>
          <div className="datetime">{transaction.datetime}</div>
        </div>
      </div>
      
      </div>
     </div>
     ))}

    </main>
    </>
  )
}

export default App
