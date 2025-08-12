interface LoadingRingProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<LoadingRingProps> = ({
  size = 40,
  color = "#FF6A00",
}) => {
  return (
    <div
      className="rounded-full border-4 border-t-transparent animate-spin"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}
      role="status"
      aria-label="Loading"
    />
  );
};