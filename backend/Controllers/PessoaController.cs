/**
 * Módulo: PessoaController (Camada de Exposição API)
 * Função: Este controlador gerencia as solicitações externas relacionadas à 
 * entidade "Pessoa". Atua como intermediário entre o Frontend e a 
 * lógica de negócio, permitindo listar os residentes registrados, criar novos 
 * perfis e excluir registros existentes através da comunicação com o 
 * PessoaService. É fundamental para manter a base de usuários sobre a qual 
 * se vinculam os movimentos financeiros do sistema.
 */
using ControleGastos.Backend.Dtos;
using ControleGastos.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaService _service;

        public PessoaController(PessoaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Listar() =>
            Ok(await _service.ListarAsync());

        [HttpPost]
        public async Task<IActionResult> Criar(PessoaDto dto)
        {
            var pessoa = await _service.CriarAsync(dto);
            return Ok(pessoa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            bool ok = await _service.DeletarAsync(id);
            return ok ? Ok() : NotFound();
        }
    }
}
