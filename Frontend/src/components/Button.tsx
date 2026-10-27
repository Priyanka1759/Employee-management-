interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

function Button({
  text,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className="submit-button"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;