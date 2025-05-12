type Props = {
  text: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ text, className, onClick }: Props) => {
  return (
    <>
      <button onClick={onClick} className={className}>
        {text}
      </button>
    </>
  );
};
