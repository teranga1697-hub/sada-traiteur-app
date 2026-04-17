const Contact = () => (
  <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-950 dark:text-slate-100">
    <div className="rounded-[2rem] bg-gradient-to-br from-rose-50 via-pink-50 to-white p-10 shadow-2xl ring-1 ring-rose-200 dark:bg-slate-900">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-pink-200 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-rose-900">Contact</span>
          <h2 className="text-4xl font-bold text-slate-950">Réservez, commandez ou venez nous voir</h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Nous sommes à Dakar pour vous servir des plats sénégalais authentiques, à emporter ou à déguster sur place. Contactez-nous par WhatsApp, email ou passez directement au restaurant.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg ring-1 ring-rose-100 text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500">Chaîne WhatsApp</p>
              <a href="https://whatsapp.com/channel/0029Vb6VAFyADTOEZK0BYp2s" target="_blank" rel="noreferrer" className="mt-4 block text-2xl font-semibold text-rose-900 hover:text-pink-600">Rejoindre la chaîne</a>
              <p className="mt-2 text-sm text-slate-600">Accédez à notre chaîne pour recevoir nos menus et promotions.</p>
            </div>
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg ring-1 ring-rose-100 text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500">Paiement en ligne</p>
              <a href="https://pay.wave.com/m/M_sn_ciimD4TeVHX8/c/sn/" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-3 rounded-full bg-pink-500 px-4 py-3 text-white transition hover:bg-pink-600">
                Payer Lia avec Wave
              </a>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex h-16 items-center justify-center rounded-3xl bg-rose-50 p-3 shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Wave_logo.svg" alt="Wave" className="h-full w-auto" />
                </div>
                <div className="flex h-16 items-center justify-center rounded-3xl bg-orange-50 p-3 shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Orange_Money_logo.png" alt="Orange Money" className="h-full w-auto" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">Utilisez Wave ou Orange Money pour régler votre commande rapidement.</p>
            </div>
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg ring-1 ring-rose-100 text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500">Adresse</p>
              <p className="mt-4 text-2xl font-semibold">Castors, Dakar</p>
              <p className="mt-2 text-sm text-slate-600">Retrait sur place ou livraison selon zone.</p>
            </div>
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg ring-1 ring-rose-100 text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500">Email</p>
              <p className="mt-4 text-2xl font-semibold">contact@sadatraiteur.sn</p>
              <p className="mt-2 text-sm text-slate-600">Pour partenariat et commandes événementielles.</p>
            </div>
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg ring-1 ring-rose-100 text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500">Réservation</p>
              <p className="mt-4 text-2xl font-semibold">En ligne</p>
              <p className="mt-2 text-sm text-slate-600">Réservez une table en quelques clics.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
          <iframe
            title="Carte Google Maps Castors Dakar"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.5342292280477!2d-17.45376748469548!3d14.682430188807047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172b2b7d6a4bf%3A0xd258f7e16aa5e2a5!2sCastors%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1700000000000"
            className="h-96 w-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
