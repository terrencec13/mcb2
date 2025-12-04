'use client';


import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, usePathname } from 'next/navigation';


const Navbar = ({ profilePicUrl, user }: { profilePicUrl: string; user: any }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();
  const pathname = usePathname();
  const isHero = pathname === '/hero';
  const isEvent = pathname.startsWith('/form');

  useEffect(() => {
    setIsAdmin(user?.user_metadata.is_admin)
  }, [user, supabase]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // If user is signed in, show the new navbar design
  if (user) {
    return (
      <>
        <nav className="fixed inset-x-0 top-0 z-50 w-full bg-[#003262] px-4 transition-all duration-300">
          <div className="mx-auto flex max-w-8xl items-center justify-between py-3">
            {/* Logo */}
            <Link href="/dashboard" className="shrink-0">
              <Image
                src="/assets/mcb_icon.png"
                alt="MCB logo"
                width={48}
                height={48}
                className="rounded-full border-2 border-white object-cover"
              />
            </Link>

            {/* Navigation Links and Profile Picture grouped together on the right */}
            <div className="flex items-center gap-6">
              {/* Navigation Links */}
              <ul className="flex gap-6 font-medium items-center uppercase text-sm">
                <li className="hover:font-bold"><Link href="/hero" className="text-[#FDB515]" style={{ color: '#FDB515' }}>HOME</Link></li>
                <li className="hover:font-bold"><Link href="/dashboard" className="text-[#FDB515]" style={{ color: '#FDB515' }}>SERVICES</Link></li>
                <li className="hover:font-bold"><Link href="/form" className="text-[#FDB515]" style={{ color: '#FDB515' }}>ORDER FORMS</Link></li>
                <li className="hover:font-bold"><Link href="/dashboard" className="text-[#FDB515]" style={{ color: '#FDB515' }}>PRICING</Link></li>
                <li className="hover:font-bold"><Link href="/dashboard" className="text-[#FDB515]" style={{ color: '#FDB515' }}>MORE</Link></li>
                <li className="hover:font-bold"><Link href="/contact" className="text-[#FDB515]" style={{ color: '#FDB515' }}>CONTACT</Link></li>
              </ul>

              {/* Profile Picture / Notification Icon */}
              <div className="relative shrink-0">
                <Link href="/profile">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FDB515] transition overflow-hidden border-2 border-white">
                    {profilePicUrl || user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                      <Image
                        src={profilePicUrl || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || ""}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-full h-full"
                      />
                    ) : (
                      <svg className="w-6 h-6 text-[#003262]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                    <span className="absolute top-0 right-0 w-3 h-3 bg-[#FDB515] rounded-full border-2 border-white"></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {!isHero && <div className="h-[74px]" />}
      </>
    );
  }

  // Original navbar for non-signed-in users
  let bgClass: string;
  if (!isHero) {
    // any non-hero page is solid
    bgClass = 'bg-[#003262] border-none';
  } else {
    // on hero page, preserve transparent → on-scroll logic
    bgClass = scrolled
      ? 'bg-transparent border-none'
      : 'bg-transparent border-none border-transparent';
  }

  const marginClass = isEvent && !isHero ? 'mb-[10px]' : '';

  return (
    <>
    <nav className={`fixed inset-x-0 top-0 z-50 w-full px-4 transition-all duration-300 ${bgClass} ${marginClass}`}>

      <div className="mx-auto flex max-w-8xl items-center justify-between py-3">
        
        <Link href="/profile" className="shrink-0">
          <Image
            src="/assets/mcb_icon.png"
            alt="MCB logo"
            width={48}
            height={48}
            className="rounded-full border-2 border-white object-cover"
          />
        </Link>

        <ul
          className={`flex gap-8 font-medium items-center
            ${scrolled ? 'opacity-0 pointer-events-none -translate-y-1' :
              'opacity-100 translate-y-0'}
          `}
        >
          <li className="hover:font-bold"><Link href="/hero" className="text-[#FDB515]" style={{ color: '#FDB515' }}>HOME</Link></li>
          <li className="hover:font-bold"><Link href="/form" className="text-[#FDB515]" style={{ color: '#FDB515' }}>ORDER&nbsp;FORMS</Link></li>
          <li className="hover:font-bold"><Link href="/admin-dash" className="text-[#FDB515]" style={{ color: '#FDB515' }}>ADMIN DASHBOARD</Link></li>
          <li className="hover:font-bold"><Link href="/plate-selection" className="text-[#FDB515]" style={{ color: '#FDB515' }}>PLATE SELECTION</Link></li>
          <li className="hover:font-bold"><Link href="/contact" className="text-[#FDB515]" style={{ color: '#FDB515' }}>FEEDBACK</Link></li>

          {/* Show Sign In button */}
          <Link href="/login">
            <button className="px-5 py-2 border border-white text-white rounded-xl text-sm hover:bg-[#FDB515] hover:text-[#003262] transition">
              SIGN IN
            </button>
          </Link>
        </ul>
      </div>
    </nav>
    {!isHero && <div className="h-[74px]" />}
    </>
  );
}
export default Navbar;