import yaml from 'js-yaml';
import pluginYAML from '@rollup/plugin-yaml';
import { marked } from 'marked';
import { markedSmartypants } from 'marked-smartypants';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { dataToEsm } from '@rollup/pluginutils';

const markdownPlugin = () => {
  marked.use(markedSmartypants(), {
    renderer: {
      link(href: string, title: string | null | undefined, text: string) {
        return `<a rel="external" href="${encodeURI(href)}" class="link"${title ? ' title="' + title + '"' : ''}>${text}</a>`;
      },
    },
  });

  return {
    name: 'markdown',
    transform: (src: string, id: string) => {
      if (!id.endsWith('.md')) return null;

      let fm = {};
      let rawBody = src;

      if (src.startsWith('---')) {
        const end = src.indexOf('---', 3);

        if (end === -1) throw new Error(`Unenclosed frontmatter in ${id}`);

        fm = yaml.load(src.substring(3, end).trim()) as object;
        rawBody = src.substring(end + 3).trim();
      }

      const body = marked.parse(rawBody);

      return {
        code: dataToEsm({ ...fm, body }),
        map: null,
      };
    },
  };
};

export default defineConfig({
  plugins: [sveltekit(), pluginYAML(), markdownPlugin()],
});
