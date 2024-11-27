import { useNavigate } from "react-router-dom";

export const useNavigation = ({ _path }) => {
  const navigate = useNavigate();

  const directToAuthPage = () => {
    navigate(_path);
  };

  return { directToAuthPage };
};
