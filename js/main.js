// 细微流星雨背景特效
mixins.meteorShower = {
    mounted() {
        this.initMeteorShowerEffect();
    },
    methods: {
        initMeteorShowerEffect() {
            // 创建流星
            const createMeteor = () => {
                const meteor = document.createElement('div');
                meteor.classList.add('meteor');
                
                // 随机位置和大小
                const startX = Math.random() * window.innerWidth;
                const startY = -100;
                const length = Math.random() * 150 + 50; // 50-200px长度
                const width = Math.random() * 3 + 1; // 1-4px宽度
                const duration = Math.random() * 3 + 2; // 2-5秒
                const delay = Math.random() * 5; // 0-5秒延迟
                const angle = Math.random() * 10 + 40; // 40-50度角度
                const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8透明度
                
                // 设置流星样式
                meteor.style.position = 'fixed';
                meteor.style.left = `${startX}px`;
                meteor.style.top = `${startY}px`;
                meteor.style.width = `${length}px`;
                meteor.style.height = `${width}px`;
                meteor.style.background = 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8))';
                meteor.style.borderRadius = '50%';
                meteor.style.pointerEvents = 'none';
                meteor.style.zIndex = '100'; // 较低层级，不影响其他元素
                meteor.style.opacity = '0';
                meteor.style.transform = `rotate(${angle}deg)`;
                meteor.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
                meteor.style.filter = 'blur(1px)';
                
                // 设置CSS变量
                meteor.style.setProperty('--angle', `${angle}deg`);
                meteor.style.setProperty('--opacity', opacity);
                
                // 添加动画
                meteor.style.animation = `meteor-fall ${duration}s ease-in ${delay}s forwards`;
                
                document.body.appendChild(meteor);
                
                // 动画结束后移除元素
                setTimeout(() => {
                    meteor.remove();
                }, (duration + delay) * 1000);
            };
            
            // 添加CSS动画
            const addMeteorAnimation = () => {
                const styleId = 'meteor-animation';
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        @keyframes meteor-fall {
                            0% {
                                transform: rotate(var(--angle)) translateX(-100%) translateY(-100%);
                                opacity: 0;
                            }
                            10% {
                                opacity: var(--opacity);
                            }
                            90% {
                                opacity: var(--opacity);
                            }
                            100% {
                                transform: rotate(var(--angle)) translateX(calc(100vw + 200px)) translateY(calc(100vh + 200px));
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            };
            
            // 定期创建流星
            const startMeteorShower = () => {
                addMeteorAnimation();
                
                // 初始创建一批流星
                const initialMeteors = Math.floor(Math.random() * 5) + 3; // 3-7个
                for (let i = 0; i < initialMeteors; i++) {
                    setTimeout(() => {
                        createMeteor();
                    }, Math.random() * 2000);
                }
                
                // 持续创建流星
                setInterval(() => {
                    if (Math.random() > 0.7) { // 70%概率创建流星
                        createMeteor();
                    }
                }, 1000);
            };
            
            // 性能优化：仅在非移动设备上启用
            if (window.innerWidth > 768 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                startMeteorShower();
            }
        }
    }
};

// 优化的樱花触屏特效
mixins.cherryBlossom = {
    mounted() {
        this.initCherryBlossomEffect();
    },
    methods: {
        initCherryBlossomEffect() {
            // 创建樱花池
            const createCherryBlossom = (x, y) => {
                const petalsCount = Math.floor(Math.random() * 3) + 2; // 2-4片花瓣（减少了原来的8-12片）
                const container = document.createElement('div');
                container.classList.add('cherry-blossom-container');
                container.style.position = 'fixed';
                container.style.left = `${x}px`;
                container.style.top = `${y}px`;
                container.style.pointerEvents = 'none';
                container.style.zIndex = '9999';
                container.style.transform = 'translate(-50%, -50%)';
                
                // 创建花瓣
                for (let i = 0; i < petalsCount; i++) {
                    const petal = document.createElement('div');
                    petal.classList.add('cherry-petal');
                    
                    // 设置花瓣样式
                    const size = Math.random() * 10 + 5; // 5-15px，减小花瓣尺寸范围
                    const delay = Math.random() * 0.5;
                    const duration = Math.random() * 3 + 2; // 2-5秒，缩短动画时间
                    const angle = (i / petalsCount) * 360;
                    
                    const hue = Math.random() * 20 + 345;
                    const saturation = Math.random() * 20 + 80;
                    const lightness = Math.random() * 15 + 80;
                    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                    
                    petal.style.width = `${size}px`;
                    petal.style.height = `${size * 1.5}px`;
                    petal.style.background = color;
                    petal.style.borderRadius = '50% 50% 30% 30%';
                    petal.style.position = 'absolute';
                    petal.style.transform = `rotate(${angle}deg) translateY(-${size * 2}px)`;
                    petal.style.opacity = '0.8';
                    petal.style.boxShadow = `0 0 10px rgba(${Math.floor(hue * 0.7)}, ${Math.floor(saturation * 2.55)}, ${Math.floor(lightness * 2.55)}, 0.8)`;
                    
                    // 添加动画
                    petal.style.animation = `falling ${duration}s ease-in-out ${delay}s forwards`;
                    
                    container.appendChild(petal);
                }
                
                document.body.appendChild(container);
                
                // 动画结束后移除元素
                setTimeout(() => {
                    container.remove();
                }, (Math.max(...Array.from(container.children).map(p => parseFloat(p.style.animationDuration)))) * 1000 + 100);
            };

            // 添加CSS动画
            const addAnimationStyle = () => {
                const styleId = 'cherry-blossom-animation';
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        @keyframes falling {
                            0% {
                                transform: translateY(0) rotate(0) scale(1);
                                opacity: 0.8;
                            }
                            50% {
                                transform: translateY(150px) rotate(180deg) scale(0.9);
                                opacity: 0.6;
                            }
                            100% {
                                transform: translateY(300px) rotate(360deg) scale(0);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            };

            // 监听点击和触摸事件
            const handleInteraction = (e) => {
                let x, y;
                if (e.type.includes('touch')) {
                    x = e.touches[0].clientX;
                    y = e.touches[0].clientY;
                } else {
                    x = e.clientX;
                    y = e.clientY;
                }
                
                // 创建多个樱花效果 - 减少樱花簇数量
                const blossomCount = Math.floor(Math.random() * 2) + 1; // 1-2个樱花簇（减少了原来的3-7个）
                for (let i = 0; i < blossomCount; i++) {
                    const offsetX = (Math.random() - 0.5) * 20;
                    const offsetY = (Math.random() - 0.5) * 20;
                    setTimeout(() => {
                        createCherryBlossom(x + offsetX, y + offsetY);
                    }, i * 100);
                }
            };

            // 关闭鼠标移动效果，减少性能消耗
            const handleMouseMove = () => { /* 禁用鼠标移动效果 */ };

            addAnimationStyle();
            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction, { passive: true });
            // 移除鼠标移动事件监听，减少性能消耗
            
            // 页面卸载时清理事件监听器
            window.addEventListener('beforeunload', () => {
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
            });
        }
    }
};

// 打字机效果mixins
mixins.typewriter = {
    mounted() {
        this.initTypewriterEffect();
    },
    methods: {
        initTypewriterEffect() {
            const nameElement = document.querySelector('#home-card #card-div .name');
            if (!nameElement) return;
            
            // 保存原始文本
            const originalText = nameElement.textContent.trim();
            // 清空元素内容，准备打字机效果
            nameElement.textContent = '';
            
            // 打字机效果函数
            const typewriter = (element, text, index = 0, speed = 100) => {
                if (index < text.length) {
                    // 添加下一个字符
                    element.textContent += text.charAt(index);
                    // 随机调整速度，让打字效果更自然
                    const randomSpeed = speed + Math.random() * 50 - 25;
                    // 继续下一个字符
                    setTimeout(() => {
                        typewriter(element, text, index + 1, speed);
                    }, randomSpeed);
                } else {
                    // 打字完成后，可以添加光标闪烁效果
                    this.addCursorEffect(element);
                }
            };
            
            // 添加光标闪烁效果
            this.addCursorEffect = (element) => {
                const cursor = document.createElement('span');
                cursor.classList.add('typewriter-cursor');
                cursor.textContent = '|';
                element.appendChild(cursor);
                
                // 添加光标闪烁动画
                const styleId = 'typewriter-cursor-animation';
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        .typewriter-cursor {
                            animation: blink 1s step-end infinite;
                            color: var(--text-color);
                            font-weight: bold;
                            margin-left: 2px;
                        }
                        @keyframes blink {
                            from, to { opacity: 1; }
                            50% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            };
            
            // 延迟启动打字机效果，确保页面加载完成
            setTimeout(() => {
                typewriter(nameElement, originalText);
            }, 500);
        }
    }
};

const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
