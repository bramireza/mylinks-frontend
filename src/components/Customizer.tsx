import { Card } from ".";
import { useAppSelector } from "@/hooks";

const Customizer = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Card>{user && 'sdssdsd'}</Card>
  );
};

export default Customizer;
