import { useAppSelector } from '@/hooks';

const useUser = () => {
  const user = useAppSelector((state) => state.user);

  return {user}
}

export default useUser