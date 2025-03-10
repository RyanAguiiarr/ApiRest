import Aluno from "../models/aluno"
import Foto from "../models/foto"

class alunoController {
  async index(req, res){
    const alunos = await Aluno.findAll({
      attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
      order: [["id", "DESC"], [Foto, "id", "DESC"]],
      include: {
        model: Foto,
        attributes: ["url", "filename"],
      }
    })
    res.json(alunos)
  }

  async store(req, res){
    try {

      const aluno = await Aluno.create(req.body)

      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async show(req, res){
    try {
      const {id} = req.params
      if(!id){
        return res.status(400).json({
          errors: ["faltando ID"],
        })
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [["id", "DESC"], [Foto, "id", "DESC"]],
        include: {
          model: Foto,
          attributes: ["url", "filename"]
        }
      })

      if(!aluno){
        return res.status(400).json({
          errors: ["Aluno não existe."],
        })
      }

      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async delete(req, res){
    try {
      const {id} = req.params
      if(!id){
        return res.status(400).json({
          errors: ["faltando ID"],
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno){
        return res.status(400).json({
          errors: ["Aluno não existe."],
        })
      }

      await aluno.destroy()
      return res.json({
        apagado: "aluno apagado com sucesso.",
      })
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async update(req, res){
    try {
      const {id} = req.params
      if(!id){
        return res.status(400).json({
          errors: ["faltando ID"],
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno){
        return res.status(400).json({
          errors: ["Aluno não existe."],
        })
      }

      const alunoAtualizado = await aluno.update(req.body)

      return res.json(alunoAtualizado)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

export default new alunoController()
