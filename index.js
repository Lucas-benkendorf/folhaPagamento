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




function registrarHoras(id, horas) {

    const funcionario = funcionarios.find(func => func.id === id);

    if (funcionario) {
        
        funcionario.horasTrabalhadas.push(horas);
    } else {
        console.log(`Funcionário com ID ${id} não encontrado.`);
    }
}


registrarHoras(1, 8);  
registrarHoras(2, 6);  
registrarHoras(1, 7);  
registrarHoras(3, 5);  


console.log(funcionarios);




function calcularSalarioMensal(id) {

    const funcionario = funcionarios.find(func => func.id === id);

    if (funcionario) {
       
        const totalHoras = funcionario.horasTrabalhadas.reduce((acc, horas) => acc + horas, 0);

       
        const salarioMensal = totalHoras * funcionario.taxaHoraria;

        return salarioMensal;
    } else {
        console.log(`Funcionário com ID ${id} não encontrado.`);
        return 0;
    }
}


console.log(`Salário mensal de Carlos Silva: R$${calcularSalarioMensal(1).toFixed(2)}`);
console.log(`Salário mensal de Ana Santos: R$${calcularSalarioMensal(2).toFixed(2)}`);
console.log(`Salário mensal de João Pereira: R$${calcularSalarioMensal(3).toFixed(2)}`);


