export type BulletPointType = "disc" | "numeric";

export default function ListItem({
  type = "disc",
  index,
  children,
}: {
  type: BulletPointType;
  index: number;
  children: string;
}) {
  if (type === "numeric") {
    return (
      <span>
        <strong>{++index}.</strong> {children}
      </span>
    );
  }

  return <span>&#x2022; {children}</span>;
}
