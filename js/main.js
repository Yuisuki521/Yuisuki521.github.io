// 定义mixins对象
const mixins = {};

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
                const petalsCount = Math.floor(Math.random() * 5) + 8; // 8-12片花瓣，增加花瓣数量
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
                    
                    // 设置花瓣样式 - 增加更多随机性和变化
                    const size = Math.random() * 15 + 5; // 5-20px，增大花瓣尺寸范围
                    const delay = Math.random() * 0.8;
                    const duration = Math.random() * 5 + 3; // 3-8秒，延长动画时间
                    const angle = (i / petalsCount) * 360 + Math.random() * 30;
                    const rotation = Math.random() * 360; // 随机初始旋转
                    
                    // 随机颜色变化，增加粉色和淡红色的变化
                    const hue = Math.random() * 20 + 345; // 345-365度，粉色到淡红色
                    const saturation = Math.random() * 20 + 80; // 80-100%
                    const lightness = Math.random() * 15 + 80; // 80-95%
                    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                    
                    petal.style.width = `${size}px`;
                    petal.style.height = `${size * 1.8}px`; // 更修长的花瓣
                    petal.style.background = color;
                    petal.style.borderRadius = '50% 50% 30% 30%';
                    petal.style.position = 'absolute';
                    petal.style.transform = `rotate(${angle}deg) translateY(-${size * 2}px) rotate(${rotation}deg)`;
                    petal.style.opacity = '0.9';
                    petal.style.boxShadow = `0 0 15px rgba(${Math.floor(hue * 0.7)}, ${Math.floor(saturation * 2.55)}, ${Math.floor(lightness * 2.55)}, 0.9)`;
                    petal.style.filter = 'blur(0.5px)'; // 添加轻微模糊效果，增强视觉体验
                    
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
            
            // 添加CSS动画 - 优化动画效果
            const addAnimationStyle = () => {
                const styleId = 'cherry-blossom-animation';
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        @keyframes falling {
                            0% {
                                transform: translateY(0) rotate(0) scale(1) translateX(0);
                                opacity: 0.9;
                            }
                            30% {
                                transform: translateY(100px) rotate(180deg) scale(0.9) translateX(15px);
                                opacity: 0.8;
                            }
                            60% {
                                transform: translateY(200px) rotate(270deg) scale(0.8) translateX(-15px);
                                opacity: 0.7;
                            }
                            100% {
                                transform: translateY(300px) rotate(360deg) scale(0.5) translateX(10px);
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
                
                // 创建多个樱花效果 - 增加樱花簇数量
                const blossomCount = Math.floor(Math.random() * 5) + 3; // 3-7个樱花簇
                for (let i = 0; i < blossomCount; i++) {
                    const offsetX = (Math.random() - 0.5) * 30;
                    const offsetY = (Math.random() - 0.5) * 30;
                    setTimeout(() => {
                        createCherryBlossom(x + offsetX, y + offsetY);
                    }, i * 80);
                }
            };
            
            // 添加额外的鼠标移动效果 - 增强交互体验
            const handleMouseMove = (e) => {
                // 随机触发，避免性能问题
                if (Math.random() > 0.95) {
                    const x = e.clientX;
                    const y = e.clientY;
                    const smallBlossomCount = Math.floor(Math.random() * 2) + 1; // 1-2个小樱花簇
                    for (let i = 0; i < smallBlossomCount; i++) {
                        const offsetX = (Math.random() - 0.5) * 15;
                        const offsetY = (Math.random() - 0.5) * 15;
                        setTimeout(() => {
                            const miniCreateCherryBlossom = (x, y) => {
                                const petalsCount = Math.floor(Math.random() * 3) + 3; // 3-5片小花瓣
                                const container = document.createElement('div');
                                container.classList.add('cherry-blossom-container-small');
                                container.style.position = 'fixed';
                                container.style.left = `${x}px`;
                                container.style.top = `${y}px`;
                                container.style.pointerEvents = 'none';
                                container.style.zIndex = '9998';
                                container.style.transform = 'translate(-50%, -50%)';
                                
                                for (let i = 0; i < petalsCount; i++) {
                                    const petal = document.createElement('div');
                                    petal.classList.add('cherry-petal-small');
                                    const size = Math.random() * 5 + 2; // 2-7px
                                    const delay = Math.random() * 0.3;
                                    const duration = Math.random() * 3 + 2; // 2-5秒
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
                                    petal.style.boxShadow = `0 0 8px rgba(${Math.floor(hue * 0.7)}, ${Math.floor(saturation * 2.55)}, ${Math.floor(lightness * 2.55)}, 0.8)`;
                                    petal.style.animation = `falling ${duration}s ease-in-out ${delay}s forwards`;
                                    
                                    container.appendChild(petal);
                                }
                                
                                document.body.appendChild(container);
                                
                                setTimeout(() => {
                                    container.remove();
                                }, (Math.max(...Array.from(container.children).map(p => parseFloat(p.style.animationDuration)))) * 1000 + 100);
                            };
                            
                            miniCreateCherryBlossom(x + offsetX, y + offsetY);
                        }, i * 50);
                    }
                }
            };
            
            addAnimationStyle();
            
            // 添加事件监听器
            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction, { passive: true });
            document.addEventListener('mousemove', handleMouseMove, { passive: true });
            
            // 页面卸载时清理事件监听器
            window.addEventListener('beforeunload', () => {
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
                document.removeEventListener('mousemove', handleMouseMove);
            });
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
