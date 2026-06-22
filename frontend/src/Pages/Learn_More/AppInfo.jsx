import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BinBuddyMascot from "../../assets/BinBuddyMascot.png";
import DemoPic1 from "../../assets/DemoPic1.png";
import DemoPic2 from "../../assets/DemoPic2.png";
import DemoPic3 from "../../assets/DemoPic3.png";
import "./AppInfo.css"

export default function AppInfo({ setShowIntro }){
  const navigate = useNavigate();
  const isIntro = typeof setShowIntro === "function";
  const [step, setStep] = useState(0);
  const hasSeenIntro = document.cookie
    .split("; ")
    .some(c => c.startsWith("seenIntro="));

 const content = [
    {
      title: "Welcome to Bin Buddy",
      text: "Bin Buddy helps you identify and sort waste quickly.",
      image: BinBuddyMascot
    },
    {
      title: "How to use BinBuddy",
      text: "Capture a clear image of the item you want to dispose of.",
      image: DemoPic1
    },
    {
      title: "How to use BinBuddy",
      text: "You can also upload an image from your device",
      image: DemoPic2
    },
    {
      title: "How to use BinBuddy",
      text: "Bin Buddy analyzes item returns information for proper disposal",
      image: DemoPic3
    }
  ];

  function next() {
    if (step < 3) {
      setStep(step + 1);
    } else {
      finish();
    }
  }

  function prev() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function finish() {
    if (!hasSeenIntro) {
      document.cookie = "seenIntro=true; path=/; max-age=31536000";
    }

    if (setShowIntro) {
      setShowIntro(false);
    }

    navigate("/");
  }

  return (
    <div className="appInfo">
    <h1>{content[step].title}</h1>
    <img
      src={content[step].image}
      alt={content[step].title}
    />
    <p>{content[step].text}</p>

      <div>
        {step > 0 && <button onClick={prev}>Back</button>}

        <button onClick={next}>
          {step === 3 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}


