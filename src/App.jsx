import { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsloading] = useState(true);
  const [tours, setTours] = useState([]);

  /**Basicamente dice: buscame si tu id es diferente al del argumento (no el que buscamos) ponmelo en new tours */
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  const fetchTours = async () => {
    setIsloading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setIsloading(false);

      console.log(tours);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />;
      </main>
    );
  }
  //  TODO
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button
            type="button"
            style={{ marginTop: '2rem' }}
            className="btn"
            onClick={() => {
              fetchTours();
            }}
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
      <footer style={{ textAlign: 'center' }}>
        <a href="https://dudufcb.netlify.app/" target="">
          Trabajo realizado por Luis González | Volver Al Portafolio
        </a>
      </footer>
    </main>
  );
};
export default App;
