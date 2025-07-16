
import db from './firebase.js'; 
import { collection, addDoc } from 'firebase/firestore';

const productos = [
  {
    nombre: "Dados Matron Raven's",
    descripcion: "Set de dados inspirados en la Matron Raven. Oscuros y elegantes.",
    precio: 75000,
    cssClass: "DadosM"
  },
  {
    nombre: "Dados Vax",
    descripcion: "Dados elegantes para quienes caminan en la sombra. Inspirado en Vax.",
    precio: 50000,
    cssClass: "DadosV"
  },
  {
    nombre: "Dados Laudna",
    descripcion: "Un set caótico, hermoso y encantador, como Laudna.",
    precio: 50000,
    cssClass: "DadosL"
  },
  {
    nombre: "Dados Green",
    descripcion: "Dados verdes translúcidos, ideales para druidas o rangers.",
    precio: 13000,
    cssClass: "DadosG"
  },
  {
    nombre: "Dados Elite",
    descripcion: "Un set de dados elegante para jugadores de elite.",
    precio: 15000,
    cssClass: "DadosE"
  },
  {
    nombre: "Combo de fichas y pantallas",
    descripcion: "Incluye fichas y pantalla del Dungeon Master para una sesión completa.",
    precio: 12000,
    cssClass: "ComboFPF"
  },
  {
    nombre: "Combo de todo para iniciar",
    descripcion: "Pack ideal para nuevos jugadores: dados, ficha, pantalla y mapa.",
    precio: 75000,
    cssClass: "ComboV"
  },
  {
    nombre: "Manual Dungeon Master",
    descripcion: "Guía esencial para dirigir aventuras como DM.",
    precio: 102000,
    cssClass: "LibrosM"
  },
  {
    nombre: "Manual de Monstruos",
    descripcion: "Catálogo completo de criaturas para desafiar a tus jugadores.",
    precio: 85000,
    cssClass: "LibrosMo"
  },
  {
    nombre: "Manual de Jugador",
    descripcion: "Todo lo que necesitás saber para crear y jugar tu personaje.",
    precio: 102000,
    cssClass: "LibrosP"
  },
  {
    nombre: "Combo manuales D&D",
    descripcion: "Incluye el Manual del Jugador, de Monstruos y del DM.",
    precio: 255000,
    cssClass: "LibrosC1"
  },
  {
    nombre: "Combo manuales monstruos + master",
    descripcion: "Incluye Manual del DM y Manual de Monstruos.",
    precio: 270000,
    cssClass: "LibrosC2"
  },
  {
    nombre: "Piezas para mapas 1",
    descripcion: "Set de piezas básicas para crear tus propios mapas de batalla.",
    precio: 17000,
    cssClass: "PM1"
  },
  {
    nombre: "Piezas para mapas 2",
    descripcion: "Set avanzado de piezas con terrenos, muros y objetos.",
    precio: 20000,
    cssClass: "PM2"
  }
];

async function seedDB() {
  const productosRef = collection(db, 'productos');

  for (const producto of productos) {
    try {
      await addDoc(productosRef, producto);
      console.log(`✅ Producto agregado: ${producto.nombre}`);
    } catch (error) {
      console.error(`❌ Error al agregar ${producto.nombre}:`, error);
    }
  }

  console.log('🌱 Seeding completado');
}

seedDB();
