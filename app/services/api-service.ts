interface IError extends Error {
  info: string;
  status: number;
}


export const fetcher = async <T>(url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching data') as IError;
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return await response.json() as T;
};
