import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-purple-600 text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        
        { /* Our Logo */ }
        <h1 className="text-xl font-bold">UNI-FRIEND SYNC</h1>

        { /* Links to Pages */ }
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/interest" className="hover:underline">
                Interest
              </Link>
            </li>
            <li>
              <Link href = "/event" className = "hover:underline">
                Event
              </Link>
            </li>
            <li>
              <Link href="/map" className="hover:underline">
                Map
              </Link>
            </li>
            <li>
              <Link href="/game" className="hover:underline">
                Game
              </Link>
            </li>
            <li>
              <Link href = "/profile" className = "hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link href = "/setting" className = "hover:underline">
                Setting
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}