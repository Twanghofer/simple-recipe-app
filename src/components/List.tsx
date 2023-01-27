export default function List({
  title,
  items,
}: {
  title: String;
  items: string[] | undefined;
}) {
  if (!items) return null;

  return (
    <section className="grid gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item}>&#x2022; {item}</li>
        ))}
      </ul>
    </section>
  );
}
