const Dish3D = () => {
  return (
    <div className="dish-3d-section rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
      <div className="dish-3d-scene">
        <div className="dish-3d-card">
          <div className="dish-plate">
            <div className="dish-sauce" />
            <div className="dish-bite dish-bite-1" />
            <div className="dish-bite dish-bite-2" />
            <div className="dish-spoon" />
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-100">Présentation 3D du plat</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-400">
          Voici une vitrine 3D immersive pour notre meilleur plat. Elle met en valeur les couleurs, la forme et l’ambiance gourmande du menu sénégalais.
        </p>
      </div>
    </div>
  );
};

export default Dish3D;
