/**
 * Módulo: CategoriaController (Camada de Exposição API)
 * Função: Este controlador atua como o ponto de entrada para todas as operações 
 * relacionadas às categorias de gastos e receitas. Sua responsabilidade é gerenciar 
 * as requisições HTTP (GET, POST, DELETE, PUT) e delegar a lógica de negócio para a 
 * camada de serviço (CategoriaService). Permite a listagem, criação, edição e a 
 * exclusão controlada de categorias, retornando os códigos de status HTTP adequados.
 */
using ControleGastos.Backend.Dtos;
using ControleGastos.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _service;

        public CategoriaController(CategoriaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Listar() =>
            Ok(await _service.ListarAsync());

        [HttpPost]
        public async Task<IActionResult> Criar(CategoriaDto dto)
        {
            var categoria = await _service.CriarAsync(dto);
            return Ok(categoria);
        }

        // Método para Eliminar
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var exito = await _service.EliminarAsync(id); 
            return exito ? Ok() : BadRequest("Não é possível excluir: categoria em uso.");
        }

        // Método para Editar
        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, CategoriaDto dto)
        {
            var atualizado = await _service.EditarAsync(id, dto);
            return atualizado != null ? Ok(atualizado) : NotFound();
        }
    }
}