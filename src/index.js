import dotenv from "dotenv";
import express from "express";  
import roteadorUsuario from "./routes/usuario.js";
import roteadorLogin from "./routes/login.js";
import roteadorAnuncio from "./routes/anuncio.js";
import roteadorLivro from "./routes/livro.js";
import {
  selectUsuario,
  selectUsuarios,
  insertUsuario,
  deleteUsuario,
  updateUsuario,
  selectAnuncios,
  selectAnuncio,
  insertAnuncio,
  deleteAnuncio,
  updateAnuncio,
} from "./db/index.js";

const app = express();              
const port = 3000;                  

app.use(express.json());
app.use(roteadorUsuario);
app.use(roteadorAnuncio);
app.use(roteadorLivro);
app.use(roteadorLogin);
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {       
  res.json({
    nome: "Venda de Livros",     
  });
  console.log("Rota / solicitada");
});

app.listen(port, () => {          
  console.log(`Serviço escutando na porta:  ${port}`);
});

