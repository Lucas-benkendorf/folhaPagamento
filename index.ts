import Funcionario from "./class/Funcionario";


const funcionarios = [];


function adicionarFuncionario(id, nome, cargo, taxaHoraria) {
    
    const funcionario = new Funcionario(id, nome, cargo, taxaHoraria);
    
    funcionarios.push(funcionario);
}


adicionarFuncionario(1, 'Carlos Silva', 'Desenvolvedor', 50);
adicionarFuncionario(2, 'Ana Santos', 'Designer', 45);
adicionarFuncionario(3, 'João Pereira', 'Gerente', 60);


console.log(funcionarios);

// EXERCICIO registrando horas do funcionario

function registrarHoras(funcionario, horas) {
    if (funcionario instanceof Funcionario) {
        funcionario.registrarHoras(horas);
        console.log(`Horas registradas com sucesso para ${funcionario.nome}`);
    } else {
        console.log('Erro: O objeto fornecido não é um funcionário válido.');
    }
}


const funcionario1 = funcionarios.find(f => f.id === 1); 
const funcionario2 = funcionarios.find(f => f.id === 2); 

registrarHoras(funcionario1, 8);
registrarHoras(funcionario2, 6); 
registrarHoras(funcionario1, 7); 


console.log(funcionarios);


// EXERCICIO  calcular salario mensal


function calcularSalarioMensal(funcionario) {
    if (funcionario instanceof Funcionario) {
        const salarioMensal = funcionario.calcularSalarioMensal();
        console.log(`Salário mensal de ${funcionario.nome}: R$${salarioMensal.toFixed(2)}`);
        return salarioMensal;
    } else {
        console.log('Erro: O objeto fornecido não é um funcionário válido.');
        return 0;
    }
}

const funcionarioCarlos = funcionarios.find(f => f.id === 1); 
const funcionarioAna = funcionarios.find(f => f.id === 2);    

if (!funcionarioCarlos || !funcionarioAna) {
    console.error("Funcionários não encontrados. Certifique-se de que foram adicionados corretamente.");
} else {
    
    calcularSalarioMensal(funcionarioCarlos); 
    calcularSalarioMensal(funcionarioAna);    
}

// EXERCICIO calcular INSS


function calcularInss(funcionario) {
    if (funcionario instanceof Funcionario) {
        const salarioBruto = funcionario.calcularSalarioMensal(); 
        const tetoInss = 908.85; 
        const porcentagemInss = 0.14; 

        const valorInss = Math.min(salarioBruto * porcentagemInss, tetoInss); 
        console.log(`INSS para ${funcionario.nome}: R$${valorInss.toFixed(2)}`);
        return valorInss;
    } else {
        console.log('Erro: O objeto fornecido não é um funcionário válido.');
        return 0;
    }
}


const funcionarioCarlosInss = funcionarios.find(f => f.id === 1); 
const funcionarioAnaInss = funcionarios.find(f => f.id === 2); 

calcularInss(funcionarioCarlosInss); 
calcularInss(funcionarioAnaInss); 

// EXERCICIO gerar Relatorio de pagamanto

function gerarRelatorioPagamento() {
    console.log("Relatório de Pagamento:");
    console.log("========================");

    funcionarios.forEach(funcionario => {
        if (funcionario instanceof Funcionario) {
            const salarioBruto = funcionario.calcularSalarioMensal();
            const valorInss = calcularInss(funcionario); 
            const salarioLiquido = salarioBruto - valorInss;
            const totalHoras = funcionario.horasTrabalhadas.reduce((total, horas) => total + horas, 0);

            
            console.log(`Nome: ${funcionario.nome}`);
            console.log(`Cargo: ${funcionario.cargo}`);
            console.log(`Total de Horas: ${totalHoras}`);
            console.log(`Valor do INSS: R$${valorInss.toFixed(2)}`);
            console.log(`Salário Bruto: R$${salarioBruto.toFixed(2)}`);
            console.log(`Salário Líquido: R$${salarioLiquido.toFixed(2)}`);
            console.log("========================");
        } else {
            console.error("Erro: Objeto não é uma instância da classe Funcionario.");
        }
    });
}


gerarRelatorioPagamento();


// EXERCICIO gerar folha de pagamento

const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function gerenciarFolhaPagamento() {
    console.log("=== Sistema de Folha de Pagamento ===");

    function exibirMenu() {
        console.log("\nSelecione uma opção:");
        console.log("1. Adicionar funcionário");
        console.log("2. Registrar horas trabalhadas");
        console.log("3. Exibir relatório de pagamento");
        console.log("4. Sair");

        rl.question("Digite o número da opção desejada: ", (opcao) => {
            switch (opcao) {
                case "1":
                    adicionarFuncionarioPrompt();
                    break;
                case "2":
                    registrarHorasPrompt();
                    break;
                case "3":
                    gerarRelatorioPagamento();
                    exibirMenu();
                    break;
                case "4":
                    console.log("Encerrando o sistema...");
                    rl.close();
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    exibirMenu();
                    break;
            }
        });
    }

    
    function adicionarFuncionarioPrompt() {
        rl.question("Digite o ID do funcionário: ", (id) => {
            rl.question("Digite o nome do funcionário: ", (nome) => {
                rl.question("Digite o cargo do funcionário: ", (cargo) => {
                    rl.question("Digite a taxa horária do funcionário: ", (taxaHoraria) => {
                        const funcionario = new Funcionario(
                            parseInt(id),
                            nome,
                            cargo,
                            parseFloat(taxaHoraria)
                        );
                        funcionarios.push(funcionario);
                        console.log(`Funcionário ${nome} adicionado com sucesso!`);
                        exibirMenu();
                    });
                });
            });
        });
    }

   
    function registrarHorasPrompt() {
        rl.question("Digite o ID do funcionário: ", (id) => {
            const funcionario = funcionarios.find((f) => f.id === parseInt(id));
            if (funcionario) {
                rl.question("Digite a quantidade de horas trabalhadas: ", (horas) => {
                    funcionario.registrarHoras(parseFloat(horas));
                    console.log(`Horas registradas para o funcionário ${funcionario.nome}`);
                    exibirMenu();
                });
            } else {
                console.log("Funcionário não encontrado. Tente novamente.");
                exibirMenu();
            }
        });
    }

    exibirMenu();
}


gerenciarFolhaPagamento();








