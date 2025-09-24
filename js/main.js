// 樱花触屏特效 - 优化版
mixins.cherryBlossom = {
    mounted() {
        this.initCherryBlossomEffect();
    },
    methods: {
        initCherryBlossomEffect() {
            // 创建樱花
            const createCherryBlossom = (x, y) => {
                const petalsCount = Math.floor(Math.random() * 3) + 5; // 5-7片花瓣
                const container = document.createElement('div');
                container.classList.add('cherry-blossom-container');
                container.style.position = 'fixed';
                container.style.left = `${x}px`;
                container.style.top = `${y}px`;
                container.style.pointerEvents = 'none';
                container.style.zIndex = '9999';
                container.style.transform = 'translate(-50%, -50%)';
                
                // 随机颜色 - 樱花粉渐变
                const colorOptions = ['#ffb7c5', '#ffcad4', '#f8bbd0', '#ff8fab', '#ffab91'];
                const baseColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                
                // 创建花蕊
                const createStamen = () => {
                    const stamen = document.createElement('div');
                    stamen.style.width = '3px';
                    stamen.style.height = '3px';
                    stamen.style.background = '#ffd700';
                    stamen.style.borderRadius = '50%';
                    stamen.style.position = 'absolute';
                    stamen.style.left = '50%';
                    stamen.style.top = '50%';
                    stamen.style.transform = 'translate(-50%, -50%)';
                    stamen.style.boxShadow = '0 0 2px rgba(255, 215, 0, 0.8)';
                    return stamen;
                };
                
                container.appendChild(createStamen());
                
                // 创建花瓣
                for (let i = 0; i < petalsCount; i++) {
                    const petal = document.createElement('div');
                    petal.classList.add('cherry-petal');
                    
                    // 设置花瓣样式 - 更逼真的樱花形状
                    const size = Math.random() * 8 + 8; // 8-16px
                    const delay = Math.random() * 0.7;
                    const duration = Math.random() * 4 + 3; // 3-7秒
                    const angle = (i / petalsCount) * 360;
                    const distance = size * 1.5;
                    
                    // 随机透明度和亮度变化
                    const opacity = 0.7 + Math.random() * 0.3;
                    const brightness = 90 + Math.random() * 20;
                    
                    petal.style.width = `${size}px`;
                    petal.style.height = `${size * 1.8}px`;
                    petal.style.background = `hsl(340, ${90 + Math.random() * 10}%, ${brightness}%)`;
                    petal.style.borderRadius = '60% 0 60% 0';
                    petal.style.position = 'absolute';
                    petal.style.left = '50%';
                    petal.style.top = '50%';
                    petal.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${distance}px)`;
                    petal.style.opacity = `${opacity}`;
                    petal.style.boxShadow = `0 0 10px rgba(${255}, ${180 + Math.random() * 20}, ${200 + Math.random() * 20}, 0.8)`;
                    petal.style.animation = `blossomFall${Math.floor(Math.random() * 3) + 1} ${duration}s ease-in-out ${delay}s forwards`;
                    
                    // 随机花瓣大小变化
                    if (Math.random() > 0.5) {
                        petal.style.transformOrigin = 'center center';
                    }
                    
                    container.appendChild(petal);
                }
                
                document.body.appendChild(container);
                
                // 动画结束后移除元素
                setTimeout(() => {
                    container.remove();
                }, (Math.max(...Array.from(container.children).map(p => {
                    const anim = p.style.animation || '';
                    const durationMatch = anim.match(/\d+\.?\d*s/);
                    return durationMatch ? parseFloat(durationMatch[0]) : 5;
                }))) * 1000 + 100);
            };
            
            // 添加CSS动画 - 更自然的飘落轨迹
            const addAnimationStyle = () => {
                const styleId = 'cherry-blossom-animation';
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        @keyframes blossomFall1 {
                            0% {
                                transform: translateY(0) rotate(0) translateX(0) scale(1);
                                opacity: 0.8;
                            }
                            25% {
                                transform: translateY(50px) rotate(90deg) translateX(10px) scale(1.1);
                                opacity: 0.7;
                            }
                            50% {
                                transform: translateY(100px) rotate(180deg) translateX(-10px) scale(1);
                                opacity: 0.6;
                            }
                            75% {
                                transform: translateY(150px) rotate(270deg) translateX(15px) scale(0.9);
                                opacity: 0.4;
                            }
                            100% {
                                transform: translateY(200px) rotate(360deg) translateX(-5px) scale(0);
                                opacity: 0;
                            }
                        }
                        
                        @keyframes blossomFall2 {
                            0% {
                                transform: translateY(0) rotate(0) translateX(0) scale(1);
                                opacity: 0.8;
                            }
                            33% {
                                transform: translateY(60px) rotate(-120deg) translateX(-15px) scale(1.05);
                                opacity: 0.7;
                            }
                            66% {
                                transform: translateY(120px) rotate(-240deg) translateX(5px) scale(0.95);
                                opacity: 0.5;
                            }
                            100% {
                                transform: translateY(200px) rotate(-360deg) translateX(-10px) scale(0);
                                opacity: 0;
                            }
                        }
                        
                        @keyframes blossomFall3 {
                            0% {
                                transform: translateY(0) rotate(0) translateX(0) scale(1);
                                opacity: 0.8;
                            }
                            20% {
                                transform: translateY(40px) rotate(72deg) translateX(8px) scale(1.1);
                                opacity: 0.8;
                            }
                            40% {
                                transform: translateY(80px) rotate(144deg) translateX(-12px) scale(1);
                                opacity: 0.7;
                            }
                            60% {
                                transform: translateY(120px) rotate(216deg) translateX(5px) scale(0.9);
                                opacity: 0.6;
                            }
                            80% {
                                transform: translateY(160px) rotate(288deg) translateX(-8px) scale(0.7);
                                opacity: 0.3;
                            }
                            100% {
                                transform: translateY(200px) rotate(360deg) translateX(10px) scale(0);
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
                
                // 创建多个樱花效果
                const blossomCount = Math.floor(Math.random() * 3) + 3; // 3-5个樱花簇
                for (let i = 0; i < blossomCount; i++) {
                    const offsetX = (Math.random() - 0.5) * 30;
                    const offsetY = (Math.random() - 0.5) * 30;
                    setTimeout(() => {
                        createCherryBlossom(x + offsetX, y + offsetY);
                    }, i * 80);
                }
            };
            
            addAnimationStyle();
            
            // 添加事件监听器
            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction, { passive: true });
            
            // 简化处理：页面卸载时浏览器会自动清理事件监听器
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
