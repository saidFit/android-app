
const {NextFunction, Request,Response } = require("express");
const { VerifyErrors } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")

//verifyToken
const autherization= async (req ,res ,next) => {

  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Authorisation is required");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // If the token is valid,it assigns payload.id to req.userId and payload.isSeller to req.isSeller.
    jwt.verify(token, process.env.SECRET, async (err , payload) => {
      if (err) return next(CreateError(403, { message: 'Token is not valid!' }));
  
      const reqWithCustomProps = req;
      reqWithCustomProps.userId = payload.id;
      console.log( reqWithCustomProps.userId,payload)
      // console.log(  reqWithCustomProps.isSeller,payload.isSeller)
    });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = autherization;


