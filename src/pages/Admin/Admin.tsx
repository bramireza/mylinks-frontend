import { MainLayout } from "@/layouts";
import { Card, Customizer } from "@/components";
import { useUser } from "@/hooks";

const Admin = () => {
  const { user } = useUser();
  return (
    <MainLayout>
      <Card>
        <Customizer />
        <div style={{ display: "flex", justifyContent: "center", width: "40%" }}>
          <iframe
            src={`/${user.username}`}
            style={{ borderRadius: "50px", borderWidth: "5px" }}
          />
        </div>
      </Card>
    </MainLayout>
  );
};

export default Admin;
