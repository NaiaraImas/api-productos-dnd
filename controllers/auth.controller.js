import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../firebase.js';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';


// const usuarios = []; // En memoria por ahora

export async function register(req, res) {
  const { email, password, rol = 'usuario' } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' });

  try {
    // Buscar si ya existe el email
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return res.status(400).json({ error: 'Usuario ya registrado' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await addDoc(usuariosRef, {
      email,
      password: hashed,
      rol
    });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}


export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const usuarioDoc = snapshot.docs[0];
    const usuario = usuarioDoc.data();

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        email: usuario.email,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

