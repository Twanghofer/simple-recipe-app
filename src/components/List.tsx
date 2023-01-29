import ListItem from "./ListItem";

export default function List({
  title,
  items,
  type = "disc",
}: {
  title: String;
  items: string[] | undefined;
  type?: "disc" | "numeric";
}) {
  if (!items) return null;

  return (
    <section className="grid gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="grid gap-2">
        {items.map((item, index) => (
          <ListItem key={item} {...{ item, index, type }}>
            {item}
          </ListItem>
        ))}
      </ul>
    </section>
  );
}
