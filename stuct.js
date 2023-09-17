try {
    dbconn.query(
        "SELECT user_id, user_email, user_sirname, user_name,  user_password FROM users WHERE user_email = ?;",
        email,
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            if (result.length > 0) {
              
             console.log(result)
              const hash = result[0].user_password;
              const id = result[0].id;
  
              //ici je compare le mot de passe encrypte de ma base a celui entrer par lutillisateur
              bcrypt.compare(`${password}`, hash, function (error, response) {
                if (error) {
                  console.log(error);
                } else if (response === true) {
                  //creation d'un token valide pour 1h qui permettra de referencer notre utillisateur sur la plateforme
                  var token = jwt.sign({ auth: true, data: result[0] }, "temp", {
                    expiresIn: "1h",
                  });
                  //console.log(token);
                  res
                    .status(200)
                    .send({ token: token, message: "The password is correct !" });
                } else {
                  res
                    .status(401)
                    .send({ message: "The password is incorrect !" });
                }
              });
            } else {
              res.status(401).send({
                message: "You do not have an account please create one",
              });
            }
          }
        }
      );
} catch (error) {
    console.log(error)
}