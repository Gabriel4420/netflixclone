import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () =>{
      // pegando a lista totally

      let list = await Tmdb.getHomeList();

      setMovieList(list);

      // pegando o filme em destaque (featured)
      let originals = list.filter(i => i.slug ==='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      
      setFeatureData(chosenInfo);
    }
    loadAll()
  }, [])

  useEffect(() =>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll',scrollListener)
    }
  }, [])
  return (
    
      <div className="page">
        
        <Header black={blackHeader} />

        {featuredData &&
          <FeatureMovie item={featuredData}/>
        }

        <section className="lists">
          {movieList.map((item,key) =>(
            <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
        </section>

        <footer>
          Development by Gabriel Rodrigues <br/>
          all rights reserved &copy; Netflix <br/>
          api database: tmdb.com
        </footer>

        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
          </div>
        }


      </div>
  );
  
}

export default App;
