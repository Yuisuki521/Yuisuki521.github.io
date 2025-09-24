// 樱花触屏特效
mixins.cherryBlossom = {
    mounted() {
        this.initCherryBlossomEffect();
    },
    methods: {
        initCherryBlossomEffect() {
            const container = document.getElementById('layout');
            
            // 创建樱花池
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
                
                // 创建花瓣
                for (let i = 0; i < petalsCount; i++) {
                    const petal = document.createElement('div');
                    petal.classList.add('cherry-petal');
                    
                    // 设置花瓣样式
                    const size = Math.random() * 10 + 5; // 5-15px
                    const delay = Math.random() * 0.5;
                    const duration = Math.random() * 3 + 2; // 2-5秒
                    const angle = (i / petalsCount) * 360;
                    
                    petal.style.width = `${size}px`;
                    petal.style.height = `${size * 1.5}px`;
                    petal.style.background = '#ffb7c5';
                    petal.style.borderRadius = '50% 50% 30% 30%';
                    petal.style.position = 'absolute';
                    petal.style.transform = `rotate(${angle}deg) translateY(-${size * 2}px)`;
                    petal.style.opacity = '0.8';
                    petal.style.boxShadow = '0 0 10px rgba(255, 183, 197, 0.8)';
                    
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
                                transform: translateY(100px) rotate(180deg) scale(0.9);
                                opacity: 0.6;
                            }
                            100% {
                                transform: translateY(200px) rotate(360deg) scale(0);
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
                const blossomCount = Math.floor(Math.random() * 3) + 2; // 2-4个樱花簇
                for (let i = 0; i < blossomCount; i++) {
                    const offsetX = (Math.random() - 0.5) * 20;
                    const offsetY = (Math.random() - 0.5) * 20;
                    setTimeout(() => {
                        createCherryBlossom(x + offsetX, y + offsetY);
                    }, i * 100);
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
