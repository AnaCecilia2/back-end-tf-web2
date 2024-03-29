import { Router } from "express";
import verificarAutenticacao from "../middlewares/autenticacao.js";

import {
  selectUsuario,
  selectUsuarios,
  insertUsuario,
  deleteUsuario,
  updateUsuario,
  selectUsuarioId,
  selectUsuarioByEmail
} from "../db/index.js";

const router = Router();

router.get("/usuarios", async (req, res) => {
  console.log("Rota GET /usuario solicitada");
  try {
    const usuarios = await selectUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

//pega um usuário pelo nome
router.get("/usuario/nome/:nome",  async (req, res) => {
  console.log(`Rota GET /usuario/${req.params.nome} solicitada`);
  try {
    const usuario = await selectUsuario(req.params.nome);
    if (usuario.length > 0) 
      res.json(usuario);
    else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

router.get("/usuario/email/:email", async (req, res) => {
  console.log(`Rota GET /usuario/email/${req.params.email} solicitada`);
  try {
    const usuario = await selectUsuarioByEmail(req.params.email);
    if (usuario.length > 0) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

//pega um usuário pelo id
router.get("/usuario/:id",  async (req, res) => {
  console.log(`Rota GET /usuario/${req.params.id} solicitada`);
  try {
    const usuario = await selectUsuarioId(req.params.id);
    console.log(usuario);
    if (usuario.length > 0) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: usuario.length});
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});


router.post("/usuario", async (req, res) => {
  console.log("Rota POST /usuario solicitada");
  try {
    await insertUsuario(req.body);
    res.status(201).json({ message: "Usuário inserido com sucesso!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

router.put("/usuario", verificarAutenticacao,  async (req, res) => {
  console.log("Rota PUT /usuario solicitada");
  try {
    const usuario = await selectUsuario(req.body.idusuario);
    if (usuario.length > 0) {
      await updateUsuario(req.body);
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

router.delete("/usuario/:id", verificarAutenticacao, async (req, res) => {
  console.log("Rota DELETE /usuario solicitada");
  // req.userId
  console.log(req.userId)
  try {
    if (req.body.userId != req.params.id){
        const error = new Error ("Você não pode excluir este usuário");
        throw error;
    }
    await deleteUsuario(req.params.id);
    res.status(200).json({ message: "Usuário excluido com sucesso!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

export default router;
