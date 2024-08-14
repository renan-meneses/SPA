# SPA

## Descrição

SPA de escolha de fornecedor. Nesta aplicação, os usuários podem informar o seu consumo de energia e escolher o melhor fornecedor de acordo com as suas necessidades. A aplicação é uma Single Page Application (SPA) construída com Django no backend utilizando GraphQL e React no frontend, proporcionando uma experiência de usuário fluida e dinâmica.

## Estrutura do Projeto

- **Backend:** Django com GraphQL (Graphene)
- **Frontend:** React
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens)
- **Gerenciamento de Estado (Front):** Redux (ou Context API)
- **Estilização:** CSS/SCSS, Styled-components (ou qualquer outra biblioteca de sua escolha)
- **Gerenciamento de Pacotes (Back):** pip
- **Gerenciamento de Pacotes (Front):** npm ou yarn
- **Containerização:** Docker

## Requisitos

- Python 3.8+
- Node.js 14+
- Docker e Docker Compose
- pip (para gerenciamento de dependências do Python)
- npm ou yarn (para gerenciamento de dependências do Node.js)

## Configuração do Ambiente de Desenvolvimento

### Backend (Django)

1. **Clone o repositório:**

    ```bash
    git@github.com:renan-meneses/SPA.git
    cd SPA/static_shock
    ```

2. **Crie e ative o ambiente virtual:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows, use `venv\Scripts\activate`
    ```

3. **Instale as dependências:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto Django e adicione as variáveis necessárias, como exemplo:

    ```env
    DEBUG=True
    SECRET_KEY=suachave
    DATABASE_URL=postgres://usuario:senha@localhost:5432/nomedobanco
    ```

5. **Aplique as migrações e inicie o servidor:**

    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend (React)

1. **Navegue até o diretório do frontend:**

    ```bash
    cd ../black_lightning
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

3. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm start
    ```

    ou

    ```bash
    yarn start
    ```

## Usando Docker

### Preparação

1. **Construa e inicie os contêineres:**

    Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute:

    ```bash
    docker-compose up --build
    ```

2. **Acesse o backend:**

    O backend estará disponível em [http://localhost:8000](http://localhost:8000).

3. **Acesse o frontend:**

    O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

### Parar os contêineres

Para parar os contêineres, pressione `Ctrl+C` no terminal onde o Docker Compose está sendo executado ou use:

```bash
docker-compose down
```

## Testes

### Backend

1. **Execute os testes:**

    ```bash
    python manage.py test
    ```

### Frontend

1. **Execute os testes:**

    ```bash
    npm test
    ```

    ou

    ```bash
    yarn test
    ```

## Deploy

### Usando Docker

1. **Build para produção:**

    Certifique-se de que as configurações de produção estejam configuradas nos arquivos de ambiente (.env).

    ```bash
    docker-compose -f docker-compose.prod.yml up --build
    ```

2. **Migrations e coleta de arquivos estáticos (Backend):**

    ```bash
    docker-compose exec web python manage.py migrate
    docker-compose exec web python manage.py collectstatic --noinput
    ```

## Contribuição

Sinta-se à vontade para fazer um fork do projeto e enviar pull requests. Qualquer ajuda é bem-vinda!

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
