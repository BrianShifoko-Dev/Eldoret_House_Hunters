'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Key, Building2, MapPin, BookOpen, Image, Users, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavbarProps {
  currentPage: string;
}

export function Navbar({ currentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'buy', label: 'Buy', icon: Key, href: '/buy' },
    { id: 'rent', label: 'Rent', icon: Building2, href: '/rent' },
    { id: 'sell', label: 'Sell', icon: Building2, href: '/sell' },
    { id: 'neighborhoods', label: 'Neighborhoods', icon: MapPin, href: '/neighborhoods' },
    { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' },
    { id: 'gallery', label: 'Gallery', icon: Image, href: '/gallery' },
    { id: 'offices', label: 'Our Offices', icon: Phone, href: '/offices' },
    { id: 'community', label: 'Community', icon: Users, href: '/community' },
  ];

  return (
    <nav
      className={`fixed top-[42px] left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md border-b border-gray-200 py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center group-hover:shadow-lg transition-all">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-gray-900">
                Eldoret House Hunters
              </div>
              <div className="text-xs text-blue-600">Find Your Perfect Home</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <Button
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  className={`text-sm whitespace-nowrap ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA - Desktop */}
          <Button
            className="hidden lg:flex bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white gap-2 shrink-0 shadow-lg"
            onClick={() => window.open('https://wa.me/254700000000', '_blank')}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xl:inline">WhatsApp Us</span>
            <span className="xl:hidden">WhatsApp</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden bg-blue-50 hover:bg-blue-100">
                <Menu className="w-6 h-6 text-blue-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-gray-200 w-80">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.id} href={item.href}>
                      <Button
                        variant={currentPage === item.id ? 'default' : 'ghost'}
                        onClick={() => setMobileOpen(false)}
                        className={`w-full justify-start gap-3 ${
                          currentPage === item.id ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700 hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white gap-2"
                    onClick={() => window.open('https://wa.me/254700000000', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
