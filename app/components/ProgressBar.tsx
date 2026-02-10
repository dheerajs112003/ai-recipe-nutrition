export default function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{Math.round(percent)}%</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded">
        <div
          className="h-3 bg-black rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
