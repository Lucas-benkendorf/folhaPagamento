class Funcionario {
    constructor(id, nome, cargo, taxaHoraria) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.taxaHoraria = taxaHoraria;
        this.horasTrabalhadas = [];
    }

    
    registrarHoras(horas) {
        this.horasTrabalhadas.push(horas);
    }

    
    calcularSalarioMensal() {
        const totalHoras = this.horasTrabalhadas.reduce((acc, horas) => acc + horas, 0);
        return totalHoras * this.taxaHoraria;
    }
}


const funcionario1 = new Funcionario(1, 'Carlos Silva', 'Desenvolvedor', 50);
const funcionario2 = new Funcionario(2, 'Ana Santos', 'Designer', 45);


funcionario1.registrarHoras(8);
funcionario1.registrarHoras(7);
funcionario2.registrarHoras(6);


console.log(`Salário mensal de ${funcionario1.nome}: R$${funcionario1.calcularSalarioMensal().toFixed(2)}`);
console.log(`Salário mensal de ${funcionario2.nome}: R$${funcionario2.calcularSalarioMensal().toFixed(2)}`);


export default Funcionario;