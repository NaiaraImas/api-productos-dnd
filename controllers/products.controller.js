
import db from '../firebase.js';
import { collection, getDocs, addDoc, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export async function getAllProducts(req, res) {
  try {
    const productosRef = collection(db, 'productos');
    const snapshot = await getDocs(productosRef);

    const productos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      id: docSnap.id,
      ...docSnap.data()
    });
  } catch (error) {
    console.error('❌ Error interno al buscar producto:', error);
    res.status(500).json({ error: 'Error al buscar producto' });
  }
}



export async function createProduct(req, res) {
  const { nombre, precio, descripcion, categoria } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (nombre y precio)' });
  }

  try {
    const nuevoProducto = {
      nombre,
      precio,
      descripcion: descripcion || '',
      categoria: categoria || ''
    };

    const docRef = await addDoc(collection(db, 'productos'), nuevoProducto);

    res.status(201).json({
      mensaje: 'Producto creado en Firestore',
      id: docRef.id,
      ...nuevoProducto
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
}


export async function updateProduct(req, res) {
  const { id } = req.params;
  const { nombre, precio, descripcion, categoria } = req.body;

  try {
    const ref = doc(db, 'productos', id);

    await updateDoc(ref, {
      ...(nombre !== undefined && { nombre }),
      ...(precio !== undefined && { precio }),
      ...(descripcion !== undefined && { descripcion }),
      ...(categoria !== undefined && { categoria })
    });

    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);

    if (error.code === 'not-found') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}


export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const ref = doc(db, 'productos', id);
    await deleteDoc(ref);

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
}