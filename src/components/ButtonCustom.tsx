import { Button, ButtonProps } from "@mui/material";
import { styled } from '@mui/material/styles';
interface Props extends ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
}
const CustomButton = styled(Button)({
  textTransform: "capitalize",
  color: "white",
  marginTop: 20,
  marginBottom: 20,
  minWidth: "250px"
})
const ButtonCustom = ({ children, ...props }: Props) => {
  return (
    <>
      <CustomButton
        variant="contained"
        type="submit"
        {...props}
      >
        {children}
      </CustomButton>
    </>
  );
};

export default ButtonCustom;
