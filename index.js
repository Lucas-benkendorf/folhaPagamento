const funcionarios = [];
function adicionarFuncionario(id, nome, cargo, taxaHoraria) {
    const funcionario = {
        id,
        nome,
        cargo,
        taxaHoraria,
        horasTrabalhadas: []
    };
    funcionarios.push(funcionario);
}


adicionarFuncionario(1, 'Carlos Silva', 'Desenvolvedor', 50);
adicionarFuncionario(2, 'Ana Santos', 'Designer', 45);
adicionarFuncionario(3, 'João Pereira', 'Gerente', 60);

console.log(funcionarios);
