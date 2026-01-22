/**
 * Módulo: TransacaoController (Camada de Exposição API)
 * Função: Este controlador é o responsável por gerenciar as operações de entrada 
 * e saída para as transações financeiras. Implementa um padrão REST API e utiliza 
 * injeção de dependência para se comunicar com o 'TransacaoService'. Seu papel principal 
 * é receber as solicitações de criação, listagem e exclusão de movimentações, 
 * garantindo que as respostas HTTP reflitam o resultado das validações das 
 * regras de negócio (como a idade mínima para receitas ou a compatibilidade de 
 * categorias) executadas na camada de serviço.
 */
using ControleGastos.Backend.Dtos;
using ControleGastos.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Backend.Controllers
{
    /**
     * Controller de Transações
     * Padrão: REST API com Injeção de Dependência.
     */
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacaoController(TransacaoService service)
        {
            _service = service; // Injeção de dependência para desacoplamento
        }

        [HttpGet]
        public async Task<IActionResult> Listar() => Ok(await _service.ListarAsync());

        [HttpPost]
        public async Task<IActionResult> Criar(TransacaoDto dto)
        {
            var erro = await _service.CriarAsync(dto); // Valida idade e categoria no Service
            return erro == null ? Ok() : BadRequest(erro);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sucesso = await _service.ExcluirAsync(id);
            return sucesso ? NoContent() : NotFound();
        }
    }
}
