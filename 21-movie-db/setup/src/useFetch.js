import { useState, useEffect } from "react";
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState([]);

  const fetchdata = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setData(data.Search || data);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error });
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchdata(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return { isLoading, error, data };
};

export default useFetch;
