import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { getFeed } from "../redux/feedSlice";
import { useDispatch } from "react-redux";

export default function useFeedData(autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchFeed = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
        signal,
      });
      setData(res.data);
      dispatch(getFeed(res?.data?.feedUsers));
      return res.data;
    } catch (err) {
      if (axios.isCancel?.(err)) {
        return;
      }
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoFetch) return;
    const controller = new AbortController();
    fetchFeed(controller.signal).catch(() => {});
    return () => controller.abort();
  }, [autoFetch, fetchFeed]);

  const reload = useCallback(() => {
    const controller = new AbortController();
    fetchFeed(controller.signal).catch(() => {});
    return () => controller.abort();
  }, [fetchFeed]);

  return { data, loading, error, reload };
}
