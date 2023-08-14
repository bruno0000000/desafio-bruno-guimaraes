class CaixaDaLanchonete {
    msgErro = "";
    resultado = "";
    metodoDePagamento = "";
    codigo = "";
    quantidade = 0;
    total = 0;
    erro = true;
    itens = [];
    fatorMultiplicador = 1;
    encontrarErroItemExtra = true;
    encontrarItem = true;

    calcularValorDaCompra(metodoDePagamento, itens) {
        this.metodoDePagamento = metodoDePagamento;
        this.itens = itens;

        this.verificarMetodoDePagamento();
        this.verificarItemPedido();
        this.verificarErro();
        return this.resultado;
    }

    verificarErro() {
        if ("" != this.msgErro) {
            this.resultado = this.msgErro;
        } else {
            this.resultado = `R$ ${this.total}`;
            this.resultado = this.resultado.replace(".", ",");
        }
    }

    verificarMetodoDePagamento() {
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

    verificarItemPedido() {
        const cardapio = this.obterCardapio();
        this.verificarCarrinhoVazio();

        for (let i = 0; i < this.itens.length; i++) {
            this.item = this.itens[i].split(',');
            this.codigo = this.item[0];
            this.quantidade = parseInt(this.item[1]);

            this.verificarItemExtra("queijo", "sanduiche");
            this.verificarItemExtra("chantily", "cafe");

            for (const itemPedido of cardapio) {
                const [codigoPedido, descricao, valor] = itemPedido.split(',');

                this.buscarPrecoDoPedido(codigoPedido, valor);
                this.verificarQuantidadeValida();
            }
        }
        this.verificarItemInvalido();
        this.total = (this.total * this.fatorMultiplicador).toFixed(2);
    }

    verificarItemExtra(itemExtra, itemPrincipal) {
        if (this.codigo === itemExtra) {
            for (let indice = 0; indice < this.itens.length; indice++) {
                let itemProdutoExtra = this.itens[indice].split(',');
                let codigoPrincipal = itemProdutoExtra[0];
                if (itemPrincipal === codigoPrincipal) {
                    this.encontrarErroItemExtra = false;
                }
            }
            if (this.encontrarErroItemExtra && this.msgErro === "") {
                this.msgErro = "Item extra não pode ser pedido sem o principal";
            }
        }
    }

    buscarPrecoDoPedido(codigoPedido, valor) {
        if (this.codigo === codigoPedido) {
            this.erro = false;
            this.total += parseFloat(valor) * parseInt(this.quantidade);
        }
    }

    verificarQuantidadeValida() {
        if (this.quantidade === 0) {
            this.msgErro = "Quantidade inválida!";
        }
    }

    verificarItemInvalido() {
        if (this.erro && this.msgErro === "") {
            this.msgErro = "Item inválido!";
        }
    }

    obterCardapio() {
        return [
            'cafe,Café,3',
            'chantily,Chantily (extra do Café),1.50',
            'suco,Suco Natural,6.20',
            'sanduiche,Sanduíche,6.50',
            'queijo,Queijo (extra do Sanduíche),2.00',
            'salgado,Salgado,7.25',
            'combo1,1 Suco e 1 Sanduíche,9.50',
            'combo2,1 Café e 1 Sanduíche,7.50'
        ];
    }

    verificarCarrinhoVazio() {
        if (this.itens.length === 0 && this.msgErro === "") {
            this.msgErro = "Não há itens no carrinho de compra!";
        }
    }
}

export { CaixaDaLanchonete };