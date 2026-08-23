import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Quote } from '../types';

const defaultQuote: Quote = {
  text: 'Simplicity is prerequisite for reliability.',
  author: 'Edsger W. Dijkstra',
  category: 'Software Engineering',
};

interface UseQuoteResult {
  quote: Quote;
  loading: boolean;
  isRotating: boolean;
  fetchQuote: () => Promise<void>;
}

export const useQuote = (): UseQuoteResult => {
  const [quote, setQuote] = useState<Quote>(defaultQuote);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const fetchQuote = useCallback(async () => {
    // This resolves to "/api/random"
    const apiUrl = import.meta.env.VITE_QUOTES_API_URL;
    if (!apiUrl) return;

    setLoading(true);
    setIsRotating(true);
    try {
      // Axios requests http://localhost:3000/api/random, bypassing CORS
      const response = await axios.get(apiUrl, {
        headers: { Accept: 'application/json' },
        timeout: 5000,
      });
      if (response.data && response.data.text) {
        setQuote(response.data);
      }
    } catch (err) {
      console.warn('Could not fetch quote, maintaining active quote:', err);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRotating(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return { quote, loading, isRotating, fetchQuote };
};

export default useQuote;
