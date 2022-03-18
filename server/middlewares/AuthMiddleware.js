const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { id: user.id, firstName: user.firstName, lastName:user.lastName ,email: user.email, permission:user.permission},
    process.env.JWT_SECRET
  );
  console.log(process.env.JWT_SECRET)
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ error: "user not authenticated !" });
  }

  try {
    const validToken = verify(
      accessToken,
      process.env.JWT_SECRET
    );

    if (validToken) {
      req.user = validToken;
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
