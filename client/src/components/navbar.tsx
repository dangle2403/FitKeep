import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate("/signin"); 
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      navigate("/signin");
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Log out</Button>
    </div>
  );
};

export default Navbar;
