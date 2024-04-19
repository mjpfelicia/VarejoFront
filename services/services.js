const axios = require("axios");

module.exports = class Services {
  static async UsuarioLogin(req, res) {
    let valores = req.body;
    const options = {
      url: "https://e8c1e9d8-f06f-4f1b-a55e-08acf7f6f3ba-00-kwezu25ibtok.kirk.replit.dev:3001/login",
      method: "POST",
      data: valores,
    };
    axios(options)
      .then((sucesso) => {
        console.info({ sucesso });
        const mensagem = "Login realizado com sucesso!";
        res.render("logado");
      })
      .catch((falhou) => {
        console.error({ falhou });
      });
  }

  static async UsuarioCreate(req, res) {
    let valores = req.body;
    const options = {
      url: "https://e8c1e9d8-f06f-4f1b-a55e-08acf7f6f3ba-00-kwezu25ibtok.kirk.replit.dev:3001/usuarios/Cadastrar",
      method: "POST",
      data: valores,
    };
    axios(options);
    const mensagem = "Cadastro realizado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // create produto
  static async ProdutoCreate(req, res) {
    let valores = req.body;
    const options = {
      url: "https://e8c1e9d8-f06f-4f1b-a55e-08acf7f6f3ba-00-kwezu25ibtok.kirk.replit.dev:3001/produtos/Cadastrar",
      method: "POST",
      data: valores,
    };
    axios(options);
    const mensagem = "Produto cadastrado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // listar produto
  static async ProdutoListar(req, res) {
    const options = {
      url: "https://e8c1e9d8-f06f-4f1b-a55e-08acf7f6f3ba-00-kwezu25ibtok.kirk.replit.dev:3001/produtos",
      method: "GET",
      data: {},
    };
    axios(options).then((response) => {
      console.log(response.data);

      const produto = response.data;
      console.log(produto);
      const mensagem = "Lista de produtos!";
      res.render("produtos/listar", { produto, mensagem });
    });
  }

  // cookies
  static async CarrinhoAdicionar(req, res) {
    const item = {
      id: req.params.id,
      nome: req.params.nome,
    };
    // Verificando se já existe um cookie para o carrinho
    if (req.cookies.carrinho) {
      // Se já existe, adiciona o novo item
      const carrinho = JSON.parse(req.cookies.carrinho);
      carrinho.push(item);
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
    } else {
      // Se não existe, cria um novo carrinho com o item
      const carrinho = [item];
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
    }
    res.send("item adicionado ao carrinho");
  }

  // Rota para remover um itedo carrinho
  static async CarrinhoRemoverItem(req, res) {
    const itemDeletar = req.params.item;
    if (req.cookies.carrinho) {
      const carrinho = JSON.parse(req.cookies.carrinho);

      const novoCarrinho = carrinho.filter((item) => item.id !== itemDeletar);
      res.cookie("carrinho", JSON.stringify(novoCarrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.send("Itemremovido do carrinho");
    } else {
      res.send("Carrinho vazio");
    }
  }

  //listar carrinho
  static async CarrinhoListar(req, res) {
    // Rota para exibir o carrinho
    if (req.cookies.carrinho) {
      const carrinho = JSON.parse(req.cookies.carrinho);
      res.render("carrinhos/Listar", { carrinho });
    } else {
      res.send("Carrinho vazio");
    }
  }
};
