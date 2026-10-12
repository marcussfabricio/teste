export const DEMO_SESSION_KEY = 'abrigo-demo-session';

export const DEMO_ACCOUNTS = [
  {
    email: 'adotante@abrigo.local',
    senha: 'adotar123',
    usuario: {
      id: 'demo-user',
      nomeCompleto: 'Marina Oliveira',
      email: 'adotante@abrigo.local',
      telefone: '(47) 99999-0001',
      cidade: 'Joinville',
      estado: 'SC',
      role: 'USER',
      emailVerificado: true,
      receberEmails: true,
      criadoEm: '2026-01-15T10:00:00',
      demo: true,
    },
  },
  {
    email: 'admin@patudos.org',
    senha: 'patudos123',
    usuario: {
      id: 'demo-admin',
      nomeCompleto: 'Admin Abrigo Animal',
      email: 'admin@patudos.org',
      telefone: '(47) 99999-0002',
      cidade: 'Joinville',
      estado: 'SC',
      role: 'ADMIN',
      emailVerificado: true,
      receberEmails: false,
      criadoEm: '2025-01-01T10:00:00',
      demo: true,
    },
  },
];

export const findDemoAccount = ({ email, senha }) =>
  DEMO_ACCOUNTS.find(
    (account) =>
      account.email.toLowerCase() === String(email || '').trim().toLowerCase() &&
      account.senha === senha,
  );
