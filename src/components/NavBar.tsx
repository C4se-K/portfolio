import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-8">
      <Link href="/bio" className="h-10 w-10 rounded-full bg-neutral-400" />
      <Link href="/" className="h-10 w-10 rounded-full bg-neutral-900" />
      <Link href="/canvas" className="h-10 w-10 rounded-full bg-neutral-400" />
    </div>
  );
}
