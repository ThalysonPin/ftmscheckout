import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import Pix from "./assets/util/Pix";
import QRCode from "qrcode";


export default function App() {
  const [payload, setPayload] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [amount, setAmount] = useState(0);

  const handleGeneratePayload = () => {
    setPayload(getPayload());
  };

  const [pagamento, setPagamento] = useState(false);

  const [pagador, setPagador] = useState("");
  const [sub, setSub] = useState("N");

  const handlePagador = (e) => {
    setPagador(e.target.value);
  };

  const [camiseta, setCamiseta] = useState("");

  const handleCamiseta = (e) => {
    setCamiseta(e.target.value);
  };

  const [nome, setNome] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
  };

  const [sobrenome, setSobrenome] = useState("");

  const handleSobrenome = (e) => {
    setSobrenome(e.target.value);
  };

  const [filiado, setFiliado] = useState("N");

  const handleFiliado = (e) => {
    setFiliado(e.target.value);
  };

  const [proA, setProA] = useState("N");

  const [proAValue, setProAValue] = useState(0);

  const handleProA = (e) => {
    setProA(e.target.value);
  };

  const [category1, setCategory1] = useState("N");
  const [category1Value, setCategory1Value] = useState(0);

  const [category2, setCategory2] = useState("N");
  const [category2Value, setCategory2Value] = useState(0);

  const [category3, setCategory3] = useState("N");
  const [category3Value, setCategory3Value] = useState(0);

  // Função para determinar o preço com base na categoria e se é filiado

  useEffect(() => {
    // Define o preço para a primeira inscrição
    if (category1 === "Sub14 Mista") {
      setCategory1Value(filiado === "N" ? 80 : 70);
    } else if (
      category1 === "ProA Masculina" ||
      category1 === "ProA Feminino"
    ) {
      setCategory1Value(filiado === "N" ? 150 : 130);
    } else if (category1 === "ProA Mista") {
      setCategory1Value(filiado === "N" ? 130 : 110);
    } else if (category1 === "N") {
      setCategory1Value(0);
    } else if (sub === "S") {
      setCategory1Value(filiado === "N" ? 80 : 70);
    } else {
      // Assume "Acima de 14 anos" como padrão
      setCategory1Value(filiado === "N" ? 130 : 110);
    }

    // Define o preço para a segunda inscrição
    if (category2.includes("Sub14")) {
      setCategory2Value(filiado === "N" ? 70 : 60);
    } else if (category2 === "ProA Masc" || category2 === "ProA Fem") {
      setCategory2Value(filiado === "N" ? 150 : 130);
    } else if (category2 === "ProA Mista") {
      setCategory2Value(filiado === "N" ? 130 : 110);
    } else if (category2 === "N") {
      setCategory2Value(0);
    } else if (sub === "S") {
      setCategory2Value(filiado === "N" ? 70 : 60);
    } else {
      // Assume "Acima de 14 anos" como padrão
      setCategory2Value(filiado === "N" ? 90 : 80);
    }

    // Define o preço para a terceira inscrição
    if (category3.includes("Sub14")) {
      setCategory3Value(filiado === "N" ? 60 : 50);
    } else if (category3 === "ProA Masc" || category3 === "ProA Fem") {
      setCategory3Value(filiado === "N" ? 150 : 130);
    } else if (category3 === "ProA Mista") {
      setCategory3Value(filiado === "N" ? 130 : 110);
    } else if (category3 === "N") {
      setCategory3Value(0);
    } else if (sub === "S") {
      setCategory3Value(filiado === "N" ? 60 : 50);
    } else {
      // Assume "Acima de 14 anos" como padrão
      setCategory3Value(filiado === "N" ? 70 : 60);
    }
  }, [category1, filiado, category2, category3]);

  const handleCategory = (e) => {
    setCategory1(e.target.value);
  };

  const [inscricao1, setInscricao1] = useState(0);

  const handleInscricao1 = (e) => {
    setInscricao1(e.target.value);
  };

  // SEGUNDA INSCRIÇÃO

  const [inscricao2, setInscricao2] = useState(0);

  const handleInscricao2 = (e) => {
    setInscricao2(e.target.value);
  };

  // TERCEIRA INSCRIÇÃO

  const [inscricao3, setInscricao3] = useState(0);
  const handleInscricao3 = (e) => {
    setInscricao3(e.target.value);
  };

  // DADOS DO PIX
  const pixData = {
    pixKey: "800d04ce-3cd7-4291-a2ee-b3c9ea362013",
    description: "Pagamento do pedido",
    merchantName: "Circuitoftms",
    merchantCity: "Dourados",
    txid: "CIRCUITOFTMS2024A1",
    amount: category1Value + category2Value + category3Value,
  };

  function Submit(e) {
    e.preventDefault();

    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);

    formDatab.append("StatusPagamento", "Pendente");
    formDatab.append("Valor", category1Value + category2Value + category3Value);


    fetch(
      "https://script.google.com/macros/s/AKfycbz316iJC0T0McuLfAUnbAL4BiHUdFtTGFf2IujqSUNq9UA7vWRrX8pjPJRtspHjNLh4/exec",
      {
        method: "POST",
        body: formDatab,
      }
    )
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  const { getPayload } = Pix(pixData);

  useEffect(() => {
    if (payload) {
      QRCode.toDataURL(payload, {
        errorCorrectionLevel: "H",
      })
        .then((url) => {
          setQrCodeUrl(url);
        })
        .catch((err) => {
          console.error("Error generating QR code", err);
        });
    }
  }, [payload]);

  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    // Abrir o Snackbar assim que o componente é montado
    setOpenSnack(true);

    // Configurar o timer para fechar o Snackbar após 3 segundos
    const timer = setTimeout(() => {
      setOpenSnack(false);
    }, 10000);

    // Limpar o timer caso o componente seja desmontado antes do tempo
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [openSnack2, setOpenSnack2] = useState(false);

  useEffect(() => {
    // Abrir o Snackbar assim que o componente é montado
    setOpenSnack2(true);

    // Configurar o timer para fechar o Snackbar após 3 segundos
    const timer = setTimeout(() => {
      setOpenSnack2(false);
    }, 7000);

    // Limpar o timer caso o componente seja desmontado antes do tempo
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [openSnackPayload, setOpenSnackPayload] = useState(false);






  const handleCopyPayload = () => {
    if (payload) {
      // Criar um textarea temporário para o texto a ser copiado
      const textarea = document.createElement("textarea");
      textarea.value = payload; // Define o valor para o payload
      document.body.appendChild(textarea); // Adiciona o textarea ao body do documento
      textarea.select(); // Seleciona o conteúdo do textarea

      try {
        const successful = document.execCommand("copy"); // Executa o comando de cópia
        if (successful) {
            setOpenSnackPayload(true); // Ativa a notificação de sucesso
            setOpenSnack2(false); // Ativa outra ação de estado, por exemplo
        } else {
            alert("Falha ao copiar o pix copia e cola, reinicie a página e tente novamente. Se o problema persistir entre em contato conosco.");
        }
    } catch (err) {
        alert("Falha ao copiar o pix copia e cola, reinicie a página e tente novamente. Se o problema persistir entre em contato conosco.");
    }
    
      document.body.removeChild(textarea); // Remove o textarea do body
    }
  };

  const [cidade, setCidade] = useState("");
  const handleCidade = (e) => {
    setCidade(e.target.value);
  };



  return (
    <Box
      className="form"
      component="form"
      onSubmit={(e) => Submit(e)}
      sx={{
        background: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Snackbar
        open={openSnack}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnack(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          IMPORTANTE: A inscrição só é válida ao realizar o pagamento no final!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackPayload}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackPayload(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copiado com sucesso!
        </Alert>
      </Snackbar>


      <Typography
        variant="h4"
        component="h4"
        mb="30px"
        sx={{
          color: "orange",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "1.5em",
        }}
      >
        <SportsTennisIcon sx={{ fontSize: "2rem" }} /> 
        Inscreva-se
      </Typography>
      <Stack
        spacing={2}
        alignItems="center"
        border="1px solid orange"
        sx={{ minWidth: "50vw", padding: "30px", borderRadius: "10px" }}
      >

      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
          <Select
            name="Cidade"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cidade}
            label="Cidade"
            onChange={handleCidade}
          >
            <MenuItem value="TRL1000">BT1000 - Três Lagoas</MenuItem>
            <MenuItem value="BT500" disabled>BT500 - em breve</MenuItem>
            <MenuItem value="BT1000CG" disabled>BT1000 Campo Grande - em breve</MenuItem>
            <MenuItem value="BT500CR" disabled>BT500 Costa Rica - em breve</MenuItem>
            <MenuItem value="BT500RB" disabled>BT500 Rio Brilhante - em breve</MenuItem>

          </Select>
        </FormControl>

        <TextField
          name="Nome"
          id="outlined-basic"
          label="Nome do Atleta"
          variant="outlined"
          value={nome}
          onChange={handleNome}
          fullWidth
          required
        />

        <TextField
          name="Sobrenome"
          id="outlined-basic"
          label="Sobrenome do Atleta"
          variant="outlined"
          value={sobrenome}
          onChange={handleSobrenome}
          fullWidth
          required
        />

        <TextField
          name="Numero"
          fullWidth
          id="outlined-basic"
          label="Número + DDD"
          variant="outlined"
          required
        />

        <TextField
          name="Cidade"
          fullWidth
          id="outlined-basic"
          label="Cidade"
          variant="outlined"
          required
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filiação</InputLabel>
          <Select
            name="Filiado"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filiado}
            label="Filiação"
            onChange={handleFiliado}
          >
            <MenuItem value="N">Não sou filiado</MenuItem>
            <MenuItem value="S">Sou filiado</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Inscrição para Sub14?
          </InputLabel>
          <Select
            name="Sub14"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sub}
            label="Inscrição para Sub14?"
            onChange={(e) => setSub(e.target.value)}
          >
            <MenuItem value="N">Não é Sub14</MenuItem>
            <MenuItem value="S">É Sub14</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="grouped-select">
            Primeira Inscrição Normal
          </InputLabel>
          <Select
            defaultValue="N"
            id="grouped-select"
            value={category1}
            label="Primeira Inscrição Normal"
            onChange={handleCategory}
            name="Inscricao1"
          >
            <MenuItem value="N">
              <b>Não jogar</b>
            </MenuItem>
              <ListSubheader>
                <b>-- Sub14</b>
              </ListSubheader>
              <MenuItem value="Sub14 Mista" disabled={sub === "N" && true} >Sub14 Mista</MenuItem>
              <MenuItem value="Sub14 Masculina" disabled={sub === "N" && true}>Sub14 Masculina</MenuItem>
              <MenuItem value="Sub14 Feminino" disabled={sub === "N" && true}>Sub14 Feminino</MenuItem>
           
            <ListSubheader>
              <b>-- ProA</b>
            </ListSubheader>
            <MenuItem value="ProA Mista">ProA Mista</MenuItem>
            <MenuItem value="ProA Masculina">ProA Masculina</MenuItem>
            <MenuItem value="ProA Feminino">ProA Feminino</MenuItem>

            <ListSubheader>
              <b>-- Mista</b>
            </ListSubheader>
            <MenuItem value="Categoria A Mista">Categoria A</MenuItem>
            <MenuItem value="Categoria B Mista">Categoria B</MenuItem>
            <MenuItem value="Categoria C Mista">Categoria C</MenuItem>
            <MenuItem value="Sub18 Mista">Sub18</MenuItem>
            <MenuItem value="Mais 40 Mista">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Mista">Mais 50</MenuItem>
            <ListSubheader>
              <b>-- Masculino</b>
            </ListSubheader>
            <MenuItem value="Categoria A Masculino">Categoria A</MenuItem>
            <MenuItem value="Categoria B Masculino">Categoria B</MenuItem>
            <MenuItem value="Categoria C Masculino">Categoria C</MenuItem>
            <MenuItem value="Categoria D Masculino">Categoria D</MenuItem>
            <MenuItem value="Sub18 Masculino">Sub18</MenuItem>
            <MenuItem value="Mais 40 Masculino">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Masculino">Mais 50</MenuItem>

            <ListSubheader>
              <b>-- Feminino</b>
            </ListSubheader>
            <MenuItem value="Categoria A Feminino">Categoria A</MenuItem>
            <MenuItem value="Categoria B Feminino">Categoria B</MenuItem>
            <MenuItem value="Categoria C Feminino">Categoria C</MenuItem>
            <MenuItem value="Categoria D Feminino">Categoria D</MenuItem>
            <MenuItem value="Sub18 Feminino">Sub18</MenuItem>
            <MenuItem value="Mais 40 Feminino">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Feminino">Mais 50</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="grouped-select">
            Segunda Inscrição Normal
          </InputLabel>
          <Select
            defaultValue="N"
            id="grouped-select"
            value={category2}
            label="Segunda Inscrição Normal"
            onChange={(e) => setCategory2(e.target.value)}
            name="Inscricao2"
          >
            <MenuItem value="N">
              <b>Não jogar</b>
            </MenuItem>

            <ListSubheader>
                <b>-- Sub14</b>
              </ListSubheader>
              <MenuItem value="Sub14 Mista" disabled={sub === "N" && true} >Sub14 Mista</MenuItem>
              <MenuItem value="Sub14 Masculina" disabled={sub === "N" && true}>Sub14 Masculina</MenuItem>
              <MenuItem value="Sub14 Feminino" disabled={sub === "N" && true}>Sub14 Feminino</MenuItem>

            <ListSubheader>
              <b>-- ProA</b>
            </ListSubheader>
            <MenuItem value="ProA Mista">ProA Mista</MenuItem>
            <MenuItem value="ProA Masculina">ProA Masculina</MenuItem>
            <MenuItem value="ProA Feminino">ProA Feminino</MenuItem>

            <ListSubheader>
              <b>-- Mista</b>
            </ListSubheader>
            <MenuItem value="Categoria A Mista">Categoria A</MenuItem>
            <MenuItem value="Categoria B Mista">Categoria B</MenuItem>
            <MenuItem value="Categoria C Mista">Categoria C</MenuItem>
            <MenuItem value="Sub18 Mista">Sub18</MenuItem>
            <MenuItem value="Mais 40 Mista">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Mista">Mais 50</MenuItem>
            <ListSubheader>
              <b>-- Masculino</b>
            </ListSubheader>
            <MenuItem value="Categoria A Masculino">Categoria A</MenuItem>
            <MenuItem value="Categoria B Masculino">Categoria B</MenuItem>
            <MenuItem value="Categoria C Masculino">Categoria C</MenuItem>
            <MenuItem value="Categoria D Masculino">Categoria D</MenuItem>
            <MenuItem value="Sub18 Masculino">Sub18</MenuItem>
            <MenuItem value="Mais 40 Masculino">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Masculino">Mais 50</MenuItem>

            <ListSubheader>
              <b>-- Feminino</b>
            </ListSubheader>
            <MenuItem value="Categoria A Feminino">Categoria A</MenuItem>
            <MenuItem value="Categoria B Feminino">Categoria B</MenuItem>
            <MenuItem value="Categoria C Feminino">Categoria C</MenuItem>
            <MenuItem value="Categoria D Feminino">Categoria D</MenuItem>
            <MenuItem value="Sub18 Feminino">Sub18</MenuItem>
            <MenuItem value="Mais 40 Feminino">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Feminino">Mais 50</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="grouped-select">
            Terceira Inscrição Normal
          </InputLabel>
          <Select
            defaultValue="N"
            id="grouped-select"
            value={category3}
            label="Terceira Inscrição Normal"
            onChange={(e) => setCategory3(e.target.value)}
            name="Inscricao3"
          >
            <MenuItem value="N">
              <b>Não jogar</b>
            </MenuItem>

              <ListSubheader>
                <b>-- Sub14</b>
              </ListSubheader>
              <MenuItem value="Sub14 Mista" disabled={sub === "N" && true} >Sub14 Mista</MenuItem>
              <MenuItem value="Sub14 Masculina" disabled={sub === "N" && true}>Sub14 Masculina</MenuItem>
              <MenuItem value="Sub14 Feminino" disabled={sub === "N" && true}>Sub14 Feminino</MenuItem>

            <ListSubheader>
              <b>-- ProA</b>
            </ListSubheader>
            <MenuItem value="ProA Mista">ProA Mista</MenuItem>
            <MenuItem value="ProA Masculina">ProA Masculina</MenuItem>
            <MenuItem value="ProA Feminino">ProA Feminino</MenuItem>

            <ListSubheader>
              <b>-- Mista</b>
            </ListSubheader>
            <MenuItem value="Categoria A Mista">Categoria A</MenuItem>
            <MenuItem value="Categoria B Mista">Categoria B</MenuItem>
            <MenuItem value="Categoria C Mista">Categoria C</MenuItem>
            <MenuItem value="Sub18 Mista">Sub18</MenuItem>
            <MenuItem value="Mais 40 Mista">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Mista">Mais 50</MenuItem>
            <ListSubheader>
              <b>-- Masculino</b>
            </ListSubheader>
            <MenuItem value="Categoria A Masculino">Categoria A</MenuItem>
            <MenuItem value="Categoria B Masculino">Categoria B</MenuItem>
            <MenuItem value="Categoria C Masculino">Categoria C</MenuItem>
            <MenuItem value="Categoria D Masculino">Categoria D</MenuItem>
            <MenuItem value="Sub18 Masculino">Sub18</MenuItem>
            <MenuItem value="Mais 40 Masculino">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Masculino">Mais 50</MenuItem>

            <ListSubheader>
              <b>-- Feminino</b>
            </ListSubheader>
            <MenuItem value="Categoria A Feminino">Categoria A</MenuItem>
            <MenuItem value="Categoria B Feminino">Categoria B</MenuItem>
            <MenuItem value="Categoria C Feminino">Categoria C</MenuItem>
            <MenuItem value="Categoria D Feminino">Categoria D</MenuItem>
            <MenuItem value="Sub18 Feminino">Sub18</MenuItem>
            <MenuItem value="Mais 40 Feminino">Mais 40</MenuItem>
            <MenuItem value="Mais 50 Feminino">Mais 50</MenuItem>
          </Select>
        </FormControl>

        {category1 !== "N" && (
          <TextField
            name="Dupla1"
            fullWidth
            id="outlined-basic"
            label={`Dupla ${category1} (nome e sobrenome)`}
            variant="outlined"
          />
        )}

        {category2 !== "N" && (
          <TextField
            name="Dupla2"
            fullWidth
            id="outlined-basic"
            label={`Dupla ${category2} (nome e sobrenome)`}
            variant="outlined"
          />
        )}

        {category3 !== "N" && (
          <TextField
            name="Dupla3"
            fullWidth
            id="outlined-basic"
            label={`Dupla ${category3} (nome e sobrenome)`}
            variant="outlined"
          />
        )}

        <TextField
          id="outlined-basic"
          label="Nome do Pagador da inscrição"
          variant="outlined"
          fullWidth
          name="Pagador"
          value={pagador}
          onChange={handlePagador}
          required
        />

        <TextField
          id="outlined-basic"
          label="Tamanho de Camiseta"
          variant="outlined"
          fullWidth
          name="Camiseta"
          value={camiseta}
          onChange={handleCamiseta}
          required
        />

        {/*  VALOR E PAGAMENTO  */}
        {category1 ? (
          <>
            <Typography variant="h5">
              Total da inscrição: R$
              {category1Value + category2Value + category3Value}
            </Typography>
          </>
        ) : (
          <></>
        )}

        {category1 ? (
          <>
            <Typography variant="h6">
              Primeira inscrição: R$
              {category1Value}
            </Typography>
          </>
        ) : (
          <></>
        )}

        {category2 ? (
          <>
            <Typography variant="h6">
              Segunda inscrição: R$
              {category2Value}
            </Typography>
          </>
        ) : (
          <></>
        )}

        {category3 ? (
          <>
            <Typography variant="h6">
              Terceira inscrição: R$
              {category3Value}
            </Typography>
          </>
        ) : (
          <></>
        )}

        {category1 && nome && sobrenome && pagador ? (
          <Button
            variant="contained"
            onClick={() => {
              setPagamento(true);
              setOpenSnack2(true);
              handleGeneratePayload();
            }}
            type="submit"
          >
            Realizar Pagamento
          </Button>
        ) : (
          <Button variant="contained" disabled>
            REALIZAR PAGAMENTO
          </Button>
        )}
        {pagamento && (
          <Snackbar
            open={openSnack2}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert
              onClose={() => setOpenSnack2(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Deslize para baixo para realizar o pagamento
            </Alert>
          </Snackbar>
        )}

        {pagamento && (
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "280px",
                padding: "20px",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5">PIX Gerado:</Typography>
              <Typography variant="p">
                Após realizar seu pagamento via Pix, volte na página e envie seu
                comprovante no WHatsApp clicando no botão "Enviar Comprovante"
                logo abaixo
              </Typography>

              {qrCodeUrl && <img src={qrCodeUrl} alt="pix" />}
              <Typography>Chave pix:</Typography>
              <Tooltip title="Clique para copiar">
                <p
                  style={{
                    overflowWrap: "break-word",
                    cursor: "pointer",
                  }}
                  onClick={handleCopyPayload}
                >
                  {payload}
                </p>
              </Tooltip>
            </Box>

            <Button
              variant="contained"
              href={`https://api.whatsapp.com/send?phone=556791008416&text=Segue%20abaixo%20o%20comprovante%20da%20inscri%C3%A7%C3%A3o%20de%20${nome}%20${sobrenome}%20pago%20por%20${pagador}`}
            >
              Enviar Comprovante
            </Button>
          </Stack>
        )}

        <Box></Box>
      </Stack>
    </Box>
  );
}
