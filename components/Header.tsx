import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavMenu } from "./index";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, [])
  return (
      <header className={`${isScrolled && 'bg-red-500'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
          <img
              className="cursor-pointer object-contain p-2"
              src="https://rb.gy/ulxxee"
              width={100}
              height={100}/>
          <NavMenu/>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          <SearchIcon className="hidden sm:inline menu-link" width={20}/>
          <p className="hidden lg:inline">Kids</p>
          <BellIcon className="hidden sm:inline menu-link" width={20}/>
          <Link href="/account">
            <img
                className="cursor-pointer"
                src="https://rb.gy/g1pwyx"
                width={20}
                height={20}
            />
          </Link>
        </div>
      </header>
  );
}

export default Header;