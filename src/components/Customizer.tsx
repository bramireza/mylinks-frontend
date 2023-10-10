import {
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useAppSelector } from "../hooks";

const Customizer = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Card
      sx={{
        zIndex: 1,
        boxShadow: "none",
        borderRadius: 5,
        width: "60%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}
        >
          
        </Box>
      </CardContent>
    </Card>
  );
};

export default Customizer;
