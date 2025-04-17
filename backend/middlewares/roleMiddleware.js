module.exports = (req, res, next) => {
    const { role } = req.body;
    if (role === "admin" || role === "staff") {
      return next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  };
  