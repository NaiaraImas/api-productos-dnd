import db from '../firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

export async function obtenerTodosLosProductos() {
  const productosRef = collection(db, 'productos');
  const snapshot = await getDocs(productosRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function obtenerProductoPorId(id) {
  const ref = doc(db, 'productos', id);
  const docSnap = await getDoc(ref);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function crearProducto(data) {
  const docRef = await addDoc(collection(db, 'productos'), data);
  return { id: docRef.id, ...data };
}

export async function actualizarProducto(id, data) {
  const ref = doc(db, 'productos', id);
  await updateDoc(ref, data);
}

export async function eliminarProducto(id) {
  const ref = doc(db, 'productos', id);
  await deleteDoc(ref);
}
