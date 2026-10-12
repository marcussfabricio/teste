/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import AuthModal from '../components/Auth/AuthModal';
import { DEMO_ACCOUNTS, DEMO_SESSION_KEY, findDemoAccount } from '../data/demoAccounts';

const AuthContext = createContext(null);
const ACCOUNTS_KEY = 'abrigo-local-accounts-v1';
const readAccounts = () => JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
const readSession = () => {
  try { return JSON.parse(localStorage.getItem(DEMO_SESSION_KEY) || 'null'); }
  catch { return null; }
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readSession);
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' });

  const enter = useCallback((account) => {
    const usuario = { ...account.usuario };
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(usuario));
    setUser(usuario);
    setAuthModal({ open: false, tab: 'login' });
    return usuario;
  }, []);

  const login = useCallback(async ({ email, senha }) => {
    const account = findDemoAccount({ email, senha }) || readAccounts().find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.senha === senha);
    if (!account) throw new Error('E-mail ou senha incorretos.');
    return enter(account);
  }, [enter]);

  const register = useCallback(async (dados) => {
    const email = dados.email.trim().toLowerCase();
    if ([...DEMO_ACCOUNTS, ...readAccounts()].some((account) => account.email.toLowerCase() === email)) throw new Error('Este e-mail já está cadastrado.');
    const usuario = { id: crypto.randomUUID(), nomeCompleto: dados.nomeCompleto, email, telefone: dados.telefone, role: 'USER', criadoEm: new Date().toISOString(), demo: true };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...readAccounts(), { email, senha: dados.senha, usuario }]));
    return enter({ usuario });
  }, [enter]);

  const logout = useCallback(() => {
    localStorage.removeItem(DEMO_SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    const updated = { ...user, ...data };
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(updated));
    const accounts = readAccounts().map((account) => account.usuario.id === user.id ? { ...account, email: updated.email, usuario: updated } : account);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setUser(updated);
    return updated;
  }, [user]);

  const openAuthModal = useCallback((tab = 'login') => setAuthModal({ open: true, tab }), []);
  const closeAuthModal = useCallback(() => setAuthModal((state) => ({ ...state, open: false })), []);
  const value = { user, loading: false, isAuthenticated: !!user, isAdmin: user?.role === 'ADMIN', login, register, logout, updateProfile, openAuthModal, closeAuthModal };

  return <AuthContext.Provider value={value}>{children}<AuthModal key={`${authModal.tab}-${authModal.open}`} show={authModal.open} initialTab={authModal.tab} onClose={closeAuthModal} onLogin={login} onRegister={register} /></AuthContext.Provider>;
};

export const RequireAuth = ({ children }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  useEffect(() => { if (!isAuthenticated) openAuthModal('login'); }, [isAuthenticated, openAuthModal]);
  return isAuthenticated ? children : <Navigate to="/home" replace />;
};

export const RequireAdmin = ({ children }) => {
  const { isAdmin, isAuthenticated, openAuthModal } = useAuth();
  useEffect(() => { if (!isAuthenticated) openAuthModal('login'); }, [isAuthenticated, openAuthModal]);
  return isAdmin ? children : <Navigate to="/home" replace />;
};
