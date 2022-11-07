
https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs


CD C:\svieira\IPCA\'Cloud Computing'\Trabalho\Implementacao




CD C:\svieira\IPCA\'Cloud Computing'\Trabalho\Implementacao\authentication

npx prisma migrate dev




http://localhost:3000/client/authenticate


----

INSERT INTO "users" (id, username, password) VALUES ('a5d2573d-1501-48a3-a7b5-3453ccc1fea9', 'svieira', '$2b$10$qI3KxMh72giYJDx/v4Kre.xABLoD/a2hnfvruSHsjV5r7.kYBhDfO');


SELECT *
FROM "users";

----

http://localhost:3000/user/authenticate


{
"username": "svieira",
"password": "123456"
}


---

http://localhost:3000/user

{
"username": "ana.paula",
"password": "123456"
}

-------------------

GET
http://localhost:3000/customers


--------------------

git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/vsandro/autenticacao.git
git push -u origin master

