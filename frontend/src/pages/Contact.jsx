const Contact = () => (
  <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-950 dark:text-slate-100">
    <div className="rounded-[2rem] bg-slate-950/90 p-10 shadow-2xl ring-1 ring-slate-800 dark:bg-slate-900">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-sadaYellow px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">Contact</span>
          <h2 className="text-4xl font-bold text-slate-100">Réservez, commandez ou venez nous voir</h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Nous sommes à Dakar pour vous servir des plats sénégalais authentiques, à emporter ou à déguster sur place. Contactez-nous par WhatsApp, email ou passez directement au restaurant.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-sadaSand p-6 shadow-lg text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">WhatsApp</p>
              <p className="mt-4 text-2xl font-semibold">+221 77 683 81 55</p>
              <p className="mt-2 text-sm text-slate-600">+221 78 798 39 99</p>
            </div>
            <div className="rounded-[2rem] bg-sadaSand p-6 shadow-lg text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Adresse</p>
              <p className="mt-4 text-2xl font-semibold">Dakar, Sénégal</p>
              <p className="mt-2 text-sm text-slate-600">Retrait sur place uniquement pour le moment.</p>
            </div>
            <div className="rounded-[2rem] bg-sadaSand p-6 shadow-lg text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Email</p>
              <p className="mt-4 text-2xl font-semibold">contact@sadatraiteur.sn</p>
              <p className="mt-2 text-sm text-slate-600">Pour partenariat et commandes événementielles.</p>
            </div>
            <div className="rounded-[2rem] bg-sadaSand p-6 shadow-lg text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Réservation</p>
              <p className="mt-4 text-2xl font-semibold">En ligne</p>
              <p className="mt-2 text-sm text-slate-600">Réservez une table en quelques clics.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 rounded-[2rem] bg-slate-100/90 p-8 text-slate-950 shadow-2xl dark:bg-slate-950/80">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h3 className="text-2xl font-semibold">Menu QR Code</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Scannez pour ouvrir notre menu directement sur votre smartphone et commander en un instant.</p>
            <div className="mt-8 flex items-center justify-center rounded-[2rem] bg-slate-950 p-6">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://sadatraiteur.app/menu" alt="QR Code menu" className="h-52 w-52" />
            </div>
          </div>
          <div className="rounded-[2rem] bg-sadaRed p-6 text-sadaSand shadow-xl">
            <h3 className="text-2xl font-semibold">Heures d’ouverture</h3>
            <div className="mt-4 space-y-3 text-sm leading-7">
              <p>Midi: 11h00 - 15h00</p>
              <p>Soir: 18h00 - 22h00</p>
              <p>Ouvert toute la semaine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
