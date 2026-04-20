import visualizer from 'rollup-plugin-visualizer'
/**
 * @description: 代码分析插件，生成可视化报告
 */
const useVisualizer = () => {
  return visualizer({
    filename: 'stats.html',
  })
}

export default useVisualizer
