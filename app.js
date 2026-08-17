const scenarios = {
  complete: {
    lines: [
      ['muted-line', '$ showcase.run("complete")'],
      ['', '→ 读取 4 张虚拟抖店运营表'],
      ['', '→ 核对数据期：2026-08-16'],
      ['', '→ 对比上一日与历史基准'],
      ['good', '✓ 成交 4,632 元 · 订单 79 单'],
      ['warn', '! 退款率 11.30%：需要持续观察'],
      ['good', '✓ 输出复盘摘要与验证建议'],
      ['muted-line', '完成：仅模拟，不连接真实服务'],
    ],
  },
  missing: {
    lines: [
      ['muted-line', '$ showcase.run("missing")'],
      ['', '→ 检查虚拟输入目录'],
      ['warn', '! 缺少收支表与退款表'],
      ['warn', '! 核心成本无法确认'],
      ['good', '✓ 已暂停确定性利润判断'],
      ['good', '✓ 已生成补数清单'],
      ['', '→ 等待人工补充后再继续'],
      ['muted-line', '状态：待补数据'],
    ],
  },
  human: {
    lines: [
      ['muted-line', '$ showcase.run("human-review")'],
      ['', '→ 识别到策略可能影响店铺配置'],
      ['warn', '! 方案涉及预算 / 出价调整'],
      ['good', '✓ 未执行任何外部生效动作'],
      ['good', '✓ 已列出差异、风险与验证指标'],
      ['', '→ 提交人工确认'],
      ['muted-line', '状态：等待人工决策'],
    ],
  },
};

let currentScenario = 'complete';
const body = document.querySelector('#console-body');
const runButton = document.querySelector('#run-button');

function renderScenario(key, animate = false) {
  const lines = scenarios[key].lines;
  body.innerHTML = '';
  if (!animate) {
    for (const [kind, text] of lines) {
      const line = document.createElement('div');
      line.className = kind;
      line.textContent = text;
      body.appendChild(line);
    }
    return;
  }
  lines.forEach(([kind, text], index) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = kind;
      line.textContent = text;
      body.appendChild(line);
    }, index * 170);
  });
}

document.querySelectorAll('.scenario').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.scenario').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentScenario = button.dataset.scenario;
    renderScenario(currentScenario);
  });
});

runButton.addEventListener('click', () => {
  runButton.disabled = true;
  runButton.innerHTML = '模拟运行中 <span>…</span>';
  renderScenario(currentScenario, true);
  setTimeout(() => {
    runButton.disabled = false;
    runButton.innerHTML = '再次运行这个场景 <span>▶</span>';
  }, scenarios[currentScenario].lines.length * 170 + 300);
});

renderScenario(currentScenario);

