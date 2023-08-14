import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 13,39', ['cafe,1', 'sanduiche,1', 'queijo,1',"chantily,1"]],
        ['debito', 'R$ 13,00', ['cafe,1', 'sanduiche,1', 'queijo,1',"chantily,1"]],
        ['dinheiro', 'R$ 12,35', ['cafe,1', 'sanduiche,1', 'queijo,1',"chantily,1"]],
    ])('compra de 4 itens sendo 2 extras e 2 principais em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 14,94', ['cafe,1', 'sanduiche,1', 'queijo,1',"chantily,2"]],
        ['debito', 'R$ 15,00', ['cafe,1', 'sanduiche,1', 'queijo,2',"chantily,1"]],
        ['dinheiro', 'R$ 13,77', ['cafe,1', 'sanduiche,1', 'queijo,1',"chantily,2"]],
    ])('compra de 5 itens sendo 2 principais e 3 extras em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 16,48', ['cafe,2', 'sanduiche,1', 'queijo,1',"chantily,1"]],
        ['debito', 'R$ 19,50', ['cafe,1', 'sanduiche,2', 'queijo,1',"chantily,1"]],
        ['dinheiro', 'R$ 15,20', ['cafe,2', 'sanduiche,1', 'queijo,1',"chantily,1"]],
    ])('compra de 5 itens sendo 3 principais e 2 extras em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 9,27', ['cafe,1', 'chantily,2','chantily,2']],
        ['debito', 'R$ 14,50', ['sanduiche,1', 'queijo,2','queijo,2']],
        ['dinheiro', 'R$ 8,55', ['cafe,1',"chantily,2","chantily,2"]],
    ])('compra de 5 itens sendo 1 principail e 4 extras em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
});
