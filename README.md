# Abrigo Animal Joinville — frontend local

Site público e painel visual do Abrigo Animal Joinville em React e Vite. Esta versão roda sem servidor de API, banco de dados, Cloudinary ou login Google.

## Rodar

Requer Node.js e npm. Na pasta do projeto:

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173/home`. Para compilar, use `npm run build`; para conferir o código, `npm run lint`.

## Dados locais

Cães, contas demonstrativas e apadrinhamentos são guardados no `localStorage` do navegador. Fotos e vídeos adicionados pelo painel ficam no `IndexedDB`. O painel administrativo lê os dados desse mesmo navegador. Não há sincronização entre aparelhos nem envio real de formulários ao abrigo. Limpar os dados do site no navegador apaga as alterações locais e restaura os cães de exemplo.

Adoção abre uma conversa no WhatsApp do abrigo. Fotos do mural são arquivos locais. Links para Instagram e WhatsApp continuam externos, mas o site não consulta API externa para montar as telas.

Contas de demonstração:

- Painel: `admin@patudos.org` / `patudos123`
- Perfil: `adotante@abrigo.local` / `adotar123`

As contas locais servem para navegar e testar interfaces; não são autenticação segura para produção. O estado completo das telas, recursos, estrutura e limitações está documentado em [docs/GUIA_FRONTEND.md](docs/GUIA_FRONTEND.md).
