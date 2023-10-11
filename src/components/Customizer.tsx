import { Box } from ".";
import { useAppSelector } from "@/hooks";

const Customizer = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Box>{user && 'sdssdsd'}</Box>
  );
};

export default Customizer;
