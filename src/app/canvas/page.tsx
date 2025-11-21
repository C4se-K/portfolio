import NavBar from "@/components/NavBar";

export default function CanvasPage() {
  return (
    <div className="p-8 flex flex-col gap-16 w-full max-w-6xl mx-auto">
      <NavBar />

      <h2 className="text-2xl font-semibold">Canvas workspace</h2>

      <p className="text-neutral-600">
        This will eventually be your interactive canvas / board.
      </p>
    </div>
  );
}
