import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

const useComponents = () => {
  return Components({
    resolvers: [
      TDesignResolver({
        library: 'vue-next',
      }),
    ],
    dts: './types/components.d.ts',
  })
}

export default useComponents
