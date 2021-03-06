import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getmovies = async () => {
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false });//{movies(state꺼):movies(axios꺼)}
  };
  async componentDidMount() { //render시 호출됨
    this.getmovies();
  }
  render() {
    const { isLoading, movies } = this.state;//state로부터 isLoading,movies가져옴
    return (<section class="container">
      {isLoading ? (
        <div class="loader">
          <span class="loader__text">Loading..</span>
        </div>
      ) : (
          <div class="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}//list의 child는 unique한 key prop가져야
                id={movie.id} year={movie.year}
                title={movie.title} summary={movie.summary}
                poster={movie.medium_cover_image} />

            ))}</div>
      )}
          </section>
    );
  }
}
export default App;
