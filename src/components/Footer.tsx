
const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-xl font-bold text-ayu-purple">Ayu</span>
            <span className="text-xl font-bold text-ayu-blue">Sphere</span>
          </div>
          
          <div className="text-sm text-gray-500">
            © 2025 AyuSphere. All rights reserved by DJ Sanghvi.
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-ayu-purple transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-ayu-purple transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-ayu-purple transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
