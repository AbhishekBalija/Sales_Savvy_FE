const Brand = () => {
  return (
    <nav className="w-full bg-white shadow py-4 px-6 fixed top-0 left-0 z-50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
          <img
            src="/SalesSavvyLogo2.png"
            alt="Sales Savvy Logo"
            className="h-12 w-12 object-cover mix-blend-screen"
          />
        </div>
        <span className="font-[rostey] text-2xl text-purple-700">
          Sales Savvy
        </span>
      </div>
    </nav>
  );
};
export default Brand;
