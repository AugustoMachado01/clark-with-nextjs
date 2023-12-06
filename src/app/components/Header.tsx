import Link from "next/link";

export function Header() {
  return (
    <>
      <nav className="bg-blue-700 py-4 px-6 flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-lg uppercase font-bold text-white">
              Clerk App
            </div>
          </Link>
        </div>
        <div className="text-white">
          <Link href="sign-in" className="text-gray-300 hover:text-white mr-4">
            Sign In
          </Link>
          <Link href="sign-up" className="text-gray-300 hover:text-white mr-4">
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
}
