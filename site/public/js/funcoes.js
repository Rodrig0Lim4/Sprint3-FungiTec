// sessão
function cadastrar() {
    var nome = input_nome.value;
    var email = input_email.value;
    var senha = input_senha.value;
    var repetir_senha = input_repetir_senha.value;
    var setor = input_setor.value;
    var empresa = input_empresa.value;
    var codigo_empresa = 0;
    if (nome.length < 2) {
        alert('Nome Inválido!');
    }
    else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        alert('Preencha seu email corretamente!');
    }
    else if (senha.length < 8) {
        alert('Sua senha precisa ter no minimo 8 caracteres!');
    }
    else if (repetir_senha.length == 0) {
        alert('Insira sua senha novamente!');
    }
    else if (senha != repetir_senha) {
        alert('Os campos não coincidem!');
    }
    else if (setor == '') {
        alert('Insira seu setor!');
    }
    else if (empresa == "SPTech") {
        codigo_empresa = 1
    } else if (empresa == "Cogumelos da Mantiqueira") {
        codigo_empresa = 2
    } else if (empresa == "CoguLTDA") {
        codigo_empresa = 3
    }
    else{
        alert('Informe uma empresa valida!');
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            setorServer: setor,
            empresaServer: codigo_empresa
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            alert(`Cadastro realizado com sucesso! Seja bem vindo(a) ${nome}`);
            window.location.replace("./login.html");

        } else {
            alert("Houve um erro ao tentar realizar o cadastro!");
        }
    });
}

function entrar() {

    var email = input_email.value;
    var senha = input_senha.value;

    if (email == "" || senha == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
    }

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", senha);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                
                alert("Bem vindo de volta!")
                window.location.replace("./dashbord.html")
            });
        } else {
            console.log("Houve um erro ao tentar realizar o login!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

