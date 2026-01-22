/**
 * Módulo: Program (Ponto de Entrada da Aplicação)
 * Função: Este é o arquivo principal que inicializa o servidor web. Ele configura o 
 * pipeline de execução da aplicação, onde são registrados os serviços essenciais (CORS 
 * para permitir o acesso do React, Injeção de Dependência para os Services e a 
 * configuração do Banco de Dados SQLite). Além disso, ativa o Swagger para 
 * documentação da API e mapeia as rotas dos controllers, garantindo que o 
 * backend esteja pronto para processar as requisições do frontend.
 */
using ControleGastos.Backend.Data;
using ControleGastos.Backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Definir la política
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173") // El puerto de tu React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Registrar Servicios
builder.Services.AddControllers();
builder.Services.AddScoped<PessoaService>();
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<TransacaoService>();

// Registrar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar DbContext con SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=controle_gastos.db"));


var app = builder.Build();

app.UseCors("AllowReact"); // Esto debe ir después de app.Build() y antes de MapControllers()

// Activar Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
