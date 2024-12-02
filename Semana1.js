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



function calcularInss(salarioBruto) {
    const taxaInss = 0.11; 
    const tetoInss = 908.85;

    
    const descontoInss = Math.min(salarioBruto * taxaInss, tetoInss);

    return descontoInss;
}


const salarioCarlos = calcularSalarioMensal(1);
const salarioAna = calcularSalarioMensal(2);
const salarioJoao = calcularSalarioMensal(3);

console.log(`Salário de Carlos Silva com desconto de INSS: R$${(salarioCarlos - calcularInss(salarioCarlos)).toFixed(2)}`);
console.log(`Salário de Ana Santos com desconto de INSS: R$${(salarioAna - calcularInss(salarioAna)).toFixed(2)}`);
console.log(`Salário de João Pereira com desconto de INSS: R$${(salarioJoao - calcularInss(salarioJoao)).toFixed(2)}`);



function gerarRelatorioPagamento() {
    console.log('Relatório de Pagamento\n'.padEnd(50, '-'));

    funcionarios.forEach(funcionario => {
       
        const totalHoras = funcionario.horasTrabalhadas.reduce((acc, horas) => acc + horas, 0);
        const salarioBruto = totalHoras * funcionario.taxaHoraria;
        const descontoInss = calcularInss(salarioBruto);
        const salarioLiquido = salarioBruto - descontoInss;

        
        console.log(`Nome: ${funcionario.nome}`);
        console.log(`Cargo: ${funcionario.cargo}`);
        console.log(`Total de Horas: ${totalHoras}`);
        console.log(`Valor do INSS: R$ ${descontoInss.toFixed(2)}`);
        console.log(`Salário Bruto: R$ ${salarioBruto.toFixed(2)}`);
        console.log(`Salário Líquido: R$ ${salarioLiquido.toFixed(2)}\n`);
    });
}


gerarRelatorioPagamento();


const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function gerenciarFolhaPagamento() {
    console.log('\nSistema de Folha de Pagamento');
    console.log('1. Adicionar Funcionário');
    console.log('2. Registrar Horas Trabalhadas');
    console.log('3. Exibir Relatório de Pagamento');
    console.log('4. Sair');

    rl.question('\nEscolha uma opção: ', opcao => {
        switch (opcao) {
            case '1':
                rl.question('Digite o ID do funcionário: ', id => {
                    rl.question('Digite o nome do funcionário: ', nome => {
                        rl.question('Digite o cargo do funcionário: ', cargo => {
                            rl.question('Digite a taxa horária do funcionário: ', taxa => {
                                adicionarFuncionario(parseInt(id), nome, cargo, parseFloat(taxa));
                                console.log('Funcionário adicionado com sucesso!');
                                gerenciarFolhaPagamento();
                            });
                        });
                    });
                });
                break;

            case '2':
                rl.question('Digite o ID do funcionário: ', id => {
                    rl.question('Digite as horas trabalhadas: ', horas => {
                        registrarHoras(parseInt(id), parseFloat(horas));
                        console.log('Horas registradas com sucesso!');
                        gerenciarFolhaPagamento();
                    });
                });
                break;

            case '3':
                gerarRelatorioPagamento();
                gerenciarFolhaPagamento();
                break;

            case '4':
                console.log('Saindo do sistema...');
                rl.close();
                break;

            default:
                console.log('Opção inválida. Tente novamente.');
                gerenciarFolhaPagamento();
                break;
        }
    });
}


gerenciarFolhaPagamento();


