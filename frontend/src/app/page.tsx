export default function Home() {
  return (
    <div className="min-h-screen bg-blue-300">
      <header className="bg-blue-300 text-gray-500 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center px-8">
          {/* Stacked Logo */}
          <div className="text-left">
            <span className="block text-3xl font-semibold">Uni</span>
            <span className="block text-3xl font-semibold">Friend</span>
            <span className="block text-3xl font-semibold">Sync</span>
          </div>

          {/* Centered Navigation Menu */}
          <nav className="flex space-x-9 justify-center flex-grow">
            {["Home", "Events", "Map", "Interests", "Mini Games"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-2xl font-semibold hover:text-gray-800 transition duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex justify-center items-center h-[80vh] text-white text-2xl">
        
      </main>
    </div>
  );
}
