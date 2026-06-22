import { Link } from "react-router-dom";
import "./LearnMore.css"

export default function LearnMore() {
  return (
    <div className="learn-more-page">
      <h1>Learn More</h1>
      <br />
      <div className="learn-more-buttons">
        <Link to="/App_Info">App Info</Link><br />
        <Link to="/Privacy_Policy">Privacy Policy</Link><br />
        <Link to="/FAQ">FAQ</Link><br />
        <Link to="/About">About</Link>
      </div>
    </div>
  );
}
