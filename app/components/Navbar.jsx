import Link from "next/link";
function Navbar() {
  return (
    <nav className="fixed top-0 z-50 bg-white shadow-md w-full rounded-b-lg">
      <div className="h-16 mx-auto flex items-center px-8">
        <Link href="/" className="text-2xl">
          Aswan-Med
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
