class CaixaDaLanchonete {
    msgErro = "";
    resultado = "Calcular";
    metodoDePagamento = "";
    codigo = "";
    quantidade = 0;
    total = 0;
    erro = true;
    itens = [];
    fatorMultiplicador = 1;
    encontrarItemPrincipalParaChantily = true;
    encontrarItemPrincipalParaQueijo = true;
    encontrarItem = true;

    calcularValorDaCompra(metodoDePagamento, itens) {

        this.metodoDePagamento = metodoDePagamento;
        this.itens = itens;

        this.codigoItem = itens[0];
        this.verificaMetodoDePagamento();
        this.verificaItemPedido();
        this.verificaErro();
        return this.resultado;
    }

    //Funciona
    verificaErro() {
        if ("" != this.msgErro) {
            this.resultado = this.msgErro;
        } else {
            if (this.total === 0.00) {
                this.resultado = "Não há itens no carrinho de compra!";
            }
            this.resultado = `R$ ${this.total}`;
            this.resultado = this.resultado.replace(".", ",");
        }
    }

    //Funciona
    verificaMetodoDePagamento() {
        switch (this.metodoDePagamento) {
            case 'dinheiro':
                this.fatorMultiplicador = 0.95;
                break;

            case 'credito':
                this.fatorMultiplicador = 1.03;
                break;
            case 'debito':
                this.fatorMultiplicador = 1;
                break;
            default:
                if (this.msgErro === "") {
                    this.msgErro = "Forma de pagamento inválida!";
                }
                break;
        }

    }


    verificaItemPedido() {
        const itensDoPedido = [
            'cafe,Café,3',
            'chantily,Chantily (extra do Café),1.50',
            'suco,Suco Natural,6.20',
            'sanduiche,Sanduíche,6.50',
            'queijo,Queijo (extra do Sanduíche),2.00',
            'salgado,Salgado,7.25',
            'combo1,1 Suco e 1 Sanduíche,9.50',
            'combo2,1 Café e 1 Sanduíche,7.50'
        ];

        if (this.itens.length === 0 && this.msgErro === "") {
            this.msgErro = "Não há itens no carrinho de compra!";
        }

        for (let i = 0; i < this.itens.length; i++) {
            this.item = this.itens[i].split(',');
            this.codigo = this.item[0];
            this.quantidade = parseInt(this.item[1]);

            if (this.codigo === "queijo") {
                for (let ii = 0; ii < this.itens.length; ii++) {

                    let itemp = this.itens[ii].split(',');
                    let codigop = itemp[0];
                    if ("sanduiche" === codigop) {
                        this.encontrarItemPrincipalParaChantily = false;
                    }

                }
                if (this.encontrarItemPrincipalParaChantily && this.msgErro === "") {
                    this.msgErro = "Item extra não pode ser pedido sem o principal";
                }
            }
            if (this.codigo === "chantily") {
                for (let ii = 0; ii < this.itens.length; ii++) {

                    let itemp = this.itens[ii].split(',');
                    let codigop = itemp[0];
                    if ("cafe" === codigop) {
                        this.encontrarItemPrincipalParaChantily = false;
                    }

                }
                if (this.encontrarItemPrincipalParaChantily && this.msgErro === "") {
                    this.msgErro = "Item extra não pode ser pedido sem o principal";
                }
            }

            for (const itemPedido of itensDoPedido) {
                const [codigoPedido, descricao, valor] = itemPedido.split(',');


                if (this.codigo === codigoPedido) {
                    this.erro = false;
                    this.total += parseFloat(valor) * parseInt(this.quantidade);
                }
                if (this.quantidade === 0 && this.msgErro === "") {
                    this.msgErro = "Quantidade inválida!";
                }
            }
        }

        if (this.erro && this.msgErro === "") {
            this.msgErro = "Item inválido!";
        }

        this.total = (this.total * this.fatorMultiplicador).toFixed(2);
    }
}

export { CaixaDaLanchonete };
