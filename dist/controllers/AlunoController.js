"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _foto = require('../models/foto'); var _foto2 = _interopRequireDefault(_foto);

class alunoController {
  async index(req, res){
    const alunos = await _aluno2.default.findAll({
      attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
      order: [["id", "DESC"], [_foto2.default, "id", "DESC"]],
      include: {
        model: _foto2.default,
        attributes: ["url", "filename"],
      }
    })
    res.json(alunos)
  }

  async store(req, res){
    try {

      const aluno = await _aluno2.default.create(req.body)

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

      const aluno = await _aluno2.default.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [["id", "DESC"], [_foto2.default, "id", "DESC"]],
        include: {
          model: _foto2.default,
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

      const aluno = await _aluno2.default.findByPk(id)

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

      const aluno = await _aluno2.default.findByPk(id)

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

exports. default = new alunoController()
