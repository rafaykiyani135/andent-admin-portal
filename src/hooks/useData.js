import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

function useData() {
  return useContext(DataContext);
}

export default useData;
