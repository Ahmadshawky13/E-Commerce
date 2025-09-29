import Image from "next/image";

export default function Footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
      </div>
      
      <footer className="w-full bg-[#1F7A2E] text-white py-4 flex items-center justify-center gap-4 shadow-lg mt-auto">
        <Image
          src="/images/freshcart-logo.svg"
          alt="FreshCart Logo"
          width={40}
          height={40}
        />
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
        </p>
      </footer>
    </div>
  );
}