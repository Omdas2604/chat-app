import React from "react";
import { Logo } from "./Icons.jsx";

const LandingContent = ({ theme }) => (
  <div className="h-full flex flex-col justify-center items-center text-center">
    <Logo theme={theme} className="w-16 h-16 mb-4" />
    <h1 className="text-4xl font-medium">How can I help you today?</h1>
  </div>
);

export default LandingContent;
