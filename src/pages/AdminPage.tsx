export function AdminPage() {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p className="text-muted-foreground">Only users with the admin role can see this page.</p>
    </section>
  );
}
