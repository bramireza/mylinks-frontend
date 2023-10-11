import { useAppSelector } from '.';

const useUser = () => {
  const user = useAppSelector((state) => state.user);

  return {user}
}

export default useUser