mixins.highlight = {
    data() {
        return { copying: false };
    },
    created() {
        hljs.configure({ ignoreUnescapedHTML: true });
        this.renderers.push(this.highlight);
    },
    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        highlight() {
            let codes = document.querySelectorAll("pre");
            for (let i of codes) {
                let code = i.textContent;
                // 改进的语言检测逻辑，避免使用不存在的语言
                let language = "plaintext";
                // 安全获取所有class，并处理可能的null值
                const preClasses = Array.from(i.classList || []);
                const codeClasses = i.firstChild ? Array.from(i.firstChild.classList || []) : [];
                const allClasses = [...preClasses, ...codeClasses];
                
                // 查找有效的语言标识符
                for (const cls of allClasses) {
                    // 跳过空值和常见的非语言class
                    if (!cls || cls === 'pre' || cls === 'code' || cls === 'hljs' || cls === 'line') {
                        continue;
                    }
                    
                    // 查找标准的语言前缀
                    if (cls.startsWith('lang-')) {
                        language = cls.slice(5);
                        break;
                    } else if (cls.startsWith('language-')) {
                        language = cls.slice(10);
                        break;
                    } else {
                        // 尝试使用其他class，但增加安全检查
                        language = cls;
                        break;
                    }
                }
                
                let highlighted;
                try {
                    // 增加额外的错误处理层
                    try {
                        highlighted = hljs.highlight(code, { language }).value;
                    } catch (e) {
                        // 如果特定语言高亮失败，回退到plaintext
                        console.warn(`语言'${language}'高亮失败，使用plaintext:`, e);
                        highlighted = hljs.highlight(code, { language: 'plaintext' }).value;
                    }
                } catch {
                    // 最外层异常处理，直接使用原始代码
                    highlighted = code;
                }
                i.innerHTML = `
                <div class="code-content hljs">${highlighted}</div>
                <div class="language">${language}</div>
                <div class="copycode">
                    <i class="fa-solid fa-copy fa-fw"></i>
                    <i class="fa-solid fa-check fa-fw"></i>
                </div>
                `;
                let content = i.querySelector(".code-content");
                hljs.lineNumbersBlock(content, { singleLine: true });
                let copycode = i.querySelector(".copycode");
                copycode.addEventListener("click", async () => {
                    if (this.copying) return;
                    this.copying = true;
                    copycode.classList.add("copied");
                    await navigator.clipboard.writeText(code);
                    await this.sleep(1000);
                    copycode.classList.remove("copied");
                    this.copying = false;
                });
            }
        },
    },
};
