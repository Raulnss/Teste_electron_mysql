const mysql = require('mysql2');
  try {
    var connection = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"",
      database:"banco_electron_teste"
    });
    connection.connect((err) => {
      if (err) {
        return console.log(err.stack);
      }
      console.log("conexão deu certo");
      if (connection.state === 'disconnected') {
        console.log("A conexão foi fechada. Reconectando...");
        connection.connect();
      }
      
      
    });
    function consulta() {
       var a = document.getElementById('n1').value;
       var sql = "SELECT * FROM usuarios WHERE id = ?";
        connection.query(sql,[a], (err, results) => {
            if (err) {
              return console.log(err.stack);
            }
          
            // results é um array contendo os registros retornados pela consulta
            const nome = results[0].email;
    
            console.log(nome);
          }); 
    }
    function cadastro() {
        var nome = document.getElementById('n2').value;
        var email = document.getElementById('n3').value;
        var login = document.getElementById('n4').value;
        var senha = document.getElementById('n5').value;
        
        const sql = 'INSERT INTO usuarios (nome, email, login, senha) VALUES (?, ?, ?, ?)';

        // Execute a consulta
        connection.query(sql, [nome,email,login,senha], (err, results) => {
          if (err) {
            return console.log(err.stack);
          }
      
          // results.insertId contém o ID do registro inserido
          console.log(`Registro inserido com sucesso. ID: ${results.insertId}`);
        });
    }

  } catch (err) {
    console.log(err);
  }

