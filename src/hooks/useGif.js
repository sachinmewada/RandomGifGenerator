import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

const useGif = (tag) => {
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (tagQuery) => {
    setLoading(true);
    setError(null);
    try {
      const fetchUrl = tagQuery ? `${url}&tag=${tagQuery}` : url;
      const { data } = await axios.get(fetchUrl);
      const imageSource = data?.data?.images?.downsized_large?.url;
      
      if (imageSource) {
        setGif(imageSource);
      } else {
        setError("No GIF found. Try another search tag!");
      }
    } catch (err) {
      console.error("Error fetching GIF from GIPHY:", err);
      setError("Failed to fetch GIF. Please check your API key or network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(tag);
  }, []);

  return { gif, loading, error, fetchData };
};

export default useGif;
