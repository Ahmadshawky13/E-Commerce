"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { CountContext } from "src/CountProvider";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data, status } = useSession();
  const pathName = usePathname();
  const countData = useContext(CountContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Category", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/allorders", content: "Orders", protected: true },
  ];

  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <>
      <NavigationMenu
        viewport={false}
        className="max-w-full justify-between shadow-2xl px-5 py-6 relative"
      >
        {/* Desktop Navigation */}
        <NavigationMenuList className="hidden md:flex items-center gap-x-6 gap-y-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={"/"}>
                <Image
                  src={"/images/freshcart-logo.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {MenuItems.map((item) => {
            return (
              <NavigationMenuItem key={item.path}>
                {item.protected && status == "authenticated" && (
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      className={pathName == item.path ? "text-main" : ""}
                      href={item.path}
                    >
                      {item.content}
                    </Link>
                  </NavigationMenuLink>
                )}

                {!item.protected && (
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      className={pathName == item.path ? "text-main" : ""}
                      href={item.path}
                    >
                      {item.content}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}

          {status == "authenticated" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link
                  className="relative flex items-center gap-1"
                  href="/cart"
                >
                  <span
                    className={pathName === "/cart" ? "text-main" : "text-black"}
                  >
                    Cart
                  </span>
                  <i
                    className={`fa fa-shopping-cart absolute -top-1 -right-2 text-sm ${
                      pathName === "/cart" ? "text-main" : ""
                    }`}
                  ></i>
                  <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                    {countData?.count || 0}
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {status == "authenticated" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link
                  className={pathName === "/wishlist" ? "text-main" : "text-black"}
                  href="/wishlist"
                >
                  Wishlist
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>

        {/* Mobile Header */}
        <div className="flex md:hidden w-full justify-between items-center">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={"/"}>
                <Image
                  src={"/images/freshcart-logo.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <i className={`fa fa-${isMenuOpen ? "times" : "bars"} text-xl`}></i>
          </button>
        </div>

        {/* Desktop Auth Section */}
        <NavigationMenuList className="hidden md:flex items-center gap-x-6">
          {status == "authenticated" ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <span className="bg-red-400 py-2 px-5 rounded-lg">
                    Hi {data?.user.name}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <span className="cursor-pointer" onClick={logout}>
                    Logout
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              {MenuAuthItems.map((item) => {
                return (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={item.path}>{item.content}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </>
          )}
        </NavigationMenuList>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50">
            <div className="flex flex-col p-4 space-y-4">
              {/* Menu Items */}
              {MenuItems.map((item) => {
                return (
                  <NavigationMenuItem key={item.path}>
                    {item.protected && status == "authenticated" && (
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link
                          className={`block py-2 ${
                            pathName == item.path ? "text-main" : ""
                          }`}
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.content}
                        </Link>
                      </NavigationMenuLink>
                    )}

                    {!item.protected && (
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link
                          className={`block py-2 ${
                            pathName == item.path ? "text-main" : ""
                          }`}
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.content}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}

              {/* Cart for Mobile */}
              {status == "authenticated" && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link
                      className="relative flex items-center gap-1 py-2"
                      href="/cart"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className={pathName === "/cart" ? "text-main" : "text-black"}
                      >
                        Cart
                      </span>
                      <i
                        className={`fa fa-shopping-cart ml-2 text-sm ${
                          pathName === "/cart" ? "text-main" : ""
                        }`}
                      ></i>
                      <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                        {countData?.count || 0}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              {/* Wishlist for Mobile */}
              {status == "authenticated" && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link
                      className={`block py-2 ${
                        pathName === "/wishlist" ? "text-main" : "text-black"
                      }`}
                      href="/wishlist"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              {/* Auth Section for Mobile */}
              <div className="border-t pt-4 mt-4">
                {status == "authenticated" ? (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="block bg-red-400 py-2 px-5 rounded-lg mb-2">
                          Hi {data?.user.name}
                        </span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <span 
                          className="block cursor-pointer py-2" 
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Logout
                        </span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                ) : (
                  <>
                    {MenuAuthItems.map((item) => {
                      return (
                        <NavigationMenuItem key={item.path}>
                          <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                          >
                            <Link 
                              href={item.path} 
                              className="block py-2"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.content}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </NavigationMenu>
    </>
  );
}