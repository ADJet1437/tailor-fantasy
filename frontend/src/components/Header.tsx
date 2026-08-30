import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-white text-2xl font-bold">
            💅 Tailor Fantasy - DIY Nails
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
