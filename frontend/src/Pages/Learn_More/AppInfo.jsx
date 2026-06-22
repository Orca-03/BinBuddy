import { useNavigate } from "react-router-dom";

export default function AppInfo({ setShowIntro }){
  const navigate = useNavigate();
  const isIntro = typeof setShowIntro === "function";
  const hasSeenIntro = document.cookie
    .split("; ")
    .some(c => c.startsWith("seenIntro="));

  return (
    <div>
      <h1>Bin Buddy</h1>
      <p>Bin Buddy helps you identify and sort waste correctly.</p>


      {!hasSeenIntro && (
        <button
          onClick={() => {
            document.cookie = "seenIntro=true; path=/; max-age=31536000";
            if (setShowIntro) setShowIntro(false);
            navigate("/");
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
}