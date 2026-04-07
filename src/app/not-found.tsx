import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-art-cream px-4 text-center dark:bg-art-charcoal">
      <h1 className="font-[var(--font-cormorant)] text-6xl font-bold text-art-gold">
        404
      </h1>
      <p className="mt-4 font-[var(--font-cormorant)] text-2xl text-art-charcoal dark:text-white">
        Obra no encontrada
      </p>
      <p className="mt-2 max-w-md text-sm text-art-charcoal/60 dark:text-white/50">
        La página que buscas no existe o fue movida a otra galería.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-art-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-art-gold/90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
