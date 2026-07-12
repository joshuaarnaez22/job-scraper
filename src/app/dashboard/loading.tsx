export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen animate-pulse">
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r-4 border-foreground bg-card" />
      <main className="flex-1 md:pl-56 p-6">
        <div className="h-20 bg-muted mb-6" />
        <div className="h-32 bg-muted mb-6" />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="h-96 bg-muted" />
          <div className="h-96 bg-muted" />
        </div>
      </main>
    </div>
  );
}
