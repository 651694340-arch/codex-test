"use strict";

const form = document.getElementById("create-form");
const promptInput = document.getElementById("prompt");
const styleInput = document.getElementById("style");
const result = document.getElementById("result");
const resultText = document.getElementById("result-text");
const copyStatus = document.getElementById("copy-status");
const styles = {
  cinematic: { name: "电影质感", camera: "以全景建立场景，再缓慢推进至主体；使用柔和光影与连贯的镜头节奏。" },
  future: { name: "未来科技", camera: "从环境细节切入，向上移动展开空间；使用冷色光影与鲜明的明暗对比。" },
  dream: { name: "梦幻动画", camera: "围绕主体轻缓环绕，再拉远展示全景；使用柔和色彩与流畅的镜头过渡。" }
};

promptInput.addEventListener("input", () => promptInput.setCustomValidity(""));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) {
    promptInput.setCustomValidity("请先写下你的创作灵感。");
    promptInput.reportValidity();
    return;
  }
  const style = styles[styleInput.value];
  resultText.textContent = `场景描述：${prompt}\n\n视觉风格：${style.name}\n\n镜头建议：${style.camera}\n\n制作提示：可将此方案用于视频创作工具，继续调整时长、画幅与声音。`;
  result.hidden = false;
  copyStatus.textContent = "";
  result.scrollIntoView({ behavior: "auto", block: "nearest" });
});

for (const button of document.querySelectorAll(".case-button")) {
  button.addEventListener("click", () => {
    promptInput.value = button.dataset.prompt;
    promptInput.setCustomValidity("");
    styleInput.value = button.dataset.style;
    document.getElementById("create").scrollIntoView({ behavior: "auto" });
    promptInput.focus({ preventScroll: true });
  });
}

document.getElementById("copy-button").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultText.textContent);
    copyStatus.textContent = "已复制";
  } catch {
    copyStatus.textContent = "请选中上方方案文字，手动复制。";
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
