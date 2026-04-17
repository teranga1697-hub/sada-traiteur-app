const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Thiebou dieune',
    category: 'Menu du jour',
    menuDay: 'Lundi',
    description: 'Riz au poisson riche en saveurs et épices sénégalaises.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1529691928246-7d11f8cde103?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    name: 'Mbaxal saloum',
    category: 'Menu du jour',
    menuDay: 'Mardi',
    description: 'Poisson au tombouctou et légumes frais, plat iconique du Saloum.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1604908177520-c9f29f5fd0a8?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Thiebou niebé',
    category: 'Menu du jour',
    menuDay: 'Mercredi',
    description: 'Riz rouge avec haricots niébé et viande parfumée.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Mbaxal bou togn',
    category: 'Menu du jour',
    menuDay: 'Jeudi',
    description: 'Poisson braisé à la sauce tomate épicée, servi avec riz.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1601924582975-bc2cc844c33d?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Dakhine',
    category: 'Menu du jour',
    menuDay: 'Vendredi',
    description: 'Poulet mijoté aux légumes et sauce légère, plat du terroir.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Yassa poulet',
    category: 'Menu du soir',
    menuDay: 'Samedi',
    description: 'Poulet mariné aux oignons et citron, recette traditionnelle.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb37?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    name: 'Domada',
    category: 'Menu du soir',
    description: 'Sauce d’arachide onctueuse accompagnée de riz parfumé.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1603252092074-2d1b3d5212fa?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Mafé (riz + sauce arachide)',
    category: 'Menu du soir',
    description: 'Riz blanc servi avec une généreuse sauce arachide.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1512058564366-c9e9c4fca813?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Diaga',
    category: 'Menu du soir',
    description: 'Poisson tiède à la sauce légère et légumes frais.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Thiou',
    category: 'Menu du soir',
    description: 'Riz blanc servi avec viande et sauce légère.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e872?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Yassa yapp',
    category: 'Menu du soir',
    description: 'Bœuf mariné aux oignons et citron, servi avec riz.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1532635219-34c9b0b66ea5?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Mbrokhé',
    category: 'Menu du soir',
    description: 'Épinards africains en sauce, richesse en saveurs et textures.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1514518073645-a0b9d4be6c7d?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Thiebou guinar',
    category: 'Plats 1500fr',
    description: 'Riz au poulet braisé et légumes, plat copieux et savoureux.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1514510611699-4a63ac2282de?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Yassa guinar',
    category: 'Plats 1500fr',
    description: 'Poulet grillé mariné au citron et oignons doux.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Saga saga',
    category: 'Plats 1500fr',
    description: 'Plat mijoté aux épinards et viande, parfumé et nourrissant.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1499965165890-3f3d89f2dcd1?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Foufou',
    category: 'Plats 1500fr',
    description: 'Boulette de farine servie avec une sauce parfumée.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Attiéké',
    category: 'Plats 1500fr',
    description: 'Semoule de manioc accompagnée de poisson ou viande.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Riz cantonais',
    category: 'Plats 2500fr',
    description: 'Riz sauté aux légumes, œufs et morceaux de jambon.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1541872703-1f46bae1f0a0?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Paella',
    category: 'Plats 2500fr',
    description: 'Mélange de riz, fruits de mer, poulet et épices.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Vermicelles',
    category: 'Plat du soir',
    description: 'Vermicelles sautés, parfumés et servis avec sauce légère.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1512058564366-c9e9c4fca813?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Petit pois',
    category: 'Plat du soir',
    description: 'Riz aux petits pois frais et aromates doux.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Lentilles',
    category: 'Plat du soir',
    description: 'Lentilles mijotées aux épices, onctueuses et riches.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Spaghetti bolognaise',
    category: 'Plat du soir',
    description: 'Pâtes italiennes à la sauce tomate et viande savoureuse.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Foie',
    category: 'Plat du soir',
    description: 'Foie grillé accompagné d’une sauce légère et riz.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1527515637467-369d6ca97f7a?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Thiéré',
    category: 'Plat du soir',
    description: 'Semoule de mil sucrée, plat traditionnel réconfortant.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1516187534035-ff1bff19a6d3?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Soupe (viande / poulet)',
    category: 'Plats 1500fr',
    description: 'Soupe chaude riche en viande ou poulet et légumes.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Touffé',
    category: 'Plats 1500fr',
    description: 'Ragoût épicé de viande accompagné d’un bon plat de riz.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1512058564366-c9e9c4fca813?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Couscous poulet',
    category: 'Plats 1500fr',
    description: 'Couscous moelleux servi avec poulet et légumes.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551069619-4c95574dc2c8?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Vermicelles poulet',
    category: 'Plats 1500fr',
    description: 'Vermicelles accompagnées de morceaux de poulet et légumes.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Farci',
    category: 'Plats 1500fr',
    description: 'Légumes farcis aux épices et viande savoureuse.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb37?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Poisson braisé',
    category: 'Plats 2000fr',
    description: 'Poisson grillé aux épices locales servi avec riz.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    name: 'Poulet frites',
    category: 'Plats 2000fr',
    description: 'Poulet croustillant servi avec frites dorées.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Brochettes viande',
    category: 'Plats 2000fr',
    description: 'Brochettes grillées aux herbes et épices.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    name: 'Steak frites',
    category: 'Plats 2000fr',
    description: 'Steak juteux avec une portion généreuse de frites.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    name: 'Poulet entier',
    category: 'Spécialités',
    description: 'Poulet entier grillé à la perfection, idéal pour partager.',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Demi poulet',
    category: 'Spécialités',
    description: 'Moitié de poulet grillé, servi avec frites ou riz.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1512058564366-c9e9c4fca813?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Jus bissap (bouteille)',
    category: 'Jus locaux',
    description: 'Boisson hibiscus sucrée et rafraîchissante.',
    price: 400,
    image: 'https://images.unsplash.com/photo-1547932393-5d87badefb72?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Jus bouille',
    category: 'Jus locaux',
    description: 'Jus de gingembre sucré et chaud, boisson locale.',
    price: 400,
    image: 'https://images.unsplash.com/photo-1510626176961-4b70db2908f7?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Jus ditakh',
    category: 'Jus locaux',
    description: 'Jus mangue crémeux, sucré et fruité.',
    price: 400,
    image: 'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?auto=format&fit=crop&w=900&q=80',
    featured: true
  }
];

const initializeProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(sampleProducts);
    console.log('Menu initial inséré en base');
  }
};

const seedProducts = async (req, res) => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(sampleProducts);
    return res.status(201).json({ message: 'Menu initial créé', products: sampleProducts });
  }
  res.json({ message: 'Le menu existe déjà' });
};

const WEEK_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const getAllProducts = async (req, res) => {
  const { today } = req.query;
  const filter = { available: true };
  if (today === 'true') {
    const currentDay = WEEK_DAYS[new Date().getDay()];
    filter.$or = [{ menuDay: currentDay }, { menuDay: 'Tous les jours' }];
  }
  const products = await Product.find(filter).sort({ category: 1, name: 1 });
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit introuvable' });
  res.json(product);
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit introuvable' });
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit introuvable' });
  await product.remove();
  res.json({ message: 'Produit supprimé' });
};

module.exports = { initializeProducts, seedProducts, getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
