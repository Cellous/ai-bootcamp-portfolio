export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md mb-6">
      {children}
    </div>
  );
}
