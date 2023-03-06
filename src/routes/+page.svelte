<script lang="ts">
  import Image from 'sveltekit-image'
</script>

<main class="max-w-xl mx-auto m-4 py-4">
  <section class="">
    <h1 class="text-gray-900 font-bold text-3xl">Sveltekit Image</h1>
    <p class="text-gray-700">Automatic image optimization for SvelteKit.</p>
  </section>

  <section class="py-8">
    <a
      href="https://github.com/moonfacedigital/sveltekit-image#readme"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Get Started
    </a>
  </section>

  <h2 class="text-2xl font-bold pb-4">Demo</h2>
  <Image
    src="Triusen.png"
    width={800}
    height={800}
    alt="Tom Scott"
    class="rounded-xl shadow-md"
    important
  />
  <Image
    src="https://source.unsplash.com/random/800×800/?ocean"
    width={800}
    height={800}
    alt="A random picture of the ocean"
    class="rounded-xl shadow-md"
    important
  />
</main>
