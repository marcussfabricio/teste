# Guia do frontend — Abrigo Animal Joinville

## Estado atual

O projeto é um frontend local feito com React 19, Vite 8, JavaScript/JSX, CSS e React Bootstrap. Ele funciona sem servidor de API, banco de dados, Cloudinary ou login Google.

O site foi criado somente para cães. Não há gatos no catálogo. O layout é responsivo, com atenção especial ao uso pelo navegador do celular, e utiliza as cores e imagens da identidade visual do Abrigo Animal Joinville.

## Estrutura principal

- `src/main.jsx`: inicia a aplicação.
- `src/App.jsx`: reúne todas as rotas.
- `src/pages`: contém as telas completas.
- `src/components`: contém cabeçalho, rodapé, cards, carrosséis, formulários e elementos administrativos.
- `src/assets`: contém logos, fotos do abrigo, cães e imagens institucionais.
- `src/data`: contém cães e contas iniciais de demonstração.
- `src/services`: contém somente operações locais de cães, apadrinhamentos, indicadores administrativos e armazenamento de fotos e vídeos.
- `src/styles/global.css`: concentra cores globais e padronização dos botões.

Arquivos e pastas de API, eventos, voluntariado, Cloudinary, login Google e `.claude` foram removidos por não serem necessários ao frontend atual.

## Site público

### Página inicial — `/home`

A página inicial possui:

- Destaque de adoção com a imagem `cao-gravata`.
- Botão “Adotar” que abre o catálogo de cães.
- Aviso sobre denúncia de maus-tratos.
- Cards de alguns cães disponíveis.
- Rolê dos Patudos, realizado todos os sábados e sem necessidade de agendamento.
- Carrossel “Conheça nossos amiguinhos”, usando `mural foto 1.jpeg` até `mural foto 4.jpeg`.
- Carrossel “Momentos dos nossos amiguinhos” com os quatro vídeos locais da pasta `src/assets/videos`, reproduzidos automaticamente, sem som e em loop.

Os indicadores “Vidas salvas”, “Adotados” e “Esperando por você” foram removidos.

### Catálogo e cães — `/catalogo` e `/pets/:id`

O catálogo mostra somente cães, possui filtros e cards que abrem a tela individual do animal. A página de detalhes apresenta foto, sexo, idade, porte, energia, comportamento e cuidados veterinários quando essas informações estiverem disponíveis.

O botão de adoção não inicia uma adoção online. Ele abre o WhatsApp do abrigo com uma mensagem sobre o cão escolhido. Os cards não possuem botão de favoritos; a área do perfil acompanha os cães apadrinhados.

### Apadrinhamento — `/apadrinhar/:id`

O visitante escolhe um cão e preenche um interesse de apadrinhamento. O registro fica salvo neste navegador, aparece no perfil da conta que usou o mesmo e-mail e também na página `/admin/apadrinhamentos`.

### Como ajudar — `/como-ajudar`

Esta página centraliza as formas de apoio ao abrigo. Ela apresenta:

- Cuidado de animais.
- Apadrinhe.
- Rolê dos Patudos.
- Adotar um idoso.
- Divulgação e redes sociais.
- Doações de materiais e insumos.
- Endereço único para entrega: Abrigo Animal Joinville, Estrada Blumenau, s/n — Vila Nova, Joinville — SC.

O formulário de coleta em domicílio foi removido. A rota antiga `/doacao` redireciona para `/como-ajudar#doacoes`. A página pública e a área administrativa de voluntariado também foram removidas.

### Outras páginas

- `/sobre`: história, atuação e informações institucionais do abrigo.
- `/denuncia`: orientações para denúncia de maus-tratos e logo da polícia.
- `/termos`: termos de uso e privacidade.
- `/perfil`: nome, telefone, preferências locais e cães apadrinhados. O endereço foi removido porque não há adoção online.

## Painel administrativo

O painel fica em `/admin` e permite:

- Visualizar os cães cadastrados.
- Cadastrar um cão.
- Editar suas informações e foto.
- Excluir um cão do catálogo local.
- Marcar um cão como adotado.
- Acompanhar apadrinhamentos em uma página separada.
- Gerenciar, em uma página separada, as fotos e os vídeos exibidos nos carrosséis da página inicial.

As fotos dos cães adicionadas pelo painel são comprimidas e salvas no navegador. A aba “Mídias da página inicial” aceita fotos de até 10 MB e vídeos de até 100 MB. Quando existe conteúdo personalizado de um tipo, ele substitui o conteúdo demonstrativo daquele carrossel. A aba de adoções, a agenda de eventos e a página de voluntariado não fazem parte do painel atual.

O formulário de cães registra nome, gênero, fase de vida, porte, descrição, foto e cuidados veterinários. Os textos do painel deixam claro que tudo é salvo localmente, sem banco de dados.

## Contas de demonstração

- Administrador: `admin@patudos.org` / `patudos123`
- Perfil comum: `adotante@abrigo.local` / `adotar123`

Também é possível criar uma conta local pelo modal de cadastro. Essas contas servem somente para testar as telas e não oferecem a segurança necessária para um site publicado.

A página de termos e privacidade descreve esse funcionamento local de forma explícita. Não use uma senha real nas contas de demonstração.

## Como os dados funcionam

O projeto usa `localStorage` para cães, contas demonstrativas e apadrinhamentos. Fotos e vídeos da página inicial são guardados no `IndexedDB`, que comporta arquivos maiores. Todo o conteúdo permanece somente no navegador e endereço local em que foi criado. O site público e o painel compartilham os mesmos dados quando são abertos nesse mesmo navegador.

A lista inicial de cães vem de `src/data/mockPets.js`. Se os dados do site forem apagados no navegador, as alterações locais são perdidas e o catálogo inicial volta a aparecer.

Não existe sincronização entre computadores, usuários ou navegadores. Os formulários não enviam dados ao abrigo. Para publicar o projeto com cadastros reais, será necessário adicionar futuramente um serviço seguro de autenticação, banco de dados e integração de formulários.

## Aparência e mídia

Os botões seguem uma cor padrão definida em `src/styles/global.css`. O site usa imagens locais para funcionar sem uma API de mídia. As fotos do carrossel não possuem legendas sobrepostas. Instagram e WhatsApp são apenas links externos abertos quando o visitante escolhe acessá-los.

## Como executar

O computador precisa ter Node.js e npm. Na pasta raiz do projeto, execute:

```bash
npm install
npm run dev
```

O endereço local normalmente é `http://127.0.0.1:5173/home` ou `http://localhost:5173/home`.

Outros comandos disponíveis:

```bash
npm run build
npm run lint
npm run preview
```

O projeto não depende de variáveis de ambiente nem possui variável de API. As pastas `node_modules` e `dist` são geradas automaticamente.
