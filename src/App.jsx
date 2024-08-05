import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import FavPoke from './components/FavPoke'
import ReactLoading from 'react-loading';



function App() {

  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {

    let abortController = new AbortController();


     const loadPoke = async () => {
      try {

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`,{
          signal: abortController.signal
        });

        setPoke(response.data);
        setError("");

      } catch(error){
        setError("Something went wrong", error);

      } finally {
        setLoading(false);

      }
     }

     loadPoke();
    return () => abortController.abort();
  }, [number])

  console.log(poke);
  const prevPoke = () => {
    setNumber((number) => number -1)
  }

  const nextPoke = () => {
    setNumber((number) => number +1)
  }

  const addFav = () =>{
    setFav((oldState) => [...oldState, poke])
  }

  console.log("Yout fav pokemon :",fav)


  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
      <div>
        {loading ?
         <ReactLoading type={'spin'} color={'green'} height={'20%'} width={'20%'} />
        : 
        <>
          <h1>{poke?.name}</h1>
          <button onClick={addFav}>Add to Favourite</button>
          <br />
          <img src={poke?.sprites?.other?.home.front_default} alt={poke?.name} />
          <ul>
            <h3 class="text-left">Types</h3>
            {poke?.types && poke?.types.map((type, idx) => (
              <li key={idx}>{type.type.name}</li>

            ))}
          </ul>
          <ul>
            <h3 class="text-left">Abilities</h3>
            {poke?.abilities && poke?.abilities.map((abil, idx) => (
              <li key={idx}>{abil.ability.name}</li>

            ))}
          </ul>
          <ul>
          <h3 class="text-left">Status</h3>
            {poke?.stats && poke?.stats.map((status, idx) => (
              <li key={idx}>{status.stat.name}                          {status.base_stat}</li>
              
            ))}
          </ul>
          <button onClick={prevPoke}>Previous</button>
          <button onClick={nextPoke}>Next</button>
        </>
      }
      </div>
      <div>
        <h2>Your Favourite pokemon</h2>
        {fav.length > 0 ? <FavPoke fav={fav} /> : <div className='flex h-full justify-center items-center'><p>No Favourite Pokemon...</p></div>}
      </div>
    </div>
    </div>
  )
}

export default App
