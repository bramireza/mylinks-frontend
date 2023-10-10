import { useAppSelector } from "../../hooks";
import { MainLayout } from "../../layouts";
import { Box } from "@mui/material";
import Customizer from "../../components/Customizer";

const Home = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <MainLayout>
      <Box sx={{ display: "flex", padding: "60px",minHeight: "100vh"}}>
        <Customizer />
        <Box sx={{ display: "flex", justifyContent: "center", width: "40%" }}>
          <iframe
            src={`/${user.username}`}
            style={{ borderRadius: "50px", borderWidth: "5px" }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Home;
