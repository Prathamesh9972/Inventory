const users = require("../data/users");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Send user role (no JWT)
  res.json({ id: user.id, name: user.name, role: user.role });
};
