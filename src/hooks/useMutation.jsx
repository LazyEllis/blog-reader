import { useState } from "react";

export const useMutation = ({ mutationFn, onSuccess }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mutationFn(...args);
      onSuccess(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, error, isLoading };
};
