import { Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="top-0 flex h-20 w-full flex-col gap-3 bg-white px-6">
        <div className="mt-2 flex justify-end gap-4">
          <div>Help</div>
          <div>Orders & Returns</div>
          <div>Hi,John</div>
        </div>
        <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
          <h6 className="text-4xl font-extrabold">ECOMMERCE</h6>

          <div className="flex gap-4">
            <span className="font-semibold">Categories</span>
            <span className="font-semibold">Sale</span>
            <span className="font-semibold">Clearance</span>
            <span className="font-semibold">New Stock</span>
            <span className="font-semibold">Trending</span>
          </div>

          <div className="flex gap-4">
            <Search />
            <ShoppingCart />
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 p-2 flex justify-center items-center gap-4">
        <ChevronLeft />
        <h6 className="text-sm font-bold">
          Get 10% off on business sign up
        </h6>
        <ChevronRight />
      </div>
    </>
  );
};

export default Navbar;
