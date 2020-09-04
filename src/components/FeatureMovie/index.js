import React from 'react';
import './style.css';

export default ({item}) => {
  let firstDate = new Date(item.first_air_date);

  let genres = [];

  for(let i in item.genres){
    genres.push(item.genres[i].name);
  }
  
  let titulo = item.original_name;

  if(titulo === 'Law & Order: Special Victims Unit'){
    titulo = titulo.substring(0,11);
  }
  
  let description = item.overview;

  if(description.length > 200){
    description = description.substring(0,200) + ' ...';
  }

  return ( 
    <section className="featured" style={{
      backgroundSize:'cover',
      backgroundPosition: 'center',
      backgroundImage:`url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{titulo}</div>
            <div className="featured--info">
                <div className="featured--points">{item.vote_average} pts</div>
                <div className="featured--year">{firstDate.getFullYear()}</div>
                <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's':''}</div>
            </div>
            <div className="featured--description">{description}</div>
            <div className="featured--buttons">
                
                <a key="0" href={`/watch/${item.id}`} className="featured--wbutton"> ► Assistir</a>
                <a href={`/list/add/${item.id}`} className="featured--mylistButton">+ Minha Lista</a>
            </div>
            <div className="featured--genres">
              <span><strong>Gêneros:</strong> {genres.join(' , ')}</span>
            </div>
        </div>

      </div>
    </section>
  )
}