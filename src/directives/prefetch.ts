import type { ObjectDirective } from "vue";

interface PrefetchElement extends HTMLElement {
  _prefetchObserver?: IntersectionObserver;
}

/**
 * v-prefetch - Prefetch resources when element enters viewport
 *
 * Usage:
 *   <div v-prefetch="'/api/data'">Hover section</div>
 *   <div v-prefetch="['/api/users', '/api/posts']">Section</div>
 */
export const vPrefetch: ObjectDirective<PrefetchElement, string | string[]> = {
  mounted(el, binding) {
    const urls = Array.isArray(binding.value) ? binding.value : [binding.value];

    el._prefetchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            urls.forEach((url) => {
              const link = document.createElement("link");
              link.rel = "prefetch";
              link.href = url;
              link.as = guessResourceType(url);
              document.head.appendChild(link);
            });
            el._prefetchObserver?.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );

    el._prefetchObserver.observe(el);
  },

  unmounted(el) {
    el._prefetchObserver?.disconnect();
    delete el._prefetchObserver;
  },
};

function guessResourceType(url: string): string {
  if (/\.js$/.test(url)) return "script";
  if (/\.css$/.test(url)) return "style";
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/.test(url)) return "image";
  if (/\.(woff2?|ttf|otf|eot)$/.test(url)) return "font";
  return "fetch";
}
