const User = require('../models/User');

// PUT /api/users/me — editar perfil propio
const editarPerfil = async (req, res) => {
  try {
    const { username, bio, avatar_url } = req.body;

    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'El username es requerido.' });
    }

    // Verificar que el username no lo tenga otro usuario
    const existe = await User.findOne({
      username: username.trim(),
      _id: { $ne: req.user._id }
    });

    if (existe) {
      return res.status(409).json({ message: 'Ese username ya está en uso.' });
    }

    const actualizado = await User.findByIdAndUpdate(
      req.user._id,
      {
        username:   username.trim(),
        bio:        bio?.trim() || '',
        avatar_url: avatar_url?.trim() || ''
      },
      { new: true }
    ).select('-password_hash');

    if (!actualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({
      message: 'Perfil actualizado correctamente.',
      user: {
        id:         actualizado._id,
        username:   actualizado.username,
        email:      actualizado.email,
        bio:        actualizado.bio,
        avatar_url: actualizado.avatar_url
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { editarPerfil };
