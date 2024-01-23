import { useMutation, useQueryClient } from "react-query";
import * as api from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const handleClick = () => {
    mutation.mutate();
  };
  const mutation = useMutation(api.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out successful", type: "SUCCESS" });
    },
    onError(error: Error) {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  return (
    <button
      className="text-blue-600 px-3 bg-white font-bold hover:bg-grey-100"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
