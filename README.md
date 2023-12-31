# ToDo List

Este é um pequeno projeto de lista de tarefas que utiliza tecnologias modernas do mercado.

## Bibliotecas Utilizadas

### Frontend

- [React](https://reactjs.org/): Biblioteca para construção de interfaces de usuário.
- [TailwindCSS](https://tailwindcss.com/): Biblioteca para definir propriedades CSS por meio de classes.
- [Next.js](https://nextjs.org/): Framework React com renderização do lado do servidor e outras funcionalidades.
- [Axios](https://axios-http.com/): Cliente HTTP para fazer requisições à API.
- [react-toastify](https://fkhadra.github.io/react-toastify/): Componente de notificação elegante para React.
- [mui icons](https://mui.com/components/icons/): Conjunto de ícones para interfaces do Material-UI.

### Backend

- [Express](https://expressjs.com/): Framework para montar a base da API.
- [CSURF](https://www.npmjs.com/package/csurf): Middleware para proteção contra ataques CSRF (Cross-Site Request Forgery).
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS): Mecanismo de segurança para controlar solicitações entre diferentes origens.
- [Mongoose](https://mongoosejs.com/): Biblioteca para interagir com o MongoDB.

## Requisitos

- [NodeJS](https://nodejs.org/)

## Como Rodar a Aplicação

1. Abra duas janelas do terminal de sua preferência.
2. No terminal 1, navegue até a pasta `backend` usando o seguinte comando:
```
cd backend
```
3. No terminal 2, navegue até a pasta `frontend` usando o seguinte comando:
```
cd frontend
```
4. Execute o seguinte comando em ambos os terminais para instalar as dependências dos projetos:
```
npm install
```
5. No terminal 1, use o seguinte comando para iniciar o servidor:
```
npm run start
```

6. Depois de ter iniciado o backend(seguindo o comando acima), use o seguinte comando no terminal 2:
```
npm run build
```
7. Pronto! Agora basta iniciar o backend usando este comando no terminal 2:
```
npm run start
```
8. Depois que tudo estiver iniciado, você poderá acessar a aplicação pelo link [http://localhost:3000/](http://localhost:3000/)
