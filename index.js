const { Client } = require('pg'); //Criação de um objeto?
const client = new Client({ //Instanciando o objeto
    host: '3.137.182.83',
    port: 5434,
    database: 'postgres',
    user: 'postgres',
    password: '123456',
    options: '-c search_path=vanessa',
});

async function listar_veiculos() {
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL da AWS');
        const resultado = await client.query('select * from veiculos');
        console.log('lista de veiculos');
        console.table(resultado.rows); //Mostra o resultado em forma de tabela como no Banco de Dados;
    }
    catch (err) {
        console.error('Erro ao conectar ao DB:', err.message);
    }
    finally {
        await client.end(); //Destrava e libera o terminal caso ele trave com a função acima;
    }
}

async function criar_veiculo() {
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL da AWS');
        //Por que tem que colocar a crase mesmo?
        const query = ` 
        INSERT INTO veiculos 
        (marca, modelo, placa, chassi, renavam, cor, ano_fabricacao, capacidade_carga)
        VALUES
        ('VOLVO', 'FH', 'RTZ0Y55', '15616', '5555', 'VERMELHO', '2024', '27000')
        RETURNING id;
        `;

        const resultado = await client.query(query);
        const id_inserido = resultado.rows[0].id;
        console.log('Veiculo inserido com ID:', id_inserido);

    }
    catch (err) {
        console.error('Erro ao conectar ao DB:', err.message);
    }
    finally {
        await client.end();
    }
}

console.log('NodeDB');
//listar_veiculos(); //Deixar comentada quando já tiver executado uma vez e o Banco já estiver rodando;
criar_veiculo();