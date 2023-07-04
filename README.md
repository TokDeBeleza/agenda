# Helpers

Helpers é um projeto desenvolvido para conectar pessoas que querem aprender Libras (Língua Brasileira de Sinais) com professores que estejam disponíveis para dar aulas gratuitas, em modelo presencial ou remoto.


## Configuração do Projeto
Após clonar o repositório, insira sequencialmente os seguintes comandos para instalar as dependências e iniciar a aplicação em seu navegador:

```sh
npm install 
npm run serve 
```
## Configuração do Banco de Dados
1. Configure o Firebase no projeto clonado, seguindo as orientações oficiais disponíveis na <a href="https://firebase.google.com/docs/web/setup">documentação do Firebase</a>.
2. Defina suas chaves secretas (secret keys) no arquivo "firebase.js".

### Popular o Banco de Dados

<i>Obs.: Todos os comandos referentes à Firebase CLI podem ser escritos utilizando o NPX a frente, uma vez que a CLI já está configurada no projeto.</i>

- Todos os arquivos backups estão disponíveis na pasta FirebaseBackups, dentro do diretório "docs".
- Para importar o usuários para autenticação, siga este passo-a-passo: https://firebase.google.com/docs/cli/auth
- Para importar os usuários dentro da Firestore, siga este tutorial: https://www.youtube.com/watch?v=V13tFNFELiQ&ab_channel=DreamDevelopers

## Documentação
Toda a documentação do projeto (Kanban, Pitch e UML) pode ser encontrada no diretório <a href="https://github.com/joao-souza-costa/libras-project/tree/master/docs">docs</a>, cada um em sua respectiva pasta. Também disponibilizamos, neste mesmo diretório, o arquivo-fonte do vídeo de apresentação em formato .mp4.

## Equipe
* Ivelin Lins dos Santos (Liderança e documentação) - <a href="https://www.linkedin.com/in/ivelinlins/">@ivelinlins</a>
* Cristyane Hespanha Tamioso (UX/UI) - <a href="https://www.linkedin.com/in/cristyane-tamioso/">@cristyane-tamioso</a>
* João Victor Costa Souza (Desenvolvimento) - <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-3994b4147/">@joão-victor</a>
