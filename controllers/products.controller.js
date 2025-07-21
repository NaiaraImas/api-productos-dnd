import {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../models/products.model.js';

export async function getAllProducts(req, res) {
  try {
    const productos = await obtenerTodosLosProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const producto = await obtenerProductoPorId(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al buscar producto:', error);
    res.status(500).json({ error: 'Error al buscar producto' });
  }
}

export async function createProduct(req, res) {
  const { nombre, precio, descripcion, categoria } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (nombre y precio)' });
  }

  try {
    const nuevoProducto = await crearProducto({
      nombre,
      precio,
      descripcion: descripcion || '',
      categoria: categoria || ''
    });

    res.status(201).json({
      mensaje: 'Producto creado en Firestore',
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
    await actualizarProducto(id, {
      ...(nombre !== undefined && { nombre }),
      ...(precio !== undefined && { precio }),
      ...(descripcion !== undefined && { descripcion }),
      ...(categoria !== undefined && { categoria })
    });

    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    await eliminarProducto(id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
}
