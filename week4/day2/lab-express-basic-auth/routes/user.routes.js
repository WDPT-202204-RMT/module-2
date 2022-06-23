const { Router } = require("express");
const router = Router();

router.get("/profile", (req, res) => {
  const { user } = req.session;

  res.render("users/profile", { user });
});

module.exports = router;
