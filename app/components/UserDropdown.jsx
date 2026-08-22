'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { User, UserCheck, LogOut, Package, ChevronDown } from 'lucide-react';

export default function UserDropdown() {
  const { customer, loading, logout, isAuthenticated } = useCustomerAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const displayName = customer?.firstName || customer?.name?.split(' ')[0] || 'Cliente';
  const displayEmail = customer?.email || '';
  const firstName = customer?.firstName || '';

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
        aria-label={isAuthenticated ? `Cuenta de ${displayName}` : 'Cuenta'}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {loading ? (
          <span className="w-5 h-5 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full border border-sisley-text-secondary border-t-transparent animate-spin" />
          </span>
        ) : isAuthenticated ? (
          <div className="relative">
            <UserCheck className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </div>
        ) : (
          <User className="w-5 h-5" strokeWidth={1.5} />
        )}
        <span className="hidden xl:inline text-xs uppercase tracking-widest">
          {loading ? '' : isAuthenticated ? `Hola, ${firstName}` : 'Cuenta'}
        </span>
        {!loading && (
          <ChevronDown
            className={`hidden xl:block w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        )}
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-80 bg-sisley-white border border-sisley-border z-50"
          style={{
            animation: 'fadeIn 0.2s ease-out',
          }}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-5">
            {isAuthenticated ? (
              <>
                <div className="mb-4">
                  <p className="text-sm font-medium text-sisley-text">Hola, {displayName}</p>
                  <p className="text-xs text-sisley-muted mt-0.5">{displayEmail}</p>
                </div>
                <div className="h-px bg-sisley-border mb-4" />
                <div className="space-y-1">
                  <Link
                    href="/mi-cuenta"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                    role="menuitem"
                  >
                    <User className="w-4 h-4" strokeWidth={1.5} />
                    Mi cuenta
                  </Link>
                  <Link
                    href="/mis-pedidos"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                    role="menuitem"
                  >
                    <Package className="w-4 h-4" strokeWidth={1.5} />
                    Mis pedidos
                  </Link>
                </div>
                <div className="h-px bg-sisley-border my-4" />
                <button
                  onClick={async () => {
                    setOpen(false);
                    await logout();
                  }}
                  className="flex items-center gap-3 px-2 py-2.5 text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200 w-full"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Cuenta</p>
                  <p className="text-xs text-sisley-muted leading-relaxed">
                    Accede a tu cuenta para consultar tus pedidos y gestionar tus datos.
                  </p>
                </div>
                <div className="h-px bg-sisley-border mb-4" />
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center px-4 py-2.5 text-xs uppercase tracking-widest border border-sisley-black text-sisley-black hover:bg-sisley-black hover:text-sisley-white transition-colors duration-200"
                    role="menuitem"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/registro"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center px-4 py-2.5 text-xs uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                    role="menuitem"
                  >
                    Crear cuenta
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
