import { useAppSelector } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Box, Customizer } from "@/components";

const Home = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <MainLayout>
      <Box>
        <Customizer />
        <div style={{ display: "flex", justifyContent: "center", width: "40%" }}>
          <iframe
            src={`/${user.username}`}
            style={{ borderRadius: "50px", borderWidth: "5px" }}
          />
        </div>
      </Box>
    </MainLayout>
  );
};

export default Home;
