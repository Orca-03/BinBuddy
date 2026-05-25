import { useNavigate } from "react-router-dom";
import CameraToolBar from "../Components/CameraToolBar";
export default function Home({ setScanState }) {
  return (
    <div>
      <CameraToolBar setScanState={setScanState} />
      <p></p>
    </div>
  );
}