# Trabalho Prático Módulo 4 - Bootcamp fullstack

## ENUNCIADO

1. O aluno deverá implementar uma API integrada ao MongoDB Atlas cujo o schema dos dados será definido pelo mongoose. Esta API terá alguns endpoints para manipulação dos dados.O aluno deverá baixar o arquivo com os dados para a carga inicial na base de dados e desempenhar as seguintes atividades:

   - O aluno deverá baixar o arquivo com os dados para a carga inicial na base de dados e desempenhar as seguintes atividades.
   - Implementar um modelo (schema) para esta coleção, considerando que todos oscampos são requeridos e o campo balance não pode ser menor que 0.
   - Criar o projeto my-bank-api para implementação dos endpoints.
   - Crie um endpoint para registrar um depósito em uma conta. Este endpoint deverá receber como parâmetros a “agencia”, o número da conta e o valor do depósito. Ele deverá atualizar o “balance” da conta, incrementando-o com o valor recebido como parâmetro. O endpoint deverá validar se a conta informada existe, caso não exista deverá retornar um erro, caso exista retornar o saldo atual da conta.
   - Crie um endpoint para registrar um saque em uma conta. Este endpoint deverá receber como parâmetros a “agência”, o número da conta e o valor do saque. Ele deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com parâmetro e cobrando uma tarifa de saque de (1). O endpoint deverá validar se a conta informada existe, caso não exista deverá retornar um erro, caso exista retornar o saldo atual da conta. Também deverá validar se a conta possui saldo suficiente para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que o saque fique negativo.
   - Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber como parâmetro a “agência” e o número da conta, e deverá retornar seu “balance”. Caso a conta informada não exista, retornar um erro
   - Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber como parâmetro a “agência” e o número da conta, e deverá retornar seu “balance”. Caso a conta informada não exista, retornar um erro
   - Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber como parâmetro a “agência” e o número da conta, e deverá retornar seu “balance”. Caso a conta informada não exista, retornar um erro
   - Crie um endpoint para consultar a média do saldo dos clientes de determinada agência. O endpoint deverá receber como parâmetro a “agência” e deverá retornar o balance médio da conta.
   - Crie um endpoint para consultar a média do saldo dos clientes de determinada agência. O endpoint deverá receber como parâmetro a “agência” e deverá retornar o balance médio da conta.
   - Crie um endpoint para consultar os clientes mais ricos do banco. O endpoint deverá receber como parâmetro um valor numérico para determinar a quantidade de clientes a serem listados, e o endpoint deverá retornar em ordem decrescente pelo saldo, crescente pelo nome, a lista dos clientes (agência, conta, nome e saldo)
   - Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada agência para a agência private agencia=99. O endpoint deverá retornar a lista dos clientes da agencia private.
