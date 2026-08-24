'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { User, UserCheck, LogOut, Settings, ChevronDown } from 'lucide-react';

export default function UserDropdown({ variant = 'public' }) {
  const { customer, loading: customerLoading, logout: customerLogout, isAuthenticated: isCustomerAuth } = useCustomerAuth();
  const { user, loading: adminLoading, logout: adminLogout, isAuthenticated: isAdminAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const hoverTimer = useRef(null);

  const isAdmin = variant === 'admin';
  const adminUser = isAdminAuth ? user : null;
  const displayName = isAdmin
    ? adminUser?.firstName || adminUser?.lastName
      ? `${adminUser.firstName || ''} ${adminUser.lastName || ''}`.trim()
      : 'Administrador'
    : customer?.firstName || customer?.name?.split(' ')[0] || 'Cliente';
  const displayEmail = isAdmin ? adminUser?.email || '' : customer?.email || '';
  const loading = isAdmin ? adminLoading : customerLoading;
  const isAuthenticated = isAdmin ? isAdminAuth : isCustomerAuth;
  const logoutFn = isAdmin ? adminLogout : customerLogout;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setVisible(false);
        setTimeout(() => setOpen(false), 200);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setVisible(false);
        setTimeout(() => setOpen(false), 200);
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

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    return undefined;
  }, [open]);

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
          {loading ? '' : isAuthenticated ? displayName : 'Cuenta'}
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
          className={`absolute right-0 mt-3 w-80 bg-sisley-white border border-sisley-border shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-md z-50 transition-all duration-300 ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-5">
            {isAuthenticated ? (
              <>
                <div className="mb-4">
                  <p className="text-sm font-medium text-sisley-text">{displayName}</p>
                  <p className="text-xs text-sisley-muted mt-0.5">{displayEmail}</p>
                </div>
                <div className="h-px bg-sisley-border mb-4" />
                <div className="space-y-1">
                  <Link
                    href={isAdmin ? '/admin' : '/mi-cuenta'}
                    onClick={() => { setVisible(false); setTimeout(() => setOpen(false), 200); }}
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                    role="menuitem"
                  >
                    <User className="w-4 h-4" strokeWidth={1.5} />
                    Perfil
                  </Link>
                  <Link
                    href={isAdmin ? '/admin' : '/mi-cuenta'}
                    onClick={() => { setVisible(false); setTimeout(() => setOpen(false), 200); }}
                    className="flex items-center gap-3 px-2 py-2.5 text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4" strokeWidth={1.5} />
                    Configuración
                  </Link>
                </div>
                <div className="h-px bg-sisley-border my-4" />
                <button
                  onClick={async () => {
                    setVisible(false);
                    setTimeout(() => setOpen(false), 200);
                    await logoutFn();
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
                    {isAdmin
                      ? 'Accede al panel administrativo.'
                      : 'Accede a tu cuenta para consultar tus pedidos y gestionar tus datos.'}
                  </p>
                </div>
                <div className="h-px bg-sisley-border mb-4" />
                <div className="space-y-2">
                  <Link
                    href={isAdmin ? '/admin' : '/login'}
                    onClick={() => { setVisible(false); setTimeout(() => setOpen(false), 200); }}
                    className="block w-full text-center px-4 py-2.5 text-xs uppercase tracking-widest border border-sisley-black text-sisley-black hover:bg-sisley-black hover:text-sisley-white transition-colors duration-200"
                    role="menuitem"
                  >
                    {isAdmin ? 'Iniciar sesión admin' : 'Iniciar sesión'}
                  </Link>
                  {!isAdmin && (
                    <Link
                      href="/registro"
                      onClick={() => { setVisible(false); setTimeout(() => setOpen(false), 200); }}
                      className="block w-full text-center px-4 py-2.5 text-xs uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                      role="menuitem"
                    >
                      Crear cuenta
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
