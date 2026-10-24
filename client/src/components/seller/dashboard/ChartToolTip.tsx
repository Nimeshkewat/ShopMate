interface Props {
  active?: boolean;
  payload?: { name?: string | number; value?: number | string }[];
  label?: string | number;
  formatValue?: (value: number) => string;
}

function ChartTooltip({ active, payload, label, formatValue }: Props) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
      {label !== undefined && <p className="mb-1 font-medium">{label}</p>}
      {payload.map((item, i) => (
        <p key={i}>
          {item.name ? `${item.name}: ` : ""}
          {formatValue ? formatValue(Number(item.value)) : item.value}
        </p>
      ))}
    </div>
  );
}
export default ChartTooltip;
