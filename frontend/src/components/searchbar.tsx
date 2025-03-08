export default function SearchBar() {

  return (
    <div>
       <div className="absolute top-20 left-4 bg-white rounded" style={{ width: '300px', height: '40px' }}>
            <input
              type="text"
              placeholder="  Search"
              className="w-full h-full bg-transparent text-black"
            />
          </div>
    </div>
  );
}